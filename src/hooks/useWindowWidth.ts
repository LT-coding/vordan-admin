import { useEffect, useState } from 'react'

export function useWindowWidth() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth)

      let timeoutId: number | null = null

      const resizeListener = () => {
        clearTimeout(timeoutId!)
        timeoutId = window.setTimeout(() => setWidth(window.innerWidth), 50)
      }

      window.addEventListener('resize', resizeListener)

      return () => {
        window.removeEventListener('resize', resizeListener)
      }
    }
  }, [])

  return width
}
