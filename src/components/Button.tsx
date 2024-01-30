interface IButton {
  title: string;
}

export default function Button({ title }: IButton) {
  return (
    <button className="bg-700 text-800 font-bold p-2 w-full rounded-md hover:opacity-90">{title}</button>
  )
}