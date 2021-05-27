import { useCurrentUser } from "app/hooks/useCurrentUser"
import { BlitzPage } from "blitz"
import { useQuery } from "blitz"
import checkLogin from "../queries/checkLogin"

function LoggedIn() {
  useQuery(checkLogin, null, { refetchInterval: 2000 })
  return <p>You are logged in</p>
}

function LoggedOut() {
  return <p>You are logged out</p>
}

const Welcome: BlitzPage = () => {
  const currentUser = useCurrentUser()
  return currentUser ? <LoggedIn /> : <LoggedOut />
}

Welcome.suppressFirstRenderFlicker = true

export default Welcome
