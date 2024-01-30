import Button from '@/components/Button'
import Container from '@/app/_components/Container'
import Header from '@/app/_components/Header'
import { Input } from '@/components/Input'
import Link from 'next/link'

export default function Meeting() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="mx-auto flex flex-1 flex-col items-center justify-center">
        <Container>
          <article className="flex h-60 w-full max-w-[587px] flex-col items-center justify-start overflow-hidden rounded-md bg-600">
            <section className="flex w-full items-center justify-between">
              <Link
                href="/join"
                className="w-1/2 cursor-pointer bg-800 p-2 text-center text-base text-white"
              >
                Ingresso
              </Link>
              <Link
                href="/meeting"
                className="w-1/2 cursor-pointer bg-600 p-2 text-center text-base text-700"
              >
                Nova reunião
              </Link>
            </section>

            <form className="mt-10 space-y-4 p-4">
              <Input type="text" placeholder="Seu nome" />
              <Button title="Criar" />
            </form>
          </article>
        </Container>
      </section>
    </main>
  )
}
