import { Message } from "@/Icons";
import { Chat } from "@/components/Chat";
import Footer from "@/components/Footer";
import GridCam from "@/components/GridCam";
import Header from "@/components/Header";

export default function Room({ params: { id } }: { params: { id: string } }) {
  return (
    <section className="h-screen">
      <Header />
      <section className="w-full my-4 flex justify-between px-3 items-center">
        <h1 className="font-bold text-base md:text-2xl">Sala: {id}</h1>
        <Message className="h-6 w-6 cursor-pointer" />
      </section>

      <section className="w-full flex md:h-[70%] p-2 px-3 gap-4 justify-between items-start ">
        <GridCam />
        <Chat />
      </section>
      <Footer />
    </section>
  )
}