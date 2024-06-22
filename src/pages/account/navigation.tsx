import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className='flex p-2'>
      <NavLink
        to='/account'
        end={true}
        className={({ isActive }) =>
          `${buttonVariants({
            className: cn(
              'bg-transparent hover:bg-transparent rounded-none text-foreground  border-b-2 border-transparent hover:text-primary',
              isActive && 'border-b-2 border-primary text-primary'
            ),
          })}`
        }
      >
        Account Details
      </NavLink>
      <NavLink
        to='/account/update-password'
        className={({ isActive }) =>
          `${buttonVariants({
            className: cn(
              'bg-transparent hover:bg-transparent rounded-none text-foreground  border-b-2 border-transparent hover:text-primary',
              isActive && 'border-b-2 border-primary text-primary'
            ),
          })}`
        }
      >
        Update Password
      </NavLink>
    </div>
  )
}
