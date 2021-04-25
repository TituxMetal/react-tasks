import React, { useState } from 'react'

import { NewTask, TasksList } from '~/components'

const App = () => {
  const [tasks] = useState([{ id: 't1', text: 'Practice React!' }])

  return (
    <>
      <NewTask />
      <TasksList tasks={tasks} />
    </>
  )
}

export default App
