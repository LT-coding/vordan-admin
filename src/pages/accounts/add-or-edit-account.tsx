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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import axiosClient from '@/services/axiosClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Phone, Save, SquareX, UserCog, UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  phone: z.string().min(1, {
    message: 'Phone is required',
  }),
  role: z.string().min(1, {
    message: 'Role is required',
  }),
})

export default function AddOrEditAccount() {
  const { id } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '',
    },
  })

  function handleAccountSave(values: z.infer<typeof formSchema>) {
    // console.log('🚀 ~ file: add-or-edit-account.tsx:63 ~ values:', values)
    mutation.mutate(values)
  }

  const mutation = useMutation({
    mutationFn: (postValues: any) => {
      if (id) {
        return axiosClient.put(`api/accounts/${id}`, postValues)
      } else {
        return axiosClient.post(`api/accounts`, postValues)
      }
    },
    onSuccess: (data) => {
      const accountId = data?.data?.id
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['accounts', id] })
      }
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast({
        title: id ? 'Account Updated' : 'Account Created',
      })

      if (accountId) {
        navigate(`/accounts/${accountId}/edit`)
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
          onSubmit={form.handleSubmit(handleAccountSave)}
          className='w-full'
        >
          <Header title={id ? 'Edit Account' : 'Add Account'}>
            <Link to='/accounts'>
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
            <div className='flex flex-col items-center justify-center gap-4 w-full max-w-xl p-8'>
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
              <FormField
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={true} className='font-bold'>
                      Role
                    </FormLabel>
                    <div className='relative'>
                      <UserCog className='pointer-events-none absolute start-2 top-1/2 z-10 -translate-y-1/2 text-muted-foreground' />
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='ps-9 capitalize'>
                            <SelectValue placeholder='Select role' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {['admin', 'manager']?.map((item: any) => (
                                <SelectItem
                                  key={item}
                                  value={String(item)}
                                  className='capitalize'
                                >
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
