import type { HTMLAttributes } from "react";

export function MdxLi(props: HTMLAttributes<HTMLLIElement>) {
  return <li {...props} className="mb-1" />;
}

export function MdxOl(props: HTMLAttributes<HTMLOListElement>) {
  return <ol {...props} className="list-decimal ml-6" />;
}

export function MdxUl(props: HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} className="list-disc ml-6" />;
}
