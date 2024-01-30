"use client"
import { Message, MessageMuted } from '@/Icons'
import { Chat } from '@/app/_components/Chat'
import GridCam from '@/app/_components/GridCam'
import { useState } from 'react'

export default function ScreenRoom({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <section className="w-full my-4 flex justify-between px-3 items-center">
        <h1 className="font-bold text-base md:text-2xl">Sala: {id}</h1>
        {isOpen ? (
          <MessageMuted className="h-6 w-6 cursor-pointer hidden md:flex" onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <Message className="h-6 w-6 cursor-pointer hidden md:flex" onClick={() => setIsOpen(!isOpen)} />
        )}
      </section>

      <section className="w-full flex md:h-[70%] p-2 px-3 gap-4 justify-between items-start relative">
        <GridCam isOpen={isOpen} />
        {isOpen && <Chat />}
      </section>
    </>
  )
}
