export default function randomColor() {
  const colors = [
    'text-blue-400',
    'text-red-400',
    'text-yellow-400',
    'text-green-400',
    'text-pink-400',
    'text-purple-400',
    'text-indigo-400',
    'text-cyan-400',
    'text-rose-400',
    'text-emerald-400',
    'text-violet-400',
    'text-amber-400',
    'text-lime-400',
    'text-sky-400',
    'text-fuchsia-400',
    'text-rose-400',
    'text-cyan-400',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
