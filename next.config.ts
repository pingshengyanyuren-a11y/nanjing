import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 优化图片加载
  images: {
    // 允许外部图片域名（如使用 CDN）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 本地图片不优化（避免 Vercel 函数超时）
    unoptimized: false,
  },

  // 严格模式
  reactStrictMode: true,

  // 生产构建优化
  poweredByHeader: false,

  // 输出配置（standalone 模式便于容器化部署）
  output: 'standalone',
};

export default nextConfig;
