import { useSetVideo } from './useSetVideo'
import { SocketContext } from '@/contexts/socketContext'
import { RefObject, useContext, useEffect, useRef, useState } from 'react'

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

export const useCreatePeerConnection = (
  id: string,
  localStream: RefObject<HTMLVideoElement>,
) => {
  const { socket } = useContext(SocketContext)
  // const { videoMediaStream, setVideoMediaStream } = useSetVideo()

  const pendingCandidates = useRef<ICandidate[]>([])
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({})
  const [remoteStreams, setRemoteStream] = useState<IDataStream[]>([])
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null,
  )

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

  useEffect(() => {
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

    const createPeerConnection = async (
      socketId: string,
      createOffer: boolean,
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
        console.log('videoMediaStream exist')
        videoMediaStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, videoMediaStream)
        })
      } else {
        console.log('initRemoteCamera')
        const video = await initRemoteCamera()

        video.getTracks().forEach((track) => {
          peerConnection.addTrack(track, video)
        })
      }

      if (createOffer) {
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)

        console.log('sending offer', offer)

        socket?.emit('sdp', {
          to: socketId,
          sender: socket?.id,
          description: peerConnection.localDescription,
        })
      }

      peerConnection.ontrack = (event) => {
        console.log('Received remote stream', event.streams[0])
        const remoteStream = event.streams[0]
        const newRemoteStream: IDataStream = {
          stream: remoteStream,
          username: '',
          id: '',
        }
        setRemoteStream([...remoteStreams, newRemoteStream])
      }

      peer.onicecandidate = (event) => {
        if (event.candidate) {
          socket?.emit('ice-candidates', {
            to: socketId,
            candidate: event.candidate,
            sender: socket?.id,
          })
        }
      }
    }

    const handleIceCandidate = async (data: ICandidate) => {
      const peerConnection = peerConnections.current[data.sender]

      if (!peerConnection) {
        console.log(`Can't add ICE candidate. Peer connection not found.`)
        return
      }

      // ele ta entrando aqui
      if (!peerConnection.remoteDescription) {
        console.log(
          `Can't add ICE candidate. The remote description is null. Storing the candidate to add later.`,
        )
        pendingCandidates.current.push(data)
        return
      }

      if (data.candidate) {
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate),
        )
      }
    }

    const handleAwser = async (data: IAnswer) => {
      const peerConnection = peerConnections.current[data.sender]

      // ele ta entrando aqui
      if (peerConnection.signalingState !== 'have-local-offer') {
        console.log(
          `Can't set remote description. Current connection state is ${peerConnection.signalingState}`,
        )
        return
      }

      if (data.description.type === 'offer') {
        await peerConnection.setRemoteDescription(data.description)
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)

        console.log('creating answer', answer)

        socket?.emit('sdp', {
          to: data.sender,
          sender: socket?.id,
          description: peerConnection.localDescription,
        })
      } else if (data.description.type === 'answer') {
        console.log('ouvindo a oferta')
        await peerConnection.setRemoteDescription(data.description)
      }

      for (const candidate of pendingCandidates.current) {
        if (candidate.sender === data.sender && candidate.candidate) {
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(candidate.candidate),
          )
        }
      }

      pendingCandidates.current = pendingCandidates.current.filter(
        (candidate) => candidate.sender !== data.sender,
      )
    }

    socket?.on('connect', async () => {
      console.log('connected')
      socket?.emit('subscribe', {
        roomId: id,
        socketId: socket.id,
      })
      await initLocalCamera()
    })

    socket?.on('new-user', (data) => {
      console.log('new user tryning to connect: ', data)
      createPeerConnection(data.socketId, false)
      socket.emit('newUserStart', {
        to: data.socketId,
        sender: socket.id,
      })
    })

    socket?.on('newUserStart', (data) => {
      console.log('new user connected in room: ', data)
      createPeerConnection(data.sender, true)
    })

    socket?.on('sdp', (data) => {
      console.log('spf offer', data)
      handleAwser(data)
    })

    socket?.on('ice-candidates', (data) => {
      console.log('ice-candidates', data)
      handleIceCandidate(data)
    })
  }, [
    id,
    socket,
    setVideoMediaStream,
    localStream,
    videoMediaStream,
    remoteStreams,
  ])
  return {
    remoteStreams,
  }
}
