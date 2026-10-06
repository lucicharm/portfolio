import type { NextConfig } from "next";

const basePath = "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  // next/image doesn't prefix basePath, so ProjectImage reads it from here.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
