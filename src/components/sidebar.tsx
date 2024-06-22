import { Button, buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import axiosClient from '@/services/axiosClient'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { LogOut, UserRound, UserRoundCog } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const { toast } = useToast()
  const navigate = useNavigate()
  // const { setSkipAuthCheck } = useUserStore()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      await axiosClient('sanctum/csrf-cookie')
      await axiosClient.post('api/logout')
      Cookies.remove('token')
      navigate('/login')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.error) {
          toast({
            title: error.response.data.error,
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Something went wrong',
            variant: 'destructive',
          })
        }
      }
    }
    setLoading(false)
  }

  return (
    <div className='sticky top-0 z-40 flex max-h-[calc(100dvh-0rem)] w-64 shrink-0 flex-col gap-2 bg-slate-800 p-4'>
      <NavLink
        to='/account'
        className={({ isActive }) =>
          `!justify-start ${buttonVariants({
            className: cn(
              'bg-transparent hover:bg-slate-700 gap-2',
              isActive && 'bg-primary hover:bg-primary/80'
            ),
          })}`
        }
      >
        <UserRoundCog />
        My Account
      </NavLink>
      <NavLink
        to='/managers'
        className={({ isActive }) =>
          `!justify-start ${buttonVariants({
            className: cn(
              'bg-transparent hover:bg-slate-700 gap-2',
              isActive && 'bg-primary hover:bg-primary/80'
            ),
          })}`
        }
      >
        <UserRound />
        Managers
      </NavLink>
      <Button
        variant='secondary'
        disabled={loading}
        onClick={handleLogout}
        className='sticky bottom-4 mt-auto gap-2'
      >
        <LogOut />
        Logout
      </Button>
    </div>
  )
}
