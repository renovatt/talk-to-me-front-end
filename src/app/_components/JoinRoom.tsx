'use client'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { useJoinInRoom } from '@/hooks/useJoinInRoom'

export default function JoinRoom() {
  const { handleJoinRoom, name, id } = useJoinInRoom()
  return (
    <>
      <form onSubmit={(e) => handleJoinRoom(e)} className="space-y-8">
        <Input placeholder="Seu nome" type="text" ref={name} />
        <Input placeholder="ID da reunião" type="text" ref={id} />
        <Button title="Entrar" type="submit" />
      </form>
    </>
  )
}
