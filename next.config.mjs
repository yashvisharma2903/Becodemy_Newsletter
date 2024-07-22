/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.beehiiv.com",
      },
      {
        hostname: "s.gravatar.com",
      },
      {
        hostname:"lh3.googleusercontent.com",
      },
    ],
  },
};

  export default nextConfig;