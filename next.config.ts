import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/finished-formulations",
        destination: "/formulations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
