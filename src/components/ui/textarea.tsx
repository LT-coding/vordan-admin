import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from './label'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  id?: string
  className?: string
  requiredLabel?: boolean
  value?: string
  required?: boolean
  label?: string
  containerClassName?: string
  labelClassName?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      value,
      className,
      label,
      required,
      requiredLabel,
      containerClassName,
      labelClassName,
      onChange = () => {},
      error,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e)
    }

    return (
      <div className={cn('flex w-full flex-col', containerClassName)}>
        {label && (
          <Label htmlFor={id} className={cn(labelClassName)}>
            {label}{' '}
            {required ||
              (requiredLabel && <span className='text-destructive'>*</span>)}
          </Label>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
            className
          )}
          id={id}
          onChange={handleChange}
          required={required}
          value={value ?? ''}
          ref={ref}
          {...props}
        />
        {error && error !== ' ' && (
          <p className='pt-1 text-xs text-destructive'>{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
