"use client"
import Container from "@/app/_components/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/join')
    }, 3000)
  }, [router])
  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex flex-col items-center mx-auto flex-1 justify-center">
        <Container>
          <Image src="/logo.svg" alt="logo" width={120} height={120} className="animate-bounce" />
        </Container>
      </section>
    </main>
  );
}
