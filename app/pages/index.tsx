import { useCurrentUser } from "app/hooks/useCurrentUser"
import { BlitzPage, useMutation, useRouter } from "blitz"
import { useQuery } from "blitz"
import checkLogin from "../queries/checkLogin"
import { LoginForm } from "app/components/LoginForm"
import { SignupForm } from "app/components/SignupForm"
import logout from "app/mutations/logout"

function LoggedIn() {
  useQuery(checkLogin, null, { refetchInterval: 2000 })
  const [logoutMutation] = useMutation(logout)

  return (
    <>
      <button
        onClick={async () => {
          await logoutMutation()
          window.location.href = "/"
        }}
      >
        Logout
      </button>
      <p>You are logged in</p>
    </>
  )
}

function LoggedOut() {
  const router = useRouter()
  return (
    <>
      <SignupForm
        onSuccess={async () => {
          window.location.href = "/"
        }}
      />
      <LoginForm
        onSuccess={async () => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          window.location.href = next
        }}
      />
      <p>You are logged out</p>
    </>
  )
}

const Welcome: BlitzPage = () => {
  const currentUser = useCurrentUser()
  return currentUser ? <LoggedIn /> : <LoggedOut />
}

Welcome.suppressFirstRenderFlicker = true

export default Welcome
