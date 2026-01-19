import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
};

const hostnames = ["images.unsplash.com", "unsplash.com"];

nextConfig.images = {
  remotePatterns: hostnames.map(hostname => ({
    protocol: "https",
    hostname: hostname,
  })),
};


export default nextConfig;
