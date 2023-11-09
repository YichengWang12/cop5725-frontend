/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports:{
        "@mui/icons-material":{
            transform: "@mui/icons-material/{member}",
        },
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/login',
            },
            // 其他的重写规则...
        ];

        },
}

module.exports = nextConfig
