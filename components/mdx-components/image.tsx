import type { ImgHTMLAttributes } from "react";

export function MdxImage({ alt = "", src }: ImgHTMLAttributes<HTMLImageElement>) {
  const imageSource = typeof src === "string" ? `${src}?w=1024&q=70` : "";

  return (
    <div className="flex flex-col gap-2 text-center">
      {/* MDX images may use arbitrary remote URLs, so the native element is intentional. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        className="w-full rounded-lg overflow-clip"
        src={imageSource}
      />
      <span className="text-gray-400 font-normal text-sm">{alt}</span>
    </div>
  );
}
