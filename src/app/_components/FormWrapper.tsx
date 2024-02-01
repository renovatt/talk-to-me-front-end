'use client'
import { useState } from 'react'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'

export default function FormWrapper() {
  const [selectedRoom, setSelectedRoom] = useState<'create' | 'join'>('join')
  const handleSelectRoom = (room: 'create' | 'join') => {
    setSelectedRoom(room)
  }
  return (
    <article className="h-60 w-full max-w-[580px]">
      <section className="mx-auto flex items-center space-x-6 text-center ">
        <span
          className={`w-1/2 cursor-pointer  p-4 text-xs md:text-base ${
            selectedRoom === 'join' && ' rounded-t-lg bg-600  text-700'
          }`}
          onClick={() => handleSelectRoom('join')}
        >
          Ingressar
        </span>
        <span
          className={`w-1/2 cursor-pointer  p-4 text-xs md:text-base ${
            selectedRoom === 'create' && ' rounded-t-lg bg-600  text-700'
          }`}
          onClick={() => handleSelectRoom('create')}
        >
          Nova reunião
        </span>
      </section>

      <section className="space-y-8 rounded-b-lg bg-600 p-10">
        <RoomSelector selectedRoom={selectedRoom} />
      </section>
    </article>
  )
}

const RoomSelector = ({ selectedRoom }: { selectedRoom: string }) => {
  switch (selectedRoom) {
    case 'create':
      return <CreateRoom />
    case 'join':
      return <JoinRoom />
    default:
      return <JoinRoom />
  }
}
