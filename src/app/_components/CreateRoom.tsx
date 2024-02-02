'use client'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { useCreateRoom } from '@/hooks/useCreateRoom'

export default function CreateRoom() {
  const { handleCreateRoom, name } = useCreateRoom()
  return (
    <>
      <form onSubmit={(e) => handleCreateRoom(e)} className="space-y-8">
        <Input placeholder="Seu nome" type="text" ref={name} />
        <Button title="Criar" type="submit" />
      </form>
    </>
  )
}
