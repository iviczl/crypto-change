import { ReactElement } from "react"
import { Navigate } from "react-router-dom"
import store from "../stores/store"

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement
}) {
  const user = store.getState().user.user
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
