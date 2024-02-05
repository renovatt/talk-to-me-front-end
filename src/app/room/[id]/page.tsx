import ScreenRoom from '@/app/_components/ScreenRoom'
import Footer from '@/app/_components/Footer'
import Header from '@/app/_components/Header'

export default function Room({ params: { id } }: { params: { id: string } }) {
  return (
    <section className="h-screen">
      <Header />
      <ScreenRoom id={id} />
      <Footer />
    </section>
  )
}
