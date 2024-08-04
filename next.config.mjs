/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghoxqfpkn3geni5a.public.blob.vercel-storage.com',
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;
