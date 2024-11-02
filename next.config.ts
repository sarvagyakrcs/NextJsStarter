/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {"hostname": "picsum.photos"},
          {"hostname" : "i.ytimg.com"},
          {"hostname" : "yt3.ggpht.com"}
      ],
  }
};

export default nextConfig;