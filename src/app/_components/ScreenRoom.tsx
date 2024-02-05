'use client'
import Footer from './Footer'
import Header from './Header'
import { Chat } from '@/app/_components/Chat'
import { Message, MessageMuted } from '@/Icons'
import GridCam from '@/app/_components/GridCam'
import { SocketContext } from '@/contexts/socketContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { IAnswer, ICandidate, IDataStream } from '@/interfaces/media'
import RoomTitleId from '@/components/RoomTitleId'

export default function ScreenRoom({ roomId }: { roomId: string }) {
  const localStream = useRef<HTMLVideoElement>(null)
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({})

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [remoteStreams, setRemoteStreams] = useState<IDataStream[]>([])
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null,
  )

  const { socket } = useContext(SocketContext)

  useEffect(() => {
    const username = sessionStorage.getItem('username')
    socket?.on('connect', async () => {
      console.log('connected to server')
      socket?.emit('subscribe', {
        roomId,
        socketId: socket.id,
        username,
      })
      await initLocalCamera()
    })

    socket?.on('new-user', (data) => {
      console.log('New user to trying to connect..', data)
      createPeerConnection(data.socketId, false, data.username)
      socket.emit('newUserStart', {
        to: data.socketId,
        sender: socket.id,
        username,
      })
    })

    socket?.on('newUserStart', (data) => {
      console.log('User logged in to the room', data)
      createPeerConnection(data.sender, true, data.username)
    })

    socket?.on('sdp', (data) => handleAnswer(data))

    socket?.on('ice-candidates', (data) => handleIceCandidates(data))
  }, [socket])

  const handleIceCandidates = async (data: ICandidate) => {
    const peerConnection = peerConnections.current[data.sender]

    if (data.candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
    }
  }

  const handleAnswer = async (data: IAnswer) => {
    const peerConnection = peerConnections.current[data.sender]

    if (data.description.type === 'offer') {
      await peerConnection.setRemoteDescription(data.description)

      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)
      console.log('creating a response')
      socket?.emit('sdp', {
        to: data.sender,
        sender: socket?.id,
        description: peerConnection.localDescription,
      })
    } else if (data.description.type === 'answer') {
      console.log('listening to the offer')
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.description),
      )
    }
  }

  const createPeerConnection = async (
    socketId: string,
    createOffer: boolean,
    username: string,
  ) => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }

    const peer = new RTCPeerConnection(config)
    peerConnections.current[socketId] = peer

    const peerConnection = peerConnections.current[socketId]

    if (videoMediaStream) {
      videoMediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, videoMediaStream)
      })
    } else {
      const video = await initRemoteCamera()
      video
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, video))
    }

    if (createOffer) {
      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)
      console.log('creating an offer')
      socket?.emit('sdp', {
        to: socketId,
        sender: socket?.id,
        description: peerConnection.localDescription,
      })
    }

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0]

      const dataStream: IDataStream = {
        id: socketId,
        stream: remoteStream,
        username,
      }

      setRemoteStreams((prevState: IDataStream[]) => {
        if (!prevState.some((stream) => stream.id === socketId)) {
          return [...prevState, dataStream]
        }
        return prevState
      })
    }

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit('ice-candidates', {
          to: socketId,
          sender: socket?.id,
          candidate: event.candidate,
        })
      }
    }

    peerConnection.onsignalingstatechange = () => {
      switch (peerConnection.signalingState) {
        case 'closed':
          setRemoteStreams((prevState) =>
            prevState.filter((stream) => stream.id !== socketId),
          )
          break
      }
    }

    peerConnection.onconnectionstatechange = () => {
      switch (peerConnection.connectionState) {
        case 'disconnected':
          setRemoteStreams((prevState) =>
            prevState.filter((stream) => stream.id !== socketId),
          )
          break
        case 'failed':
          setRemoteStreams((prevState) =>
            prevState.filter((stream) => stream.id !== socketId),
          )
          break
        case 'closed':
          setRemoteStreams((prevState) =>
            prevState.filter((stream) => stream.id !== socketId),
          )
          break
      }
    }
  }

  const initLocalCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    })
    setVideoMediaStream(video)
    if (localStream.current) localStream.current.srcObject = video
  }

  const initRemoteCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    })
    return video
  }

  return (
    <>
      <Header />
      <section className="my-4 flex w-full items-center justify-between px-3">
        <RoomTitleId roomId={roomId} />
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
        <video autoPlay playsInline ref={localStream} className="hidden" />
        <GridCam
          isOpen={isOpen}
          localStream={localStream}
          remoteStreams={remoteStreams}
        />
        {isOpen && <Chat roomId={roomId} />}
      </section>
      <Footer
        videoMediaStream={videoMediaStream!}
        peerConnections={peerConnections}
        localStream={localStream}
      />
    </>
  )
}
