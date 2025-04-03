/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Enable fast refresh and hot reloading
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 800, // Check for changes every 800ms
        aggregateTimeout: 300, // Delay the rebuild for 300ms
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      };
    }
    return config;
  },
  // Ensure proper async handling
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
}

export default nextConfig;
