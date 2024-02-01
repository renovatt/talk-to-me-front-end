'use client'
import Container from '@/app/_components/Container'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/home')
    }, 3000)
  }, [router])
  return (
    <main className="flex min-h-screen flex-col">
      <section className="mx-auto flex flex-1 flex-col items-center justify-center">
        <Container>
          <Image
            src="/logo.svg"
            alt="logo"
            width={120}
            height={120}
            className="animate-bounce"
          />
        </Container>
      </section>
    </main>
  )
}
