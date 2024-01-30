import ChatCam from './ChatCam'

export const Chat = () => {
  return (
    <aside className='h-full bg-1000 p-2 w-3/12 hidden justify-between flex-col md:flex rounded-lg'>
      <section className='h-full max-h-[90%] overflow-y-auto justify-center items-start scrollbar-hide'>
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
        <ChatCam />
      </section>

      <form className='my-2'>
        <div>
          <input className="px-3 py-2 rounded-lg bg-950 border-2 w-full outline-none border-transparent" type="text" name='' id='' placeholder='Enviar menssagem' />
        </div>
      </form>
    </aside>
  )
}

'aes-256-cbc'