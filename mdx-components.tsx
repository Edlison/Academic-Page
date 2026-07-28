import type { MDXComponents } from "mdx/types";

import { MdxAnchor } from "@/components/mdx-components/a";
import { MdxBlockquote } from "@/components/mdx-components/blockquote";
import {
  MdxH1,
  MdxH2,
  MdxH3,
  MdxH4,
  MdxH5,
  MdxH6,
} from "@/components/mdx-components/headings";
import { MdxImage } from "@/components/mdx-components/image";
import { MdxInput } from "@/components/mdx-components/input";
import { MdxLi, MdxOl, MdxUl } from "@/components/mdx-components/lists";
import { Ref } from "@/components/mdx-components/ref";
import { Pub } from "@/components/pub";

const mdxComponents: MDXComponents = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  h6: MdxH6,
  a: MdxAnchor,
  blockquote: MdxBlockquote,
  img: MdxImage,
  input: MdxInput,
  li: MdxLi,
  ol: MdxOl,
  ul: MdxUl,
  Pub,
  Ref,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
