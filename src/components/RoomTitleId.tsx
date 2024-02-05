export default function RoomTitleId({ roomId }: { roomId: string }) {
  return (
    <section className="flex items-center justify-center gap-2">
      <h1 className="pl-5 text-base font-bold">ID da sala:</h1>
      <span className="text-base text-700">{roomId}</span>
    </section>
  )
}
