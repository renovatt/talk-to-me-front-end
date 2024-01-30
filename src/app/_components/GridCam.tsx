import VideoCam from '../../components/VideoCam'

export default function GridCam({ isOpen }: { isOpen: boolean }) {
  return (
    <article className={`flex flex-wrap mb-32 md:mb-0 w-full items-center justify-around md:gap-4 gap-2 overflow-y-auto scrollbar-hide h-full ${isOpen ? "md:w-3/4" : "md:w-full"}`}>
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
