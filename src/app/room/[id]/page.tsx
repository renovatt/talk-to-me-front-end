import ScreenRoom from '@/app/_components/ScreenRoom'
import Footer from '@/app/_components/Footer'
import Header from '@/app/_components/Header'

export default function Room({ params: { id } }: { params: { id: string } }) {
  return (
    <section className="h-screen">
      <Header />
      <ScreenRoom id={id} />
      <Footer />
    </section>
  )
}

// 'use client'
// import { Chat } from '@/app/_components/Chat'
// import Footer from '@/app/_components/Footer'
// import Header from '@/app/_components/Header'
// import { SocketContext } from '@/contexts/socketContext'
// import { useRouter } from 'next/navigation'
// import { useContext, useEffect, useRef, useState } from 'react'

// interface IAnswer {
//   sender: string
//   description: RTCSessionDescriptionInit
// }
// interface ICandidate {
//   sender: string
//   candidate: RTCIceCandidate
// }
// interface IDataStream {
//   id: string
//   stream: MediaStream
//   username: string
// }
// export default function Room({ params }: { params: { id: string } }) {
//   const { socket } = useContext(SocketContext)
//   const localStream = useRef<HTMLVideoElement>(null)
//   const router = useRouter()
//   const peerConnections = useRef<Record<string, RTCPeerConnection>>({})
//   const [remoteStreams, setRemoteStreams] = useState<IDataStream[]>([])
//   const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
//     null,
//   )

//   useEffect(() => {
//     const username = sessionStorage.getItem('username')
//     socket?.on('connect', async () => {
//       console.log('conectado')
//       socket?.emit('subscribe', {
//         roomId: params.id,
//         socketId: socket.id,
//         username,
//       })
//       await initLocalCamera()
//     })

//     socket?.on('new user', (data) => {
//       console.log('Novo usuário tentando se conectar', data)
//       createPeerConnection(data.socketId, false, data.username)
//       socket.emit('newUserStart', {
//         to: data.socketId,
//         sender: socket.id,
//         username,
//       })
//     })

//     socket?.on('newUserStart', (data) => {
//       console.log('Usuário conectado na sala', data)
//       createPeerConnection(data.sender, true, data.username)
//     })
//     socket?.on('sdp', (data) => handleAnswer(data))

//     socket?.on('ice candidates', (data) => handleIceCandidates(data))
//   }, [socket])

//   const handleIceCandidates = async (data: ICandidate) => {
//     const peerConnection = peerConnections.current[data.sender]
//     if (data.candidate) {
//       await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
//       console.log('adicionando candidato')
//     }
//   }

//   const handleAnswer = async (data: IAnswer) => {
//     const peerConnection = peerConnections.current[data.sender]
//     if (data.description.type === 'offer') {
//       await peerConnection.setRemoteDescription(data.description)

//       const answer = await peerConnection.createAnswer()
//       await peerConnection.setLocalDescription(answer)
//       console.log('criando uma resposta')
//       socket?.emit('sdp', {
//         to: data.sender,
//         sender: socket?.id,
//         description: peerConnection.localDescription,
//       })
//     } else if (data.description.type === 'answer') {
//       console.log('ouvindo a oferta')
//       await peerConnection.setRemoteDescription(
//         new RTCSessionDescription(data.description),
//       )
//     }
//   }

//   const createPeerConnection = async (
//     socketId: string,
//     createOffer: boolean,
//     username: string,
//   ) => {
//     const config = {
//       iceServers: [
//         {
//           urls: 'stun:stun.l.google.com:19302',
//         },
//       ],
//     }

//     const peer = new RTCPeerConnection(config)
//     peerConnections.current[socketId] = peer
//     const peerConnection = peerConnections.current[socketId]

//     if (videoMediaStream) {
//       videoMediaStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, videoMediaStream)
//       })
//     } else {
//       const video = await initRemoteCamera()
//       video
//         .getTracks()
//         .forEach((track) => peerConnection.addTrack(track, video))
//     }

//     if (createOffer) {
//       const peerConnection = peerConnections.current[socketId]

//       const offer = await peerConnection.createOffer()
//       await peerConnection.setLocalDescription(offer)
//       console.log('criando uma oferta')
//       socket?.emit('sdp', {
//         to: socketId,
//         sender: socket?.id,
//         description: peerConnection.localDescription,
//       })
//     }

//     peerConnection.ontrack = (event) => {
//       const remoteStream = event.streams[0]

//       const dataStream: IDataStream = {
//         id: socketId,
//         stream: remoteStream,
//         username,
//       }

//       setRemoteStreams((prevState: IDataStream[]) => {
//         if (!prevState.some((stream) => stream.id === socketId)) {
//           return [...prevState, dataStream]
//         }
//         return prevState
//       })
//     }

//     peer.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket?.emit('ice candidates', {
//           to: socketId,
//           sender: socket?.id,
//           candidate: event.candidate,
//         })
//       }
//     }
//     peerConnection.onsignalingstatechange = (event) => {
//       switch (peerConnection.signalingState) {
//         case 'closed':
//           setRemoteStreams((prevState) =>
//             prevState.filter((stream) => stream.id !== socketId),
//           )

//           break
//       }
//     }
//     peerConnection.onconnectionstatechange = (event) => {
//       switch (peerConnection.connectionState) {
//         case 'disconnected':
//           setRemoteStreams((prevState) =>
//             prevState.filter((stream) => stream.id !== socketId),
//           )
//           break
//         case 'failed':
//           setRemoteStreams((prevState) =>
//             prevState.filter((stream) => stream.id !== socketId),
//           )
//           break
//         case 'closed':
//           setRemoteStreams((prevState) =>
//             prevState.filter((stream) => stream.id !== socketId),
//           )
//           break
//       }
//     }
//   }
//   const logout = () => {
//     videoMediaStream?.getTracks().forEach((track) => {
//       track.stop()
//     })
//     Object.values(peerConnections.current).forEach((peerConnection) => {
//       peerConnection.close()
//     })
//     socket?.disconnect()
//     router.push('/')
//   }

//   const initLocalCamera = async () => {
//     const video = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: {
//         echoCancellation: true,
//         noiseSuppression: true,
//       },
//     })
//     setVideoMediaStream(video)
//     if (localStream.current) localStream.current.srcObject = video
//   }
//   const initRemoteCamera = async () => {
//     const video = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: {
//         echoCancellation: true,
//         noiseSuppression: true,
//       },
//     })
//     return video
//   }

//   return (
//     <div className="h-mas screen">
//       <Header />
//       <div className="flex h-[80%] ">
//         <div className="m-3 w-full md:w-[85%] ">
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//             <div className="relative h-full w-full rounded-md bg-gray-950 p-2 ">
//               <video
//                 className="mirror-mode h-full w-full"
//                 autoPlay
//                 ref={localStream}
//               ></video>
//               <span className="absolute bottom-3">
//                 {sessionStorage.getItem('username')}
//               </span>
//             </div>
//             {remoteStreams.map((stream, index) => {
//               return (
//                 <div
//                   className="relative h-full w-full rounded-md bg-gray-950 p-2 "
//                   key={index}
//                 >
//                   <video
//                     className="h-full w-full"
//                     autoPlay
//                     ref={(video) => {
//                       if (video && video.srcObject !== stream.stream)
//                         video.srcObject = stream.stream
//                     }}
//                   />
//                   <span className="absolute bottom-3">{stream.username}</span>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//         <Chat roomId={params.id} />
//       </div>
//       <Footer />
//     </div>
//   )
// }
