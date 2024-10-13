/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: {
		buildActivityPosition: 'bottom-right',
		buildActivity: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.skauting.sk',
			},
		],
	},
};

export default nextConfig;
