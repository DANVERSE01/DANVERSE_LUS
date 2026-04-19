import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable for Three.js stability in dev
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['motion'],
};

export default nextConfig;
