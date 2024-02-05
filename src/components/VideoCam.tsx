'use client'
import { RefObject } from 'react'
import { useGetUsername } from '@/hooks/useGetUsername'

export default function VideoCam({
  localStream,
}: {
  localStream: RefObject<HTMLVideoElement>
}) {
  const { username } = useGetUsername()
  return (
    <section className="relative flex h-40 w-full max-w-80 items-center justify-center overflow-hidden rounded bg-700/20 p-2 md:h-60 md:w-80">
      {localStream.current ? (
        <video
          autoPlay
          playsInline
          ref={localStream}
          className="mirror-mode rounded"
        />
      ) : (
        <div className="h-32 w-32 rounded-full bg-800 opacity-70 md:h-40 md:w-40" />
      )}
      <span className="absolute bottom-2 left-4 capitalize">{username}</span>
    </section>
  )
}
