'use client'
import { Message, MessageMuted } from '@/Icons'
import { Chat } from '@/app/_components/Chat'
import GridCam from '@/app/_components/GridCam'
import { useState } from 'react'

export default function ScreenRoom({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(true)
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

      <section className="relative flex w-full items-start justify-between gap-4 p-2 px-3 md:h-[70%]">
        <GridCam isOpen={isOpen} />
        {isOpen && <Chat />}
      </section>
    </>
  )
}
