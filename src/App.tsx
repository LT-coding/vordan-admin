import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar'
import { Toaster } from './components/ui/toaster'

export default function App() {
  return (
    <>
      <div className='flex min-h-screen w-full md:flex-row-reverse'>
        <Sidebar />
        <Outlet />
      </div>
      <Toaster />
    </>
  )
}
