import { useEffect, useState } from 'react'

export default function useOnline() {
  const [isOnline, setIsOnline] = useState(true)

  const switchOn = () => setIsOnline(true)
  const switchOff = () => setIsOnline(false)

  useEffect(() => {
    window.addEventListener('online', switchOn)
    window.addEventListener('offline', switchOff)

    return () => {
      window.removeEventListener('online', switchOn)
      window.removeEventListener('offline', switchOff)
    }
  }, [])
  return isOnline
}
