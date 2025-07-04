"use client"

import { useFormStatus } from "react-dom";
interface Props {
  name: string;
  className?: string;
}

export function Button({ name, className = "" }: Props){

  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-cyan-600 text-white py-3 rounded-sm hover:bg-cyan-700 duration-300 flex items-center font-medium justify-center ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        name
      )}
    </button>
  );
}