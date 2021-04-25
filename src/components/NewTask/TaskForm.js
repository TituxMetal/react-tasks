import React, { useContext, useRef, useState } from 'react'

import { TasksContext } from '~/context'

import './TaskForm.css'

const TaskForm = () => {
  const [isSending, setIsSending] = useState(false)
  const textInputRef = useRef()
  const { addTask, error } = useContext(TasksContext)

  const onSubmitHandler = event => {
    event.preventDefault()
    setIsSending(true)
    addTask(textInputRef.current.value)
    textInputRef.current.value = ''
    setIsSending(false)
  }

  return (
    <>
      <form className='form' onSubmit={onSubmitHandler}>
        <input type='text' ref={textInputRef} />
        <button type='submit'>{isSending ? 'Sending...' : 'Add Task'}</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}

export default TaskForm
