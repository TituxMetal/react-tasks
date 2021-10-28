import { yupResolver } from '@hookform/resolvers/yup'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Form } from '~/components'
import { TasksContext } from '~/context'

const formSchema = yup.object().shape({
  text: yup.string().min(4).trim().required().label('Text'),
  isDone: yup.boolean()
})
const defaultValues = { text: '', isDone: false }

const TaskForm = () => {
  const { addTask } = useContext(TasksContext)
  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset
  } = useForm({ defaultValues, mode: 'all', resolver: yupResolver(formSchema) })

  useEffect(() => {
    setFocus('text')
  }, [setFocus])

  const onSubmitHandler = data => addTask(data) && reset({ text: '' })

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <Form.Input
        error={isDirty && errors.text}
        type='text'
        placeholder='Add a new task...'
        {...register('text')}
      />
      <Form.Button type='submit' disabled={!isValid}>
        {isSubmitting ? 'Sending...' : 'Add Task'}
      </Form.Button>
      {isDirty && errors && <Form.Message error>{errors?.text?.message}</Form.Message>}
    </Form>
  )
}

export default TaskForm
