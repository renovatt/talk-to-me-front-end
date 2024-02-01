import VideoCam from '../../components/VideoCam'

export default function GridCam({
  isOpen,
  localStream,
}: {
  isOpen: boolean
  localStream: React.RefObject<HTMLVideoElement>
}) {
  return (
    <article
      className={`mb-32 flex h-full w-full flex-wrap items-center justify-around gap-2 overflow-y-auto scrollbar-hide md:mb-0 md:gap-4 ${isOpen ? 'md:w-3/4' : 'md:w-full'}`}
    >
      <VideoCam localStream={localStream} />
    </article>
  )
}
