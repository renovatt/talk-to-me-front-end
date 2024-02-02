import { RefObject } from 'react'

export const useInitEnhaceCamera = (
  localStream: RefObject<HTMLVideoElement>,
) => {
  const initEnhancedCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    })

    if (localStream.current) {
      localStream.current.srcObject = video
    }
  }

  return {
    initEnhancedCamera,
  }
}
