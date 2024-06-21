'use client'

import tailwindTheme from '@/lib/tailwindTheme'
import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'

const MultiSelectTextInput = ({
  options,
  value,
  required,
  placeholder = 'Add New or Select',
  onChange = () => {},
  onInputChange = () => {},
  hasIcon,
  disabled,
  isClearable = false,
}: {
  options: { value: string; label: string }[]
  value: string
  required?: boolean
  placeholder?: string
  onChange: (value: string) => void
  onInputChange?: (value: string) => void
  hasIcon?: boolean
  disabled?: boolean
  isClearable?: boolean
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const valuePlaceHolder = {
    value: '',
    label: placeholder,
  }
  const valueOption = value
    ? options?.find((option) => option.value === value)
    : options?.find((option) => option.value === value) || valuePlaceHolder

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isMounted) {
    return (
      <CreatableSelect
        // id={id}
        // components={{
        //   DropdownIndicator: null,
        // }}
        isClearable={isClearable}
        // isMulti
        // menuIsOpen={false}
        // inputValue={selectValue}
        options={options}
        value={valueOption}
        required={required}
        isDisabled={disabled}
        onInputChange={onInputChange}
        onChange={(value) => {
          if (value) {
            onChange(value.value)
          } else {
            onChange('')
          }
        }}
        // onKeyDown={onKeyDown}
        // placeholder={placeholder}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'hsl(var(--accent))',
            primary25: 'hsl(var(--accent))',
          },
        })}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: tailwindTheme.borderRadius.md,
            borderColor: 'hsl(var(--input))',
            ':hover': { borderColor: tailwindTheme.colors.gray[300] },
            boxShadow: state.isFocused
              ? `0 0 0 2px hsl(var(--primary))`
              : 'none',
            paddingInline: tailwindTheme.spacing[1],
            paddingInlineStart: hasIcon ? '1.625rem' : tailwindTheme.spacing[1],
            minHeight: '40px',
          }),
          option: (base) => ({
            ...base,
            color: 'hsl(var(--foreground))',
            ':active': {
              ...base[':active'],
              backgroundColor: 'hsl(var(--accent))',
            },
            ':hover': {
              ...base[':hover'],
              backgroundColor: 'hsl(var(--accent))',
            },
            fontSize: '0.875rem',
            zIndex: 999,
          }),
          dropdownIndicator: (base) => ({
            ...base,
            svg: {
              width: '16px',
              height: '16px',
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: 'hsl(var(--text-muted-foreground))',
          }),
        }}
      />
    )
  }
  return null
}

export default MultiSelectTextInput
