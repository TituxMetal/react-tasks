import React, { useCallback, useEffect, useState } from 'react'

import { useHttp } from '~/hooks'

import TasksContext from './TasksContext'

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const { error, isLoading, sendRequest } = useHttp()

  const formatData = data => {
    if (data) {
      const loadedData = Object.entries(data).map(([id, obj]) => ({ id, ...obj }))

      setTasks(loadedData)
    }
  }

  const url = `${process.env.FIREBASE_API_URI}.json?auth=${process.env.FIREBASE_TOKEN}`

  const fetchTasks = useCallback(() => sendRequest({ url }, formatData), [])

  const addTask = useCallback(
    taskData => {
      const requestConfig = {
        url,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: taskData
      }

      return sendRequest(requestConfig, ({ name }) =>
        setTasks(prev => [...prev, { id: name, ...taskData }])
      )
    },
    [sendRequest]
  )

  const deleteTask = useCallback(
    task => {
      const apiUrl = `${process.env.FIREBASE_API_URI}/${task.id}/.json?auth=${process.env.FIREBASE_TOKEN}`
      const requestConfig = {
        url: apiUrl,
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
      }

      return sendRequest(requestConfig, () =>
        setTasks(prev => prev.filter(item => item.id !== task.id))
      )
    },
    [sendRequest]
  )

  const toggleIsDone = useCallback(
    task => {
      const apiUrl = `${process.env.FIREBASE_API_URI}/${task.id}/.json?auth=${process.env.FIREBASE_TOKEN}`
      const requestConfig = {
        url: apiUrl,
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        body: { isDone: !task.isDone }
      }

      return sendRequest(requestConfig, ({ isDone }) =>
        setTasks(prev => prev.map(item => (item.id === task.id ? { ...item, isDone } : item)))
      )
    },
    [sendRequest]
  )

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <TasksContext.Provider value={{ tasks, error, isLoading, addTask, deleteTask, toggleIsDone }}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider
