import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/trpc-contract"],
};

export default nextConfig;
