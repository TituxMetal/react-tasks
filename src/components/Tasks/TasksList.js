import React from 'react'

import { Section } from '~/components'

import TaskItem from './TaskItem'
import './TaskList.css'

const TasksList = ({ tasks }) => (
  <Section>
    <div className='container'>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <TaskItem key={task.id}>{task.text}</TaskItem>
          ))}
        </ul>
      ) : (
        <h2>No tasks found. Start adding some!</h2>
      )}
    </div>
  </Section>
)

export default TasksList
