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
import axiosClient from '@/services/axiosClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { Phone, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import Navigation from './navigation'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  phone: z.string().min(1, {
    message: 'Phone is required',
  }),
})

export default function MyAccount() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  })

  async function handleAccountSave(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      await axiosClient('sanctum/csrf-cookie')
      const res = await axiosClient.post('api/my-account', values)
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
    <div className='flex-1'>
      <Header title='My Account' />
      <Navigation />
      <div className='flex justify-center p-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAccountSave)}
            className='flex flex-col items-center justify-center gap-4 w-full max-w-xl'
          >
            <FormField
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required={true} className='font-bold '>
                    Name
                  </FormLabel>
                  <div className='relative'>
                    <UserRound className='pointer-events-none absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                    <FormControl>
                      <Input {...field} type='text' className='ps-9' />
                    </FormControl>
                  </div>
                  <FormMessage className='font-bold' />
                </FormItem>
              )}
            />
            <div className='flex w-full flex-col items-end gap-2 sm:items-center sm:gap-6'>
              <FormField
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold '>
                      Phone
                    </FormLabel>
                    <div className='relative'>
                      <Phone className='pointer-events-none absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                      <FormControl>
                        <Input {...field} className='ps-9' />
                      </FormControl>
                    </div>
                    <FormMessage className='font-bold' />
                  </FormItem>
                )}
              />
            </div>
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
