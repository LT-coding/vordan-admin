import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import RequireAuth from './components/require-auth'
import RequireGuest from './components/require-guest'
import MyAccount from './pages/my-account/my-account'
import Dashboard from './pages/dashboard/dashboard'
import Login from './pages/login'
import Accounts from './pages/accounts/accounts'
import UpdatePassword from './pages/update-password'
import AddOrEditAccount from './pages/accounts/add-or-edit-account'
import Business from './pages/business/business'
import AddOrEditBusiness from './pages/business/add-or-edit-business'

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
        path: '/my-account',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: '/my-account',
        element: (
          <RequireAuth>
            <MyAccount />
          </RequireAuth>
        ),
      },
      {
        path: '/my-account/update-password',
        element: (
          <RequireAuth>
            <UpdatePassword />
          </RequireAuth>
        ),
      },
      {
        path: '/accounts',
        element: (
          <RequireAuth>
            <Accounts />
          </RequireAuth>
        ),
      },
      {
        path: '/accounts/:id/edit',
        element: (
          <RequireAuth>
            <AddOrEditAccount />
          </RequireAuth>
        ),
      },
      {
        path: '/accounts/add',
        element: (
          <RequireAuth>
            <AddOrEditAccount />
          </RequireAuth>
        ),
      },
      {
        path: '/business',
        element: (
          <RequireAuth>
            <Business />
          </RequireAuth>
        ),
      },
      {
        path: '/business/:id/edit',
        element: (
          <RequireAuth>
            <AddOrEditBusiness />
          </RequireAuth>
        ),
      },
      {
        path: '/business/add',
        element: (
          <RequireAuth>
            <AddOrEditBusiness />
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
