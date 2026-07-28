// MDX Components
import Pub from "./pub.astro";
import Ref from "./mdx/ref.astro";
import A from "./mdx/a.astro";
import Blockquote from "./mdx/blockquote.astro";
import H1 from "./mdx/h1.astro";
import H2 from "./mdx/h2.astro";
import H3 from "./mdx/h3.astro";
import H4 from "./mdx/h4.astro";
import H5 from "./mdx/h5.astro";
import H6 from "./mdx/h6.astro";
import Img from "./mdx/img.astro";
import Input from "./mdx/input.astro";
import Li from "./mdx/li.astro";
import Ol from "./mdx/ol.astro";
import Ul from "./mdx/ul.astro";

export const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: A,
  blockquote: Blockquote,
  img: Img,
  ul: Ul,
  ol: Ol,
  li: Li,
  input: Input,
  // Custom Components
  Pub,
  Ref,
};
