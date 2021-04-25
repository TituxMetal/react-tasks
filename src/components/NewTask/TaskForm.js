import React, { useRef } from 'react'

import './TaskForm.css'

const TaskForm = () => {
  const textInputRef = useRef()

  const onSubmitHandler = event => event.preventDefault()

  return (
    <form className='form' onSubmit={onSubmitHandler}>
      <input type='text' ref={textInputRef} />
      <button type='submit'>Add Task</button>
    </form>
  )
}

export default TaskForm
