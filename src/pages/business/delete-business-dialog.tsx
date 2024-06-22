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

export default function DeleteBusinessDialog({ business }: { business: any }) {
  const [open, setOpen] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => axiosClient.delete(`api/claims/${selectedBusiness?.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesss'] })
      setOpen(false)
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          setSelectedBusiness(null)
        } else {
          setSelectedBusiness(business)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          type='button'
          variant='destructive'
          size='iconSm'
          // disabled={isFetching || loading}
          // onClick={() => deleteHandler(business.id)}
        >
          <Trash size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='border-b'>
          <DialogTitle>Delete Business</DialogTitle>
        </DialogHeader>
        <div className='flex items-center gap-4 p-4'>
          <div>
            <TriangleAlert size={60} className='text-destructive' />
          </div>
          <div className='text-lg'>
            Are you sure you wish to delete business{' '}
            <span className='font-bold text-primary'>
              {selectedBusiness?.client_claim_number
                ? selectedBusiness?.client_claim_number
                : selectedBusiness?.claim_number}
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
