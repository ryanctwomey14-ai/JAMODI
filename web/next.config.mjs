/* Two build targets from one source.
   ---------------------------------------------------------------------------
   Default: a normal Next server build — image optimization on, no path prefix.
   That is what `npm run dev` and the eventual production deploy use.

   GITHUB_PAGES=true: a fully static export for the client-review site on
   GitHub Pages. Pages is a dumb file server, so there is no image optimizer
   (`unoptimized`) and no server to resolve extensionless routes
   (`trailingSlash` makes every route a directory with its own index.html).
   Every route in this site already prerenders as static, so nothing is lost. */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: isPages ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  ...(isPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
      }
    : {}),
};

export default nextConfig;
