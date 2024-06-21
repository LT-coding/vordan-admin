import { cn } from '@/lib/utils'
import React from 'react'
import { PatternFormat } from 'react-number-format'
import { Label } from './label'
import { RequestFormState, useRequestFormStore } from '@/store/requestForm'
import { useAppStore } from '@/store/useAppStore'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  store?: 'requestForm'
  storeKey?: keyof RequestFormState
  className?: string
  value?: string
  label?: string
  icon?: React.ReactNode
  required?: boolean
  requiredLabel?: boolean
  containerClassName?: string
  labelClassName?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const inputVariants =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70'

const InputPhone: React.FC<InputProps> = ({
  className,
  value,
  label,
  icon,
  required,
  requiredLabel,
  containerClassName,
  labelClassName,
  store,
  storeKey,
  id,
  onChange = () => {},
}) => {
  if ((store && !storeKey) || (storeKey && !store))
    throw new Error('storeKey is required when store is provided')

  const requesterFormStoreValue = useAppStore(
    store || 'requestForm',
    storeKey || 'aleBudget'
  )
  const setRequestFormStateValue = useRequestFormStore(
    (state) => state.setRequestFormStateValue
  )

  let newValue
  if (storeKey) {
    newValue = store === 'requestForm' ? requesterFormStoreValue : newValue
  } else {
    newValue = value
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (storeKey) {
      setRequestFormStateValue(storeKey, e.target.value)
    }
    onChange(e)
  }

  return (
    <div className={cn('grid w-[12.5rem] shrink-0', containerClassName)}>
      {label && (
        <Label htmlFor={storeKey ?? id} className={cn(labelClassName)}>
          {label}{' '}
          {required ||
            (requiredLabel && <span className='text-destructive'>*</span>)}
        </Label>
      )}
      <div className='relative'>
        {icon && (
          <div className='pointer-events-none absolute start-2 top-1/2 -translate-y-1/2 text-muted-foreground'>
            {icon}
          </div>
        )}
        <PatternFormat
          format='+1 (###) ###-####'
          mask='_'
          className={cn(inputVariants, icon && 'ps-9', className)}
          value={newValue as string}
          onChange={handleChange}
          allowEmptyFormatting={false}
        />
      </div>
    </div>
  )
}

export default InputPhone
