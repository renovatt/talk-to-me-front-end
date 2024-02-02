import { useRef, FormEvent } from 'react'

export const useJoinInRoom = () => {
  const name = useRef<HTMLInputElement>(null)
  const id = useRef<HTMLInputElement>(null)

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      name.current &&
      name.current.value !== '' &&
      id.current &&
      id.current.value !== ''
    ) {
      sessionStorage.setItem('@chat-username', name.current.value)
      const roomId = id.current.value
      window.location.href = `/room/${roomId}`
    }
  }
  return {
    handleJoinRoom,
    name,
    id,
  }
}
