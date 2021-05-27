import { AuthenticationError, useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { Signup } from "app/validations"
import signup from "app/mutations/signup"
import login from "app/mutations/login"

interface SignupFormProps {
  onSuccess?: () => Promise<void>
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [loginMutation] = useMutation(login)
  return (
    <div>
      <p style={{ fontSize: "2rem" }}>Signup</p>
      <Form
        submitText="singup"
        schema={Signup}
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await signupMutation(values)
            loginMutation(user)
            await props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Username" placeholder="Username" />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

export default SignupForm
