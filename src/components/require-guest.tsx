import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const RequireGuest = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get('token')

  if (token) return <Navigate to='/' />

  return <div>{children}</div>
}

export default RequireGuest
