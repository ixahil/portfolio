/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    output: "export",
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
