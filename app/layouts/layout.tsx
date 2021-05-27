import { useMutation, useRouter } from "blitz"
import logout from "app/mutations/logout"
import { LoginForm } from "app/components/LoginForm"
import { SignupForm } from "app/components/SignupForm"
import { useCurrentUser } from "../hooks/useCurrentUser"

function NavLoggedOut() {
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
    </>
  )
}

function NavLoggedIn() {
  const [logoutMutation] = useMutation(logout)

  return (
    <button
      onClick={async () => {
        await logoutMutation()
        window.location.href = "/"
      }}
    >
      Logout
    </button>
  )
}

export default function Layout({ children }) {
  const user = useCurrentUser()

  return user ? (
    <>
      <NavLoggedIn />
      {children}
    </>
  ) : (
    <>
      <NavLoggedOut />
      {children}
    </>
  )
}
