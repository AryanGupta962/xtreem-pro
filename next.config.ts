import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // M4: Optimize package imports for libraries with many submodules
  // This enables tree-shaking for icon libraries that use barrel exports
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

export default nextConfig;
