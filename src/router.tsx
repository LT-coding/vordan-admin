import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import RequireAuth from './components/require-auth'
import RequireGuest from './components/require-guest'
import Account from './pages/account/account'
import Dashboard from './pages/dashboard/dashboard'
import Login from './pages/login'
import Managers from './pages/managers/managers'
import UpdatePassword from './pages/update-password'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: '/account',
        element: (
          <RequireAuth>
            <Account />
          </RequireAuth>
        ),
      },
      {
        path: '/account/update-password',
        element: (
          <RequireAuth>
            <UpdatePassword />
          </RequireAuth>
        ),
      },
      {
        path: '/managers',
        element: (
          <RequireAuth>
            <Managers />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <RequireGuest>
        <Login />
      </RequireGuest>
    ),
  },
  // {
  //   path: '/forgot-password',
  //   element: (
  //     <GuestRoute>
  //       <ForgotPassword />
  //     </GuestRoute>
  //   ),
  // },
  // {
  //   path: '/restore-password',
  //   element: (
  //     <RequireGuest>
  //       <Update />
  //     </RequireGuest>
  //   ),
  // },
])
