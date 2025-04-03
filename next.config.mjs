/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Enable fast refresh and hot reloading
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500, // Check for changes more frequently
        aggregateTimeout: 300,
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
  // Optimize for client-side rendering
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
