'use client'
import { Send } from '@/Icons'
import ChatMessage from '../../components/ChatMessage'
import { useChatSocket } from '@/hooks/useChatSocket'

export const Chat = ({ roomId }: { roomId: string }) => {
  const { bodyMessage, currentMessage, handleSendMessage } =
    useChatSocket(roomId)
  return (
    <aside className="hidden h-full w-3/12 flex-col justify-between rounded-lg bg-400 p-2 md:flex">
      <section className="h-full max-h-[90%] items-start justify-center overflow-y-auto scrollbar-hide">
        {bodyMessage.map((message, index) => {
          return <ChatMessage key={index} {...message} />
        })}
      </section>

      <form className="my-2" onSubmit={(e) => handleSendMessage(e)}>
        <div className="relative flex items-center justify-center">
          <input
            ref={currentMessage}
            className="w-full rounded-lg border-2 border-transparent bg-950 px-3 py-2 outline-none"
            type="text"
            name=""
            id=""
            placeholder="Enviar menssagem"
          />
          <button className="absolute right-2 cursor-pointer" type="submit">
            <Send className="opacity-50" />
          </button>
        </div>
      </form>
    </aside>
  )
}
