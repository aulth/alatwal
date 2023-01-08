/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    email:process.env.email,
    key:process.env.key,
    mongodburl:process.env.mongodburl
  }
}

module.exports = nextConfig
