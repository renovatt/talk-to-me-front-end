import Image from "next/image";
import Container from "./Container";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-1000 p-4 border-b border-700">
      <Container>
        <div className="flex justify-between">
          <Link href="/">
          <Image src="/logo.svg" alt="logo" width={120} height={120} />
        </Link>
        <Image src="/logo-2.svg" alt="logo" width={40} height={40} />
      </div>
    </Container>
    </header >
  )
}