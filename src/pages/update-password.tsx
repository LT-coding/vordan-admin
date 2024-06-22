import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { passwordValidation } from '@/helpers/validations'
import axiosClient from '@/services/axiosClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import Navigation from './account/navigation'

const formSchema = z
  .object({
    old_password: z.string().min(1, { message: 'Password is required' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .regex(passwordValidation, {
        message: 'Password is weak',
      }),
    password_confirmation: z
      .string()
      .min(1, { message: 'Password is required' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  })

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
  })

  async function handlePasswordChange(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      await axiosClient.put('api/users/password', values)
      toast({
        title: 'Password changed successfully',
      })
      navigate('/account')
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
    <div className='flex-1'>
      <Header title='My Account' />
      <Navigation />
      <div className='flex flex-col items-center justify-center gap-4 pt-4'>
        <p>
          Password must be at least 8 characters and 1 special char like @, #,
          $, _, &, *, .
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePasswordChange)}
            className='flex w-full max-w-xl flex-col items-center justify-center gap-6'
          >
            <FormField
              name='old_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required={true} className='font-bold'>
                    Old Password
                  </FormLabel>
                  <div className='relative'>
                    <LockKeyhole className='absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                    <FormControl>
                      <Input {...field} type='password' className='ps-9' />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required={true} className='font-bold'>
                    New Password
                  </FormLabel>
                  <div className='relative'>
                    <LockKeyhole className='absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                    <FormControl>
                      <Input {...field} type='password' className='ps-9' />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password_confirmation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required={true} className='font-bold'>
                    Confirm Password
                  </FormLabel>
                  <div className='relative'>
                    <LockKeyhole className='absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                    <FormControl>
                      <Input {...field} type='password' className='ps-9' />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full items-center justify-between border-t pt-4'>
              <p>
                <span className='text-destructive'>* </span>
                Required Fields
              </p>
              <div className='flex gap-4'>
                <Button disabled={loading}>Save</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
