'use client'
import Container from './Container'
import { Camera, CameraMuted, Mic, MicMuted, Pc, PcMuted, Phone } from '@/Icons'
import { useContext, useState } from 'react'
import { SocketContext } from '@/contexts/socketContext'
import { useRouter } from 'next/navigation'
import { FooterProps } from '@/interfaces/media'

export default function Footer({
  localStream,
  peerConnections,
  videoMediaStream,
}: FooterProps) {
  const { socket } = useContext(SocketContext)

  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isScreenSharing, setScreenSharing] = useState(false)

  const currentDate = new Date()
  const hour = currentDate.getHours().toString().padStart(2, '0') + ':'
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')

  const router = useRouter()

  const toggleMuted = () => {
    setIsMuted(!isMuted)
    videoMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = isMuted
    })

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'audio') {
          if (videoMediaStream?.getAudioTracks()[0]) {
            sender.replaceTrack(
              videoMediaStream
                ?.getAudioTracks()
                .find((track) => track.kind === 'audio') || null,
            )
          }
        }
      })
    })
  }

  const toggleVideo = () => {
    setIsCameraOff(!isCameraOff)
    videoMediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOff
    })

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(
            videoMediaStream
              ?.getVideoTracks()
              .find((track) => track.kind === 'video') || null,
          )
        }
      })
    })
  }

  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      const videoShareScreen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      })
      if (localStream.current) localStream.current.srcObject = videoShareScreen

      Object.values(peerConnections.current).forEach((peerConnections) => {
        peerConnections.getSenders().forEach((sender) => {
          if (sender.track?.kind === 'video') {
            sender.replaceTrack(videoShareScreen.getVideoTracks()[0])
          }
        })
      })

      setScreenSharing(!isScreenSharing)
      return
    }

    if (localStream.current) localStream.current.srcObject = videoMediaStream

    Object.values(peerConnections.current).forEach((peerConnections) => {
      peerConnections.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          const videoTrack = videoMediaStream?.getVideoTracks()[0] || null
          sender.replaceTrack(videoTrack)
        }
      })
    })
    setScreenSharing(!isScreenSharing)
  }

  const logout = () => {
    videoMediaStream?.getTracks().forEach((track) => {
      track.stop()
    })
    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.close()
    })
    socket?.disconnect()
    router.push('/')
  }

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
                onClick={toggleMuted}
                className="h-10 w-14 cursor-pointer rounded-md bg-500 p-2 text-white transition-all hover:opacity-90"
              />
            ) : (
              <Mic
                onClick={toggleMuted}
                className="h-10 w-14 cursor-pointer rounded-md bg-950 p-2 text-white transition-all hover:opacity-90"
              />
            )}

            {isCameraOff ? (
              <CameraMuted
                onClick={toggleVideo}
                className="h-10 w-14 cursor-pointer rounded-md bg-500 p-2 text-white transition-all hover:opacity-90"
              />
            ) : (
              <Camera
                onClick={toggleVideo}
                className="h-10 w-14 cursor-pointer rounded-md bg-950 p-2 text-white transition-all hover:opacity-90"
              />
            )}

            {isScreenSharing ? (
              <PcMuted
                onClick={toggleScreenSharing}
                className="h-10 w-14 cursor-pointer rounded-md bg-500 p-2 text-white transition-all hover:opacity-90"
              />
            ) : (
              <Pc
                onClick={toggleScreenSharing}
                className="h-10 w-14 cursor-pointer rounded-md bg-950 p-2 text-white transition-all hover:opacity-90"
              />
            )}

            <Phone
              onClick={logout}
              className="h-10 w-14 cursor-pointer rounded-md bg-700 p-2 text-white transition-all hover:bg-red-500"
            />
          </section>
        </article>
      </Container>
    </footer>
  )
}
