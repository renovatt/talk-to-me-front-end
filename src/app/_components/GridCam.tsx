import VideoCam from '../../components/VideoCam'

export default function GridCam({ isOpen }: { isOpen: boolean }) {
  return (
    <article
      className={`mb-32 flex h-full w-full flex-wrap items-center justify-around gap-2 overflow-y-auto scrollbar-hide md:mb-0 md:gap-4 ${isOpen ? 'md:w-3/4' : 'md:w-full'}`}
    >
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
      <VideoCam />
    </article>
  )
}
