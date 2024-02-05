import { useRef, FormEvent } from 'react'
import generateRandomString from '@/utils/generateRandomString'
import { saveUserWithColor } from '@/utils/saveUserWithColor'

export const useCreateRoom = () => {
  const name = useRef<HTMLInputElement>(null)

  const handleCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.current && name.current.value !== '') {
      saveUserWithColor(name.current.value)
      const roomId = generateRandomString()
      window.location.href = `/room/${roomId}`
    }
  }
  return {
    name,
    handleCreateRoom,
  }
}
