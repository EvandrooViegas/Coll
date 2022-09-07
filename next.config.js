/** @type {import('next').NextConfig} */


module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*'
      }


    ]
  },

  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', "localhost", "encrypted-tbn0.gstatic.com", "avatars.githubusercontent.com", "res.cloudinary.com", "cdn.sstatic.net", "http", "https"],
  
  },
  
}
