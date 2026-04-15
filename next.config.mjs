/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ozonatedel.co.za"
      },
      {
        protocol: "https",
        hostname: "www.ozonatedel.co.za"
      }
    ]
  }
};

export default nextConfig;
