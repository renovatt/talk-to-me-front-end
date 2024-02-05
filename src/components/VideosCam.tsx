export default function VideosCam({
  remoteStreams,
}: {
  remoteStreams: { stream: MediaStream; username: string }[]
}) {
  return (
    <>
      {remoteStreams &&
        remoteStreams.map((stream, index) => (
          <section
            key={index}
            className="relative flex h-40 w-full max-w-80 items-center justify-center overflow-hidden rounded bg-950 p-2 md:h-60 md:w-80"
          >
            <video
              autoPlay
              playsInline
              ref={(video) => {
                if (video && video.srcObject !== stream.stream)
                  video.srcObject = stream.stream
              }}
              className="rounded"
            />
          </section>
        ))}
    </>
  )
}
