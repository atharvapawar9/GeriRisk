import type { NextConfig } from "next";
import path from "path";

const projectRoot = path.resolve(import.meta.dirname ?? __dirname);

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
