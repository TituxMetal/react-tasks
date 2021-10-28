import React, { useContext } from 'react'
import tw, { styled } from 'twin.macro'

import { Item } from '~/components'
import { TasksContext } from '~/context'

const List = styled.ul(tw`text-left my-4 m-auto divide-y-2 divide-red-500`)

const TaskList = () => {
  const { isLoading, error, tasks } = useContext(TasksContext)

  return (
    <>
      {error && <p>{error}</p>}
      {!isLoading && tasks.length > 0 && (
        <List>
          {tasks.map(task => (
            <Item key={task.id} item={task} />
          ))}
        </List>
      )}
    </>
  )
}

export default TaskList
