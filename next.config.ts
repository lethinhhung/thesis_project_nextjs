import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    externalDir: true, // Giảm theo dõi file không cần thiết
  },
};

export default nextConfig;
