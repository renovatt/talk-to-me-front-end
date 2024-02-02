import { RefObject } from 'react'

export default function VideoCam({
  localStream,
}: {
  localStream: RefObject<HTMLVideoElement>
}) {
  const username = sessionStorage.getItem('@chat-username') as string
  return (
    <section className="relative flex h-40 w-full max-w-80 items-center justify-center overflow-hidden rounded bg-950 p-2 md:h-60 md:w-80">
      {localStream.current ? (
        <video autoPlay playsInline ref={localStream} className="rounded" />
      ) : (
        <div className="h-32 w-32 rounded-full bg-800 opacity-70 md:h-40 md:w-40" />
      )}
      <span className="absolute bottom-2 left-4 capitalize">{username}</span>
    </section>
  )
}
