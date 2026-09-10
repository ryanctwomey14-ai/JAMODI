import NextImage, { type ImageProps } from "next/image";
import { asset } from "@/lib/basePath";

/* next/image with basePath applied to the source.
   ---------------------------------------------------------------------------
   Next rewrites `basePath` into the URLs the image optimizer serves, but a
   static export runs with `unoptimized: true` and emits the `src` verbatim —
   so on the GitHub Pages review site every /public asset 404s unless the
   prefix is added here. Verified against the exported HTML, not assumed.

   Only string sources are rewritten. A statically imported image is already a
   resolved build URL and must be passed through untouched. */
export function Img({ src, ...rest }: ImageProps) {
  return <NextImage src={typeof src === "string" ? asset(src) : src} {...rest} />;
}
