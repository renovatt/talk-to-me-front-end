import { useEffect, useState } from 'react'

export const useSetVideo = () => {
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null,
  )

  useEffect(() => {
    console.log('videoMediaStream updated', videoMediaStream)
  }, [videoMediaStream])

  return {
    setVideoMediaStream,
    videoMediaStream,
  }
}
