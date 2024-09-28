/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "premps.nyc3.digitaloceanspaces.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ghoxqfpkn3geni5a.public.blob.vercel-storage.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
