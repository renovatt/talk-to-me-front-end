import { useEffect, useState } from 'react'

export const useGetUsername = () => {
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const username = sessionStorage.getItem('@chat-username') as string
    setUsername(username)
  }, [])
  return {
    username,
  }
}
