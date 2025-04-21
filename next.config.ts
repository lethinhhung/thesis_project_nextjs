import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    externalDir: true, // Giảm theo dõi file không cần thiết
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
