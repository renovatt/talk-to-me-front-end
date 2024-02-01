interface IMessage {
  message: string
  username: string
  time: string
}

export default function ChatMessage({ message, username, time }: IMessage) {
  return (
    <article className="relative mb-2 flex w-full flex-col space-y-2 rounded-lg bg-950 p-2">
      <h4 className="text-700">{username}</h4>
      <span className="flex w-full max-w-80 flex-wrap items-center justify-start text-xs">
        {message}
      </span>
      <span className="flex w-full items-center justify-end text-xs">
        {time}
      </span>
    </article>
  )
}
