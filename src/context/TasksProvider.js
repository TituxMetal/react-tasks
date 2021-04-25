import React, { useCallback, useEffect, useState } from 'react'

import TasksContext from './TasksContext'

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiUrl =
    'https://react-http-8eefe-default-rtdb.firebaseio.com/tasks.json'

  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await response.json()

      if (data) {
        const loadedData = Object.entries(data).map(([id, obj]) => ({
          id,
          ...obj
        }))

        setTasks(loadedData || [])
      }
    } catch (err) {
      setError(err.message)
    }

    setIsLoading(false)
  }, [])

  const addTask = useCallback(async taskText => {
    setError(null)

    try {
      const token = process.env.FIREBASE_TOKEN
      const response = await fetch(`${apiUrl}?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify({ text: taskText })
      })

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await response.json()

      if (!data) {
        throw new Error('Something went wrong!')
      }

      const createdTask = { id: data.name, text: taskText }

      setTasks(previousState => [...previousState, createdTask])
    } catch (err) {
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <TasksContext.Provider value={{ tasks, error, isLoading, addTask }}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider
