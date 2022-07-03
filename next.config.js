/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // In React18 strict mode makes useEffect run twice in dev mode
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
};

module.exports = nextConfig;
