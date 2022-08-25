/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', "localhost", "encrypted-tbn0.gstatic.com", "avatars.githubusercontent.com", "res.cloudinary.com"],
  },
}

module.exports = nextConfig
