import React, { useContext } from 'react'

import { Section } from '~/components'
import { TasksContext } from '~/context'

import TaskItem from './TaskItem'
import './TaskList.css'

const TasksList = () => {
  const { isLoading, error, tasks } = useContext(TasksContext)

  return (
    <Section>
      <div className='container'>
        {error && <p>{error}</p>}
        {!isLoading && tasks.length > 0 && (
          <ul>
            {tasks.map(task => (
              <TaskItem key={task.id}>{task.text}</TaskItem>
            ))}
          </ul>
        )}
        {!isLoading && !error && tasks.length === 0 && (
          <p>No task found, start adding some!</p>
        )}
        {isLoading && <p>Loading...</p>}
      </div>
    </Section>
  )
}

export default TasksList
