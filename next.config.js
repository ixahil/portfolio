/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    output: "export",
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
