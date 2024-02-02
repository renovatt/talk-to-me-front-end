import { SocketContext } from '@/contexts/socketContext'
import { useContext, useRef, useState, FormEvent, useEffect } from 'react'

interface IMessage {
  roomId: string
  message: string
  username: string
  time: string
}

export const useChatSocket = (roomId: string) => {
  const { socket } = useContext(SocketContext)

  const currentMessage = useRef<HTMLInputElement>(null)
  const [bodyMessage, setBodyMessage] = useState<IMessage[]>([])

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = sessionStorage.getItem('@chat-username') as string

    if (currentMessage.current && currentMessage.current?.value !== '') {
      const dataMessage = {
        roomId,
        message: currentMessage.current.value,
        username,
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
