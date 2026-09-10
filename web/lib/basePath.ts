/* GitHub Pages serves a project site from a sub-path (/JAMODI), so every URL
   the browser resolves has to carry that prefix.
   ---------------------------------------------------------------------------
   Next rewrites `basePath` into `next/image` sources and `next/link` hrefs on
   its own. It does NOT rewrite raw element attributes — a <source src="/…">, a
   poster, or anything handed to a metadata field. Those go through `asset()`.

   Locally and on the real production domain NEXT_PUBLIC_BASE_PATH is unset, so
   this collapses to the empty string and every path is unchanged. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
