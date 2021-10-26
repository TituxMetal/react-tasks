import React, { useContext } from 'react'
import tw, { styled } from 'twin.macro'

import { TasksContext } from '~/context'

const List = styled.ul(tw`text-left my-4 m-auto divide-y-2 divide-red-500`)
const TaskItem = styled.li(tw`py-4 px-1 cursor-pointer font-bold text-xl`)

const Tasks = () => {
  const { isLoading, error, tasks } = useContext(TasksContext)

  return (
    <>
      {error && <p>{error}</p>}
      {!isLoading && tasks.length > 0 && (
        <List>
          {tasks.map(task => (
            <TaskItem key={task.id}>{task.text}</TaskItem>
          ))}
        </List>
      )}
    </>
  )
}

export default Tasks
