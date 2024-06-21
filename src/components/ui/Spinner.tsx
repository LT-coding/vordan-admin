import { cn } from '@/lib/utils'

const Spinner = ({
  isSpinning,
  spinnerClassName,
  containerClassName,
  background = true,
  fixed = true,
  center = false,
}: {
  isSpinning: boolean
  spinnerClassName?: string
  containerClassName?: string
  background?: boolean
  fixed?: boolean
  center?: boolean
}) => {
  return (
    <>
      {isSpinning && (
        <>
          {background && (
            <div className='fixed inset-0 z-40 bg-black opacity-10' />
          )}
          <div
            className={cn(
              'z-50',
              fixed &&
                'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              center &&
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              containerClassName
            )}
          >
            <div className='flex items-center justify-center'>
              <div
                className={cn(
                  'aspect-square w-36 animate-spin rounded-full border-b-4 border-primary',
                  spinnerClassName
                )}
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Spinner
