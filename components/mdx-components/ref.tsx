import type { ReactNode } from "react";

type RefProps = {
  href: string;
  children: ReactNode;
};

export function Ref({ href, children }: RefProps) {
  return (
    <span className="link-invert">
      <a
        className="font-normal underline underline-offset-4 decoration-1 whitespace-nowrap"
        href={href}
      >
        {children}
      </a>
    </span>
  );
}
