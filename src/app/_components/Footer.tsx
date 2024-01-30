'use client'
import { Camera, CameraMuted, Mic, MicMuted, Pc, PcMuted, Phone } from '@/Icons'
import Container from './Container'
import { useState } from 'react'

export default function Footer() {
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isScreenSharing, setScreenSharing] = useState(false)

  const currentDate = new Date()
  const hour = currentDate.getHours().toString().padStart(2, '0') + ':'
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')
  return (
    <footer className="fixed bottom-0 w-full border-t border-700 bg-800 py-4">
      <Container>
        <article className="grid grid-cols-1 md:grid-cols-3">
          <section className="my-2 mb-4 flex items-center justify-center md:mb-0">
            <span className="text-xs md:text-base">
              {hour}
              {minutes}
            </span>
          </section>

          <section className="flex items-center justify-center space-x-6">
            {isMuted ? (
              <MicMuted
                onClick={() => setIsMuted(!isMuted)}
                className="h-10 w-14 cursor-pointer rounded-md bg-500 p-2 text-white transition-all hover:opacity-90"
              />
            ) : (
              <Mic
                onClick={() => setIsMuted(!isMuted)}
                className="h-10 w-14 cursor-pointer rounded-md bg-950 p-2 text-white transition-all hover:opacity-90"
              />
            )}

            {isCameraOff ? (
              <CameraMuted
                onClick={() => setIsCameraOff(!isCameraOff)}
                className="h-10 w-14 cursor-pointer rounded-md bg-500 p-2 text-white transition-all hover:opacity-90"
              />
            ) : (
              <Camera
                onClick={() => setIsCameraOff(!isCameraOff)}
                className="h-10 w-14 cursor-pointer rounded-md bg-950 p-2 text-white transition-all hover:opacity-90"
              />
            )}

            {isScreenSharing ? (
              <PcMuted
                onClick={() => setScreenSharing(!isScreenSharing)}
                className="h-10 w-14 cursor-pointer rounded-md bg-500 p-2 text-white transition-all hover:opacity-90"
              />
            ) : (
              <Pc
                onClick={() => setScreenSharing(!isScreenSharing)}
                className="h-10 w-14 cursor-pointer rounded-md bg-950 p-2 text-white transition-all hover:opacity-90"
              />
            )}

            <Phone className="h-10 w-14 cursor-pointer rounded-md bg-700 p-2 text-white transition-all hover:bg-red-500" />
          </section>
        </article>
      </Container>
    </footer>
  )
}
