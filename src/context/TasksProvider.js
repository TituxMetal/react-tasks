import React, { useCallback, useEffect, useState } from 'react'

import { useHttp } from '~/hooks'

import TasksContext from './TasksContext'

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const { error, isLoading, sendRequest } = useHttp()

  const url = process.env.API_URI

  const formatData = data => {
    if (data) {
      const loadedData = Object.entries(data).map(([id, obj]) => ({ id, ...obj }))

      setTasks(loadedData)
    }
  }

  const fetchTasks = useCallback(() => sendRequest({ url }, formatData), [])

  const addTask = useCallback(
    taskText => {
      const requestConfig = {
        url,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: { text: taskText.trim() }
      }

      const cb = data =>
        setTasks(previousState => [...previousState, { id: data.name, text: taskText }])

      return sendRequest(requestConfig, cb)
    },
    [sendRequest]
  )

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
