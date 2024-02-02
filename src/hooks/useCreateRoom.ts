import { useRef, FormEvent } from 'react'
import generateRandomString from '@/utils/generateRandomString'

export const useCreateRoom = () => {
  const name = useRef<HTMLInputElement>(null)

  const handleCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.current && name.current.value !== '') {
      sessionStorage.setItem('@chat-username', name.current.value)
      const roomId = generateRandomString()
      window.location.href = `/room/${roomId}`
    }
  }
  return {
    name,
    handleCreateRoom,
  }
}
