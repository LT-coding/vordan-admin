import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import axiosClient from '@/services/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash, TriangleAlert } from 'lucide-react'
import { useState } from 'react'

export default function DeleteAccountDialog({ account }: { account: any }) {
  const [open, setOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => axiosClient.delete(`api/claims/${selectedAccount?.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      setOpen(false)
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          setSelectedAccount(null)
        } else {
          setSelectedAccount(account)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          type='button'
          variant='destructive'
          size='iconSm'
          // disabled={isFetching || loading}
          // onClick={() => deleteHandler(account.id)}
        >
          <Trash size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='border-b'>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>
        <div className='flex items-center gap-4 p-4'>
          <div>
            <TriangleAlert size={60} className='text-destructive' />
          </div>
          <div className='text-lg'>
            Are you sure you wish to delete account{' '}
            <span className='font-bold text-primary'>
              {selectedAccount?.client_claim_number
                ? selectedAccount?.client_claim_number
                : selectedAccount?.claim_number}
            </span>{' '}
            ?
          </div>
        </div>
        <DialogFooter className='items-end gap-4 border-t'>
          <DialogTrigger asChild>
            <Button
              variant='secondary'
              className='w-16 gap-2'
              onClick={() => {}}
            >
              No
            </Button>
          </DialogTrigger>
          <Button
            className='w-16 gap-2'
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
