import { ForwardRefRenderFunction, forwardRef } from 'react'

interface InputBase {
  placeholder: string
  type: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputBase> = (
  { placeholder, type, ...rest },
  ref,
) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        placeholder={placeholder}
        type={type}
        {...rest}
        className="w-full rounded-md border-none bg-950 px-3 py-2 outline-none"
      />
    </div>
  )
}
export const Input = forwardRef(InputBase)
