import Header from '@/components/header'
import Spinner from '@/components/ui/Spinner'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Save, SquareX, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as z from 'zod'

const formSchema = z.object({
  // logo: z.any().refine((file) => file instanceof File || file === undefined, {
  //   message: 'Invalid file',
  // }),
  company_name: z.string().min(1, {
    message: 'Company Name is required',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  tax_code: z.string().min(1, {
    message: 'Tax Code is required',
  }),
  register_code: z.string().min(1, {
    message: 'Register Code is required',
  }),
  registered_address: z.string().min(1, {
    message: 'Registered Address is required',
  }),
  activity_address: z.string().min(1, {
    message: 'Activity Address is required',
  }),
})

export default function AddOrEditBusiness() {
  const { id } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [logo, setLogo] = useState<File | undefined>(undefined)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // logo: undefined,
      company_name: '',
      email: '',
      tax_code: '',
      register_code: '',
      registered_address: '',
      activity_address: '',
    },
  })

  function handleBusinessSave(values: z.infer<typeof formSchema>) {
    if (!logo) {
      toast({
        title: 'Please select a logo',
        variant: 'destructive',
      })
      return
    }
    const formData = new FormData()
    if (id) {
      formData.append('_method', 'put')
    }
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as keyof typeof values])
    })
    if (logo) {
      formData.append('logo', logo)
    }

    mutation.mutate(formData)
  }

  const mutation = useMutation({
    mutationFn: (postValues: any) => {
      if (id) {
        return axiosClient.post(`api/claims/${id}`, postValues)
      } else {
        return axiosClient.post(`api/claims`, postValues)
      }
    },
    onSuccess: (data) => {
      const businessId = data?.data?.id
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['business', id] })
      }
      queryClient.invalidateQueries({ queryKey: ['business'] })
      toast({
        title: id ? 'Business Updated' : 'Business Created',
      })

      if (businessId) {
        navigate(`/business/${businessId}/edit`)
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message
        if (message) {
          toast({
            title: message,
            variant: 'destructive',
          })
        }
      }
    },
  })
  return (
    <div className='flex-1'>
      <Spinner isSpinning={mutation.isPending} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleBusinessSave)}
          className='w-full'
        >
          <Header title={id ? 'Edit Business' : 'Add Business'}>
            <Link to='/business'>
              <Button type='button' variant='ghost' className='gap-2'>
                Cancel
                <SquareX />
              </Button>
            </Link>
            <Button type='submit' variant='ghost' className='gap-2'>
              Save
              <Save />
            </Button>
          </Header>
          <div className='w-full flex justify-center'>
            <div className='grid grid-cols-2 items-center justify-center gap-4 w-full max-w-3xl p-8'>
              <div className='space-y-2'>
                <FormLabel required={true} className='font-bold'>
                  Logo
                </FormLabel>
                <Input
                  type='file'
                  placeholder='logo'
                  onChange={(e) => {
                    setLogo(e.target.files?.[0])
                  }}
                />
              </div>
              {/* <FormField
                control={form.control}
                name='logo'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel required={true} className='font-bold'>
                        Logo
                      </FormLabel>
                      <FormControl>
                        <Input type='file' placeholder='logo' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              /> */}
              <FormField
                name='company_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold '>
                      Company Name
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
              <FormField
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold '>
                      Email
                    </FormLabel>
                    <div className='relative'>
                      <UserRound className='pointer-events-none absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                      <FormControl>
                        <Input {...field} type='email' className='ps-9' />
                      </FormControl>
                    </div>
                    <FormMessage className='font-bold' />
                  </FormItem>
                )}
              />
              <FormField
                name='tax_code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold '>
                      Tax Code
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
              <FormField
                name='register_code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold '>
                      Register Code
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
              <FormField
                name='registered_address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold '>
                      Registered Address
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
              <FormField
                name='activity_address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold '>
                      Activity Address
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
