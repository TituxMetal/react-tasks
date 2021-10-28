import React from 'react'
import tw, { styled } from 'twin.macro'

import { TaskForm, TaskList } from '~/components'
import { TasksProvider } from '~/context'

const Section = styled.section(tw`my-4 mx-auto p-8 rounded-xl w-10/12 bg-gray-700 max-w-screen-lg`)

const Home = () => (
  <TasksProvider>
    <Section>
      <TaskForm />
      <TaskList />
    </Section>
  </TasksProvider>
)

export default Home
