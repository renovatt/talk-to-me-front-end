import Button from "@/components/Button";
import Container from "@/app/_components/Container";
import Header from "@/app/_components/Header";
import { Input } from "@/components/Input";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex flex-col items-center mx-auto flex-1 justify-center">
        <Container>
          <article className="bg-600 max-w-[587px] w-full rounded-md overflow-hidden flex-col h-60 flex justify-between items-center">
            <section className="w-full flex justify-between items-center">
              <Link href="/" className="text-700 text-base bg-600 w-1/2 text-center p-2 cursor-pointer">Ingresso</Link>
              <Link href="/meeting" className="text-white text-base w-1/2 text-center p-2 bg-800 cursor-pointer">Nova reunião</Link>
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
  );
}
