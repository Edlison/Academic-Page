import type { AnchorHTMLAttributes } from "react";

export function MdxAnchor({ className, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href?.startsWith("http") ?? false;
  const classes = [
    className,
    "text-blue-600",
    external ? "after:content-['_↗']" : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      {...props}
      className={classes}
      href={href}
      rel={external ? "noopener noreferrer" : props.rel}
      target={external ? "_blank" : props.target}
    />
  );
}
