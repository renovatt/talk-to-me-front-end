import { MutableRefObject } from 'react'

export interface IAnswer {
  sender: string
  description: RTCSessionDescriptionInit
}

export interface ICandidate {
  sender: string
  candidate: RTCIceCandidate
}

export interface IDataStream {
  id: string
  stream: MediaStream
  username: string
}

export type FooterProps = {
  videoMediaStream: MediaStream
  peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>
  localStream: MutableRefObject<HTMLVideoElement | null>
}
