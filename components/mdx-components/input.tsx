import type { InputHTMLAttributes } from "react";

export function MdxInput({ checked, type, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      checked={checked}
      className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300"
      readOnly={checked !== undefined ? true : props.readOnly}
      type={type}
    />
  );
}
