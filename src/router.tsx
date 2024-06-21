import { createBrowserRouter } from 'react-router-dom'
import App from './App'
// import GuestRoute from './components/GuestRoute'
import RequireAuth from './components/require-auth'
import Dashboard from './pages/dashboard/dashboard'
import Login from './pages/login'
import RequireGuest from './components/require-guest'
// import AnotherPage from './pages/AnotherPage'
// import AboutUs from './pages/Customization/AboutUs'
// import Banner from './pages/Customization/Banner'
// import CustomPage from './pages/Customization/CustomPages/CustomPage'
// import CustomPages from './pages/Customization/CustomPages/CustomPages'
// import CustomPart1 from './pages/Customization/CustomPart1/CustomPart1'
// import CustomPart2 from './pages/Customization/CustomPart2'
// import Footer from './pages/Customization/Footer/Footer'
// import FooterCompany from './pages/Customization/Footer/FooterCompany'
// import FooterContactInfo from './pages/Customization/Footer/FooterContactInfo'
// import FooterHelpfulLinks from './pages/Customization/Footer/FooterHelpfulLinks'
// import CustomHeader from './pages/Customization/Header/CustomHeader'
// import Seo from './pages/Customization/Seo/Seo'
// import SeoPage from './pages/Customization/Seo/SeoPage'
// import Dashboard from './pages/Dashboard/Dashboard'
// import ForgotPassword from './pages/Login/ForgotPassword'
// import Login from './pages/Login/Login'
// import ResetPassword from './pages/Login/RestorePassword'
// import PageNotFound from './pages/PageNotFound'
// import Unauthorized from './pages/Unauthorized'
// import ZipRadius from './pages/ZipRadius'

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
      // {
      //   path: '/zip-radius',
      //   element: (
      //     <RequireAuth>
      //       <ZipRadius />
      //     </RequireAuth>
      //   ),
      // },
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
  //     <GuestRoute>
  //       {' '}
  //       <ResetPassword />{' '}
  //     </GuestRoute>
  //   ),
  // },
])
