import type { HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export function MdxH1(props: HeadingProps) {
  return <h1 {...props} className="text-4xl font-bold my-2" />;
}

export function MdxH2(props: HeadingProps) {
  return <h2 {...props} className="text-2xl font-bold my-2" />;
}

export function MdxH3(props: HeadingProps) {
  return <h3 {...props} className="text-xl font-bold my-2" />;
}

export function MdxH4(props: HeadingProps) {
  return <h4 {...props} className="text-base font-bold my-2" />;
}

export function MdxH5(props: HeadingProps) {
  return <h5 {...props} className="text-sm font-bold my-2" />;
}

export function MdxH6(props: HeadingProps) {
  return <h6 {...props} className="text-xs font-bold my-2" />;
}
