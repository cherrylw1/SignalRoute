/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    browsersListForSwc: true,
  },
  async redirects() {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
