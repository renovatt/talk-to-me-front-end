import Image from "next/image";
import Container from "./Container";

export default function Header() {
  return (
    <header className="bg-1000 p-4 border-b border-700">
      <Container>
        <div className="flex justify-between">
          <Image src="/logo.svg" alt="logo" width={120} height={120} />
          <Image src="/logo-2.svg" alt="logo" width={40} height={40} />
        </div>
      </Container>
    </header>
  )
}