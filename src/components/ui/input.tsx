import * as React from 'react'

import { Label } from '@/components/ui/label'
import { cn, formatInputValue } from '@/lib/utils'
import { Button } from './button'

export type InputType =
  | 'integerWithDecimal'
  | 'integer'
  | 'decimal'
  | 'phone'
  | 'price'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  type?: string
  value?: string
  label?: string
  icon?: React.ReactNode
  iconButton?: React.ReactNode
  required?: boolean
  requiredLabel?: boolean
  inputType?: InputType
  containerClassName?: string
  isNumber?: boolean
  className?: string
  labelClassName?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const inputVariants =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type,
      value,
      className,
      inputType,
      isNumber,
      label,
      icon,
      iconButton,
      required,
      requiredLabel,
      containerClassName,
      labelClassName,
      error,
      onChange = () => {},
      ...props
    },
    ref
  ) => {
    const formattedValue = formatInputValue(value, inputType)

    const inputMode = isNumber
      ? 'numeric'
      : type === 'email'
      ? 'email'
      : type === 'url'
      ? 'url'
      : type === 'tel'
      ? 'tel'
      : type === 'search'
      ? 'search'
      : 'text'

    return (
      <div className={cn('flex w-full flex-col', containerClassName)}>
        {label && (
          <Label htmlFor={id} className={cn(labelClassName)}>
            {label}{' '}
            {required ||
              (requiredLabel && <span className='text-destructive'>*</span>)}
          </Label>
        )}
        <div>
          <div className='relative'>
            {icon && (
              <div className='pointer-events-none absolute start-2 top-1/2 -translate-y-1/2 text-muted-foreground'>
                {icon}
              </div>
            )}
            <input
              id={id}
              type={type}
              required={required}
              inputMode={inputMode}
              className={cn(
                inputVariants,
                icon && 'ps-9',
                iconButton && 'pe-10',
                error && 'border-red-600',
                className
              )}
              ref={ref}
              value={formattedValue}
              onChange={onChange}
              {...props}
            />
            {iconButton && (
              <Button
                variant='ghost'
                size='icon'
                className='absolute end-0 top-1/2 -translate-y-1/2 text-muted-foreground'
              >
                {iconButton}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
