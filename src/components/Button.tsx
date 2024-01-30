interface IButton {
  title: string
}

export default function Button({ title }: IButton) {
  return (
    <button className="w-full rounded-md bg-700 p-2 font-bold text-800 hover:opacity-90">
      {title}
    </button>
  )
}
