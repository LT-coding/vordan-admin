import logo from '@/assets/images/logo.png'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import axiosClient from '@/services/axiosClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as z from 'zod'

const formSchema = z.object({
  login: z
    .string()
    .min(1, {
      message: 'Login is required',
    })
    .email(),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  remember: z.boolean(),
})

export default function Login() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      remember: false,
    },
  })

  async function handleLogin(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      await axiosClient('sanctum/csrf-cookie')
      const res = await axiosClient.post('api/login', values)
      const resToken = res.data.data.token
      Cookies.set('token', resToken)
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data.error) {
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
    <div className='flex items-center justify-center bg-gray-100 min-h-dvh'>
      <div className='flex flex-col items-center gap-4 pt-8 bg-background p-8 rounded-lg w-full max-w-md'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className='flex flex-col items-center justify-center gap-4 w-full'
          >
            <img src={logo} alt='vordan logo' />
            <FormField
              name='login'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required={true} className='font-bold '>
                    Login
                  </FormLabel>
                  <div className='relative'>
                    <Mail className='pointer-events-none absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                    <FormControl>
                      <Input {...field} type='email' className='ps-9' />
                    </FormControl>
                  </div>
                  <FormMessage className='font-bold' />
                </FormItem>
              )}
            />
            <div className='flex w-full flex-col items-end gap-2 sm:items-center sm:gap-6'>
              <FormField
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold '>
                      Password
                    </FormLabel>
                    <div className='relative'>
                      <LockKeyhole className='pointer-events-none absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                      <FormControl>
                        <Input {...field} type='password' className='ps-9' />
                      </FormControl>
                    </div>
                    <FormMessage className='font-bold' />
                  </FormItem>
                )}
              />
              <div className='flex w-full items-center justify-between gap-4 pt-2'>
                <div className='flex items-center'>
                  <FormField
                    control={form.control}
                    name='remember'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            id='remember'
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Label
                    htmlFor='remember'
                    className='whitespace-nowrap pb-0 pl-2 text-sm font-bold leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to='/forgot-password'
                  className='whitespace-nowrap text-xs  hover:underline'
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button
              className='mt-6 w-full text-lg font-bold'
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
