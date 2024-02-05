import VideoCam from '../../components/VideoCam'
import VideosCam from '@/components/VideosCam'

export default function GridCam({
  isOpen,
  localStream,
  remoteStreams,
}: {
  isOpen: boolean
  localStream: React.RefObject<HTMLVideoElement>
  remoteStreams: { stream: MediaStream; username: string }[]
}) {
  return (
    <article
      className={`mb-32 flex h-full w-full flex-wrap items-center justify-around gap-2 overflow-y-auto scrollbar-hide md:mb-0 md:gap-4 ${isOpen ? 'md:w-3/4' : 'md:w-full'}`}
    >
      <VideoCam localStream={localStream} />
      {remoteStreams && <VideosCam remoteStreams={remoteStreams} />}
    </article>
  )
}
