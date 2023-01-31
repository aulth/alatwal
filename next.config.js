/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    email:process.env.email,
    key:process.env.key,
    mongodburl:process.env.mongodburl,
    adminpin:process.env.adminpin
  }
}

module.exports = nextConfig
