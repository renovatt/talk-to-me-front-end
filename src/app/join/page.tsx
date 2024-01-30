import Button from '@/components/Button'
import Link from 'next/link'
import Header from '../_components/Header'
import Container from '../_components/Container'
import { Input } from '@/components/Input'

export default function Join() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="mx-auto flex flex-1 flex-col items-center justify-center">
        <Container>
          <article className="flex h-60 w-full max-w-[587px] flex-col items-center justify-between overflow-hidden rounded-md bg-600">
            <section className="flex w-full items-center justify-between">
              <Link
                href="/join"
                className="w-1/2 cursor-pointer bg-600 p-2 text-center text-base text-700"
              >
                Ingresso
              </Link>
              <Link
                href="/meeting"
                className="w-1/2 cursor-pointer bg-800 p-2 text-center text-base text-white"
              >
                Nova reunião
              </Link>
            </section>

            <form className="space-y-4 p-4">
              <Input type="text" placeholder="Seu nome" />
              <Input type="text" placeholder="ID da reunião" />
              <Button title="Entrar" />
            </form>
          </article>
        </Container>
      </section>
    </main>
  )
}
