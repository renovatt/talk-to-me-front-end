import { ForwardRefRenderFunction, forwardRef } from 'react';

interface InputBase {
  placeholder: string;
  type: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputBase> = ({ placeholder, type, ...rest }, ref) => {
  return (
    <div className='w-full'>
      <input
        ref={ref}
        placeholder={placeholder}
        type={type}
        {...rest}
        className="px-3 py-2 rounded-md bg-950 border-none w-full outline-none"
      />
    </div>
  );
};
export const Input = forwardRef(InputBase);