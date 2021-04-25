import React from 'react'

import { NewTask, TasksList } from '~/components'
import { TasksProvider } from '~/context'

const App = () => (
  <TasksProvider>
    <NewTask />
    <TasksList />
  </TasksProvider>
)

export default App
