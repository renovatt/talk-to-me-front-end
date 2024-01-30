import Image from 'next/image'
import Container from './Container'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-700 bg-400 p-4">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={128}
              height={128}
              className="w-20 md:w-32"
            />
          </Link>
          <Image
            src="/logo-2.svg"
            alt="logo"
            width={40}
            height={40}
            className="w-7 md:w-10"
          />
        </div>
      </Container>
    </header>
  )
}
