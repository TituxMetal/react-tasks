import React, { useContext } from 'react'
import tw, { styled } from 'twin.macro'

import { TasksContext } from '~/context'

const ListItem = styled.li([tw`flex justify-between py-4 px-1 cursor-pointer font-bold text-xl`])
const Content = styled.p(({ isDone }) => [tw`w-10/12`, isDone && tw`line-through`])
const Button = styled.button([tw`rounded-full border-2 border-red-400 px-2 mr-2 text-red-100`])

const Item = ({ item }) => {
  const { deleteTask, toggleIsDone } = useContext(TasksContext)
  const { text, isDone } = item

  return (
    <ListItem>
      <Content onClick={() => toggleIsDone(item)} isDone={isDone}>
        {text}
      </Content>
      <Button onClick={() => deleteTask(item)}>&times;</Button>
    </ListItem>
  )
}

export default Item
