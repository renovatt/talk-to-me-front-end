'use client'
import { SocketContext } from '@/contexts/socketContext'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import ChatMessage from '../../components/ChatMessage'

interface IMessage {
  roomId: string
  message: string
  username: string
  time: string
}

export const Chat = ({ roomId }: { roomId: string }) => {
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

  return (
    <aside className="hidden h-full w-3/12 flex-col justify-between rounded-lg bg-400 p-2 md:flex">
      <section className="h-full max-h-[90%] items-start justify-center overflow-y-auto scrollbar-hide">
        {bodyMessage.map((message, index) => {
          return <ChatMessage key={index} {...message} />
        })}
      </section>

      <form className="my-2" onSubmit={(e) => handleSendMessage(e)}>
        <div>
          <input
            ref={currentMessage}
            className="w-full rounded-lg border-2 border-transparent bg-950 px-3 py-2 outline-none"
            type="text"
            name=""
            id=""
            placeholder="Enviar menssagem"
          />
        </div>

        <button type="submit">enviar</button>
      </form>
    </aside>
  )
}
