import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  env: {
    BUILD_TIME: new Date().toLocaleString(),
  },
  async rewrites() {
    return [
      {
        source: '/member/:path*', // 匹配所有 /api/ 开头的请求
        destination: 'https://agent-official-h5.7f5h2k9l.com/member/:path*', // 代理到目标服务器
      },
    ]
  },
  sassOptions: {
    // prependData: `@use "variables.scss" as *;`,
  },
  images: {
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '12qinfo.com',
      },
    ],
  },
}

export default nextConfig
