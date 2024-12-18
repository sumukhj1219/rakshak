/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
        {
            hostname: "images.unsplash.com",
            protocol: "https",
            port: "", 
            pathname: "/**"
        },
        {
            hostname: "assets.aceternity.com",
            protocol: "https",
            port: "", 
            pathname: "/**"
        }
        ]
    }
};

export default nextConfig;
