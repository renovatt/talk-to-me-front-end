'use client'
import { Message, MessageMuted } from '@/Icons'
import { Chat } from '@/app/_components/Chat'
import GridCam from '@/app/_components/GridCam'
import { SocketContext } from '@/contexts/socketContext'
import { useCreatePeerConnection } from '@/hooks/useCreatePeerConnection'
import { useInitEnhaceCamera } from '@/hooks/useInitEnhaceCamera'
import { useSetVideo } from '@/hooks/useSetVideo'
import { useSocket } from '@/hooks/useSocket'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

interface IAnswer {
  sender: string
  description: RTCSessionDescriptionInit
}

interface ICandidate {
  sender: string
  candidate: RTCIceCandidate
}

interface IDataStream {
  id: string
  stream: MediaStream
  username: string
}

export default function ScreenRoom({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(true)
  const localStream = useRef<HTMLVideoElement | null>(null)

  // const { connected } = useSocket(id)
  const { remoteStreams } = useCreatePeerConnection(id, localStream)
  // const { initLocalCamera } = useInitEnhaceCamera(localStream)

  // useEffect(() => {
  //   async function fetchData() {
  //     if (connected) {
  //       await initLocalCamera()
  //       console.log('chamando camera')
  //     }
  //   }
  //   fetchData()
  // }, [connected])

  // seu código
  // const router = useRouter()
  // const { socket } = useContext(SocketContext)

  // const localStream = useRef<HTMLVideoElement>(null)
  // const peerConnections = useRef<Record<string, RTCPeerConnection>>({})
  // const [remoteStreams, setRemoteStreams] = useState<IDataStream[]>([])
  // const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
  //   null,
  // )

  // useEffect(() => {
  //   const username = sessionStorage.getItem('username')
  //   socket?.on('connect', async () => {
  //     console.log('conectado')
  //     socket?.emit('subscribe', {
  //       roomId: id,
  //       socketId: socket.id,
  //       username,
  //     })
  //     await initLocalCamera()
  //   })

  //   socket?.on('new user', (data) => {
  //     console.log('Novo usuário tentando se conectar', data)
  //     createPeerConnection(data.socketId, false, data.username)
  //     socket.emit('newUserStart', {
  //       to: data.socketId,
  //       sender: socket.id,
  //       username,
  //     })
  //   })

  //   socket?.on('newUserStart', (data) => {
  //     console.log('Usuário conectado na sala', data)
  //     createPeerConnection(data.sender, true, data.username)
  //   })

  //   socket?.on('sdp', (data) => handleAnswer(data))

  //   socket?.on('ice candidates', (data) => handleIceCandidates(data))
  // }, [socket])

  // const handleIceCandidates = async (data: ICandidate) => {
  //   const peerConnection = peerConnections.current[data.sender]
  //   if (data.candidate) {
  //     await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
  //   }
  // }

  // const handleAnswer = async (data: IAnswer) => {
  //   const peerConnection = peerConnections.current[data.sender]
  //   if (data.description.type === 'offer') {
  //     await peerConnection.setRemoteDescription(data.description)

  //     const answer = await peerConnection.createAnswer()
  //     await peerConnection.setLocalDescription(answer)
  //     console.log('criando uma resposta')
  //     socket?.emit('sdp', {
  //       to: data.sender,
  //       sender: socket?.id,
  //       description: peerConnection.localDescription,
  //     })
  //   } else if (data.description.type === 'answer') {
  //     console.log('ouvindo a oferta')
  //     await peerConnection.setRemoteDescription(
  //       new RTCSessionDescription(data.description),
  //     )
  //   }
  // }

  // const createPeerConnection = async (
  //   socketId: string,
  //   createOffer: boolean,
  //   username: string,
  // ) => {
  //   const config = {
  //     iceServers: [
  //       {
  //         urls: 'stun:stun.l.google.com:19302',
  //       },
  //     ],
  //   }

  //   const peer = new RTCPeerConnection(config)
  //   peerConnections.current[socketId] = peer
  //   const peerConnection = peerConnections.current[socketId]

  //   if (videoMediaStream) {
  //     videoMediaStream.getTracks().forEach((track) => {
  //       peerConnection.addTrack(track, videoMediaStream)
  //     })
  //   } else {
  //     const video = await initRemoteCamera()
  //     video
  //       .getTracks()
  //       .forEach((track) => peerConnection.addTrack(track, video))
  //   }

  //   if (createOffer) {
  //     const peerConnection = peerConnections.current[socketId]

  //     const offer = await peerConnection.createOffer()
  //     await peerConnection.setLocalDescription(offer)
  //     console.log('criando uma oferta')
  //     socket?.emit('sdp', {
  //       to: socketId,
  //       sender: socket?.id,
  //       description: peerConnection.localDescription,
  //     })
  //   }

  //   peerConnection.ontrack = (event) => {
  //     const remoteStream = event.streams[0]

  //     const dataStream: IDataStream = {
  //       id: socketId,
  //       stream: remoteStream,
  //       username,
  //     }

  //     setRemoteStreams((prevState: IDataStream[]) => {
  //       if (!prevState.some((stream) => stream.id === socketId)) {
  //         return [...prevState, dataStream]
  //       }
  //       return prevState
  //     })
  //   }

  //   peer.onicecandidate = (event) => {
  //     if (event.candidate) {
  //       socket?.emit('ice candidates', {
  //         to: socketId,
  //         sender: socket?.id,
  //         candidate: event.candidate,
  //       })
  //     }
  //   }

  //   peerConnection.onsignalingstatechange = (event) => {
  //     switch (peerConnection.signalingState) {
  //       case 'closed':
  //         setRemoteStreams((prevState) =>
  //           prevState.filter((stream) => stream.id !== socketId),
  //         )

  //         break
  //     }
  //   }

  //   peerConnection.onconnectionstatechange = (event) => {
  //     switch (peerConnection.connectionState) {
  //       case 'disconnected':
  //         setRemoteStreams((prevState) =>
  //           prevState.filter((stream) => stream.id !== socketId),
  //         )
  //         break
  //       case 'failed':
  //         setRemoteStreams((prevState) =>
  //           prevState.filter((stream) => stream.id !== socketId),
  //         )
  //         break
  //       case 'closed':
  //         setRemoteStreams((prevState) =>
  //           prevState.filter((stream) => stream.id !== socketId),
  //         )
  //         break
  //     }
  //   }
  // }

  // const logout = () => {
  //   videoMediaStream?.getTracks().forEach((track) => {
  //     track.stop()
  //   })
  //   Object.values(peerConnections.current).forEach((peerConnection) => {
  //     peerConnection.close()
  //   })
  //   socket?.disconnect()
  //   router.push('/')
  // }

  // const initLocalCamera = async () => {
  //   const video = await navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: {
  //       echoCancellation: true,
  //       noiseSuppression: true,
  //     },
  //   })
  //   setVideoMediaStream(video)
  //   if (localStream.current) localStream.current.srcObject = video
  // }

  // const initRemoteCamera = async () => {
  //   const video = await navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: {
  //       echoCancellation: true,
  //       noiseSuppression: true,
  //     },
  //   })
  //   return video
  // }

  return (
    <>
      <section className="my-4 flex w-full items-center justify-between px-3">
        <h1 className="text-base font-bold md:text-2xl">Sala: {id}</h1>
        {isOpen ? (
          <MessageMuted
            className="hidden h-6 w-6 cursor-pointer md:flex"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <Message
            className="hidden h-6 w-6 cursor-pointer md:flex"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </section>

      <section className="relative flex w-full items-start justify-between gap-4 p-2 px-3 md:h-[70vh]">
        {remoteStreams.map((stream, index) => {
          return (
            <div
              className="relative h-full w-full rounded-md bg-gray-950 p-2 "
              key={index}
            >
              <video
                className="h-full w-full"
                autoPlay
                ref={(video) => {
                  if (video && video.srcObject !== stream.stream)
                    video.srcObject = stream.stream
                }}
              />
              <span className="absolute bottom-3">{stream.username}</span>
            </div>
          )
        })}
        {remoteStreams &&
          remoteStreams.map((stream, index) => (
            <section
              key={index}
              className="relative flex h-40 w-full max-w-80 items-center justify-center overflow-hidden rounded bg-950 p-2 md:h-60 md:w-80"
            >
              <video
                autoPlay
                playsInline
                ref={(video) => {
                  if (video && video.srcObject !== stream.stream)
                    console.log('Setting video srcObject', stream)
                  if (video) {
                    video.srcObject = stream.stream
                  }
                }}
                className="h-40 w-40 rounded bg-950"
              />
            </section>
          ))}
        <video autoPlay playsInline ref={localStream} />
        <GridCam isOpen={isOpen} localStream={localStream} />
        {isOpen && <Chat roomId={id} />}
      </section>
    </>
  )
}
