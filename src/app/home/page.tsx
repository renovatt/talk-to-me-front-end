import Header from '../_components/Header'
import FormWrapper from '../_components/FormWrapper'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="mx-auto flex flex-1 flex-col items-center justify-center">
        <FormWrapper />
      </section>
    </main>
  )
}
