import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // There is an unrelated package-lock.json in the user's home directory, so
  // Next infers the wrong workspace root. Pin it to this project.
  outputFileTracingRoot: here,

  // Static export: the whole site builds to /out as plain files, deployable to
  // Netlify, Vercel, Cloudflare Pages, or any cPanel/Apache host.
  output: 'export',
  trailingSlash: true,
  images: {
    // Static export has no server to run the image optimiser on.
    // Real slab photography should be exported pre-sized as WebP/AVIF.
    unoptimized: true,
  },
}

export default nextConfig
