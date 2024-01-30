import ChatMessage from '../../components/ChatMessage'

export const Chat = () => {
  return (
    <aside className="hidden h-full w-3/12 flex-col justify-between rounded-lg bg-400 p-2 md:flex">
      <section className="h-full max-h-[90%] items-start justify-center overflow-y-auto scrollbar-hide">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </section>

      <form className="my-2">
        <div>
          <input
            className="w-full rounded-lg border-2 border-transparent bg-950 px-3 py-2 outline-none"
            type="text"
            name=""
            id=""
            placeholder="Enviar menssagem"
          />
        </div>
      </form>
    </aside>
  )
}
