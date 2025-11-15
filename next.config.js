/** @type {import('next').NextConfig} */
const nextConfig = {
   productionBrowserSourceMaps: false,
  images: {
    domains: [
      'flagcdn.com',
      'upload.wikimedia.org' 
    ],
  },
};

module.exports = nextConfig;
