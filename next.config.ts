import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: "/:any*",
        destination: "/",
        eslint: {
          ignoreDuringBuilds: true,
        }
      },
    ];
  },
};

export default nextConfig;
