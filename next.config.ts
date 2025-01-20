import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  exportPathMap(defaultMap, ctx) {
    return {
      "/": { page: "/" },
      "/home": { page: "/home" },
      "/register": { page: "/register" },
    };
  },
};

export default nextConfig;
