import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me']
  },
  serverExternalPackages: ['@zilliz/milvus2-sdk-node'],

};

export default nextConfig;
