import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { useRef } from 'react'

export default function JoinRoom() {
  const name = useRef<HTMLInputElement>(null)
  const id = useRef<HTMLInputElement>(null)
  return (
    <>
      <Input placeholder="Seu nome" type="text" ref={name} />
      <Input placeholder="ID da reunião" type="text" ref={id} />
      <Button title="Entrar" type="button" />
    </>
  )
}
