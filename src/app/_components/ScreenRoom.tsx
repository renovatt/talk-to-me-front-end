'use client'
import { Message, MessageMuted } from '@/Icons'
import { Chat } from '@/app/_components/Chat'
import GridCam from '@/app/_components/GridCam'
import { SocketContext } from '@/contexts/socketContext'
import { useContext, useEffect, useRef, useState } from 'react'

export default function ScreenRoom({ id }: { id: string }) {
  const { socket } = useContext(SocketContext)
  const [isOpen, setIsOpen] = useState(true)
  const localStream = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('connected')
      socket?.emit('subscribe', {
        roomId: id,
        socketId: socket.id,
      })
      await handleInitCamera()
    })
  }, [socket, id])

  const handleInitCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    })

    if (localStream.current) {
      localStream.current.srcObject = video
    }
  }

  return (
    <>
      <section className="my-4 flex w-full items-center justify-between px-3">
        <h1 className="text-base font-bold md:text-2xl">Sala: {id}</h1>
        {isOpen ? (
          <MessageMuted
            className="hidden h-6 w-6 cursor-pointer md:flex"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <Message
            className="hidden h-6 w-6 cursor-pointer md:flex"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </section>

      <section className="relative flex w-full items-start justify-between gap-4 p-2 px-3 md:h-[70vh]">
        <video autoPlay playsInline ref={localStream} />
        <GridCam isOpen={isOpen} localStream={localStream} />
        {isOpen && <Chat roomId={id} />}
      </section>
    </>
  )
}
