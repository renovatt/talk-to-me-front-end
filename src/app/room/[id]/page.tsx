import ScreenRoom from '@/app/_components/ScreenRoom'

export default function Room({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="h-mas screen">
      <ScreenRoom roomId={id} />
    </div>
  )
}
