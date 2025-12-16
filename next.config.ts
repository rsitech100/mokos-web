import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'mokos.hla12.xyz',
      },
      {
        protocol: 'https',
        hostname: 'www.99.co',
      },
      {
        protocol: 'https',
        hostname: 'mokos-web.vercel.app',
      },
    ],
  },
};

export default nextConfig;
