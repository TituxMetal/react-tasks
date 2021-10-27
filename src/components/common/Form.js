import React, { forwardRef } from 'react'
import tw, { styled } from 'twin.macro'

const Button = styled.button(() => [
  tw`cursor-pointer py-1 px-4 my-2 font-bold rounded-2xl`,
  tw`bg-transparent ring-2 ring-red-500 text-red-300`,
  tw`hover:(bg-red-800 text-red-200) disabled:(cursor-not-allowed opacity-50 text-gray-300 bg-gray-500)`
])
const Container = styled.form(tw`w-full flex flex-wrap justify-between my-4`)
const Input = styled.input(({ error }) => [
  tw`p-2 my-2 w-9/12 border-b-2 border-red-500  bg-gray-600`,
  tw`focus:(outline-none border-red-600) placeholder:text-gray-100`,
  error && tw`bg-opacity-75 bg-red-800 font-bold text-red-300 border-2 border-red-300`
])
const Message = styled.p(({ error, info, success }) => [
  tw`py-1 font-bold w-full`,
  error && tw`text-red-300`,
  info && tw`text-blue-300`,
  success && tw`text-green-300`
])

const Form = forwardRef(({ children, ...rest }, ref) => {
  Form.displayName = 'Form'

  return (
    <Container {...rest} ref={ref}>
      {children}
    </Container>
  )
})

Form.Button = forwardRef(({ children, ...rest }, ref) => {
  Form.Button.displayName = 'FormButton'

  return (
    <Button {...rest} ref={ref}>
      {children}
    </Button>
  )
})

Form.Input = forwardRef(({ type, name, ...rest }, ref) => {
  Form.Input.displayName = 'FormInput'

  return <Input {...rest} type={type} name={name} id={name} ref={ref} />
})

Form.Message = ({ children, ...rest }) => {
  Form.Message.displayName = 'FormMessage'

  return <Message {...rest}>{children}</Message>
}

export default Form
