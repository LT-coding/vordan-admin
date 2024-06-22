// import { InputType } from '@/components/ui/input'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function formatInputValue(
//   value: unknown,
//   type: InputType | undefined
// ): string {
//   if (!type) return ''
//   if (!value) {
//     return ''
//   }
//   if (typeof value === 'number') {
//     value = value.toString()
//   }
//   if (typeof value === 'string') {
//     if (type === 'integerWithDecimal') {
//       return value.replace(/[^0-9.]/g, '')
//     }
//     if (type === 'integer') {
//       return value.replace(/[^0-9]/g, '')
//     }
//     if (type === 'price') {
//       return value
//         .replace(/[^.\d]/g, '')
//         .replace(/^(\d*\.?)|(\d*)\.?/g, '$1$2')
//         .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
//     }
//   }
//   return value?.toString() || ''
// }
