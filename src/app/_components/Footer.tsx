'use client'
import { Camera, CameraMuted, Mic, MicMuted, Pc, PcMuted, Phone } from "@/Icons";
import Container from "./Container";
import { useState } from "react";

export default function Footer() {
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isScreenSharing, setScreenSharing] = useState(false)

  const currentDate = new Date()
  const hour = currentDate.getHours().toString().padStart(2, '0') + ':';
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  return (
    <footer className="fixed bottom-0 bg-800 py-4 w-full border-t border-700">
      <Container>
        <article className="grid grid-cols-1 md:grid-cols-3">
          <section className="flex items-center justify-center md:mb-0 my-2 mb-4">
            <span className="md:text-base text-xs">{hour}{minutes}</span>
          </section>

          <section className="flex space-x-6 justify-center items-center">
            {isMuted ? (
              <MicMuted
                onClick={() => setIsMuted(!isMuted)}
                className="h-10 w-14 cursor-pointer rounded-md text-white p-2 bg-500 hover:opacity-90 transition-all" />
            ) : (
              <Mic
                onClick={() =>
                  setIsMuted(!isMuted)}
                className="h-10 w-14 cursor-pointer rounded-md text-white p-2 bg-950 hover:opacity-90 transition-all" />
            )}

            {isCameraOff ? (
              <CameraMuted
                onClick={() => setIsCameraOff(!isCameraOff)}
                className="h-10 w-14 cursor-pointer rounded-md text-white p-2 bg-500 hover:opacity-90 transition-all" />) : (
              <Camera
                onClick={() => setIsCameraOff(!isCameraOff)}
                className="h-10 w-14 cursor-pointer rounded-md text-white p-2 bg-950 hover:opacity-90 transition-all" />
            )}

            {isScreenSharing ? (
              <PcMuted
                onClick={() => setScreenSharing(!isScreenSharing)}
                className="h-10 w-14 cursor-pointer rounded-md text-white p-2 bg-500 hover:opacity-90 transition-all" />) : (
              <Pc
                onClick={() => setScreenSharing(!isScreenSharing)}
                className="h-10 w-14 cursor-pointer rounded-md text-white p-2 bg-950 hover:opacity-90 transition-all" />
            )}

            <Phone className="h-10 w-14 cursor-pointer hover:bg-red-500 rounded-md text-white p-2 bg-700 transition-all" />
          </section>
        </article>
      </Container>
    </footer>
  )
}