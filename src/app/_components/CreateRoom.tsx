'use client'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { FormEvent, useRef } from 'react'

export default function CreateRoom() {
  const name = useRef<HTMLInputElement>(null)

  const handleCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.current && name.current.value !== '') {
      sessionStorage.setItem('@chat-username', name.current.value)
      const roomId = generateRandomString()
      window.location.href = `/room/${roomId}`
    }
  }

  function generateRandomString() {
    const randomString = Math.random().toString(36).substring(2, 7)
    return randomString
  }

  return (
    <>
      <form onSubmit={(e) => handleCreateRoom(e)} className="space-y-8">
        <Input placeholder="Seu nome" type="text" ref={name} />
        <Button title="Criar" type="submit" />
      </form>
    </>
  )
}
