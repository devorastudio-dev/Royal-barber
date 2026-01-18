import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const hostname = "images.unsplash.com";

nextConfig.images = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: hostname,
    },
  ],
};

export default nextConfig;
