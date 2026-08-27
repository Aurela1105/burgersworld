/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/burgersworld',
  assetPrefix: '/burgersworld/',
  
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
}

export default nextConfig