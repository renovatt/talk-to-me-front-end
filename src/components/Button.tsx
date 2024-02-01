interface IButton {
  title: string
  type: 'button' | 'submit' | 'reset'
}

export default function Button({ title, type }: IButton) {
  return (
    <button
      type={type}
      className="w-full rounded-md bg-700 p-2 font-bold text-800 hover:opacity-90"
    >
      {title}
    </button>
  )
}
