import { SocketContext } from '@/contexts/socketContext'
import { IMessage, IUser } from '@/interfaces/message'
import { useContext, useRef, useState, FormEvent, useEffect } from 'react'
import { useGetUsername } from './useGetUsername'

export const useChatSocket = (roomId: string) => {
  const { socket } = useContext(SocketContext)
  const { user } = useGetUsername()

  const currentMessage = useRef<HTMLInputElement>(null)
  const [bodyMessage, setBodyMessage] = useState<IMessage[]>([])

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentMessage.current && currentMessage.current?.value !== '') {
      const dataMessage: IMessage = {
        roomId,
        message: currentMessage.current.value,
        username: user as IUser,
        time: new Date().toLocaleTimeString(),
      }

      socket?.emit('chat', dataMessage)
      setBodyMessage((prevBodyMessage: IMessage[]) => [
        ...prevBodyMessage,
        dataMessage,
      ])

      if (currentMessage.current) {
        currentMessage.current.value = ''
      }
    }
  }

  useEffect(() => {
    socket?.on('chat', (data: IMessage) => {
      setBodyMessage((prevBodyMessage: IMessage[]) => [
        ...prevBodyMessage,
        data,
      ])
    })

    return () => {
      socket?.off('chat')
    }
  }, [socket, roomId])

  return {
    handleSendMessage,
    currentMessage,
    bodyMessage,
  }
}
