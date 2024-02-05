import { useSetVideo } from './useSetVideo'
import { SocketContext } from '@/contexts/socketContext'
import { initRemoteCamera } from '@/utils/initRemoteCamera'
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

export const useCreatePeerConnection = () => {
  const { socket } = useContext(SocketContext)
  const { videoMediaStream } = useSetVideo()

  const peerConnections = useRef<Record<string, RTCPeerConnection>>({})
  const [remoteStreams, setRemoteStreams] = useState<IDataStream[]>([])

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
          candidate: event.candidate,
          sender: socket?.id,
        })
      }
    }
  }

  const handleIceCandidate = async (data: ICandidate) => {
    const peerConnection = peerConnections.current[data.sender]

    if (data.candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
    }
  }

  const handleSDPResponse = async (data: IAnswer) => {
    const peerConnection = peerConnections.current[data.sender]

    if (data.description.type === 'offer') {
      await peerConnection.setRemoteDescription(data.description)
      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)

      console.log('creating answer..')

      socket?.emit('sdp', {
        to: data.sender,
        sender: socket?.id,
        description: peerConnection.localDescription,
      })
    } else if (data.description.type === 'answer') {
      console.log('listening to the offer..')
      await peerConnection.setRemoteDescription(data.description)
    }
  }

  useEffect(() => {
    const username = sessionStorage.getItem('@chat-username') as string

    socket?.on('new-user', (data) => {
      console.log('new user tryning to connect')
      createPeerConnection(data.socketId, false, data.username)

      socket.emit('newUserStart', {
        to: data.socketId,
        sender: socket.id,
        username,
      })
    })

    socket?.on('newUserStart', (data) => {
      console.log('new user connected in room')
      createPeerConnection(data.sender, true, data.username)
    })

    socket?.on('sdp', (data) => {
      console.log('spf offer', data)
      handleSDPResponse(data)
    })

    socket?.on('ice-candidates', (data) => {
      console.log('ice-candidates')
      handleIceCandidate(data)
    })
  }, [socket])

  return {
    remoteStreams,
  }
}
