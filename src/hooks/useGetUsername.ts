import { IUser } from '@/interfaces/message'
import { useEffect, useState } from 'react'

export const useGetUsername = () => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const userInStorage = sessionStorage.getItem('@chat-username')
    if (userInStorage) {
      const parsedUser = JSON.parse(userInStorage) as IUser
      setUser(parsedUser)
    }
  }, [])

  return {
    user,
  }
}
