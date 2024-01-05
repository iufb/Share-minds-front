import { Button, PasswordInput, Stack, TextInput } from "@mantine/core"
import { useUnit } from "effector-react"
import { FormEventHandler } from "react"
import { $email, $password, emailChanged, formSubmitted, passwordChanged } from "src/features/auth/models/sign-in"


export const SignInForm = () => {
  const [email, password] = useUnit([$email, $password])
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    formSubmitted()
  }
  return (
    <Stack component={'form'} maw={'400px'} onSubmit={handleSubmit} >
      <TextInput c={'white'} label='Email' placeholder="Enter your email to sign in" onChange={(e) => emailChanged(e.target.value)} value={email} />
      <PasswordInput c={'white'} placeholder="Enter your password" label="Password" onChange={(e) => passwordChanged(e.target.value)} value={password} />
      <Button type="submit">
        Sign in
      </Button>
    </Stack>
  )
}
