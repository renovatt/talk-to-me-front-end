'use client'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { useRef } from 'react'

export default function CreateRoom() {
  const name = useRef<HTMLInputElement>(null)

  return (
    <>
      <Input placeholder="Seu nome" type="text" ref={name} />
      <Button title="Criar" type="button" />
    </>
  )
}
