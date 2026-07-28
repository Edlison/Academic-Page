import type { HTMLAttributes } from "react";

export function MdxBlockquote(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="p-4 border rounded-lg border-zinc-100 text-sm"
    />
  );
}
