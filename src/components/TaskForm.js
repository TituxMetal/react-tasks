import React, { useContext, useEffect, useRef, useState } from 'react'
import tw, { styled } from 'twin.macro'

import { TasksContext } from '~/context'

const Button = styled.button(() => [
  tw`cursor-pointer py-1 px-4 font-bold rounded-2xl`,
  tw`bg-transparent ring-2 ring-red-500 text-red-300`,
  tw`hover:(bg-red-800 text-red-200) disabled:(cursor-not-allowed opacity-50 text-gray-300 bg-gray-500)`
])
const Form = styled.form(tw`flex justify-between my-4`)
const Input = styled.input(() => [
  tw`p-2 border-b-2 border-red-500 flex mr-1 bg-gray-600 shadow-2xl w-9/12`,
  tw`focus:(outline-none border-red-600) placeholder:text-gray-100`
])

const TaskForm = () => {
  const [isSending, setIsSending] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const textInputRef = useRef()
  const { addTask, error } = useContext(TasksContext)

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus()
    }
  }, [])

  const onHandleChange = () => setIsValid(textInputRef.current.value.length > 4)

  const onSubmitHandler = event => {
    event.preventDefault()
    setIsSending(true)
    addTask(textInputRef.current.value)
    textInputRef.current.value = ''
    setIsSending(false)
  }

  return (
    <>
      <Form className='form' onSubmit={onSubmitHandler}>
        <Input
          type='text'
          placeholder='Add a new task...'
          onChange={onHandleChange}
          ref={textInputRef}
        />
        <Button type='submit' disabled={!isValid}>
          {isSending ? 'Sending...' : 'Add Task'}
        </Button>
      </Form>
      {error && <p>{error}</p>}
    </>
  )
}

export default TaskForm
