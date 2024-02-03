import { RefObject } from 'react'
import { useSetVideo } from './useSetVideo'

export const useInitEnhaceCamera = (
  localStream: RefObject<HTMLVideoElement>,
) => {
  const { setVideoMediaStream } = useSetVideo()

  const initLocalCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    })

    console.log(video)
    setVideoMediaStream(video)

    if (localStream.current) {
      localStream.current.srcObject = video
    }
  }

  return {
    initLocalCamera,
  }
}
