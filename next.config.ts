import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    externalDir: true, // Giảm theo dõi file không cần thiết
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kiwncwjmonveleywaapt.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
