'use client';

import './globals.css';

import { Inter } from 'next/font/google';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import NavBar from '@/components/NavBar/NavBar';

const inter = Inter({ subsets: ['latin'] });

/* const url = process.env.NEXT_PUBLIC_VERCEL_URL

console.log('layout', url); */

const client = new ApolloClient({
	uri: `https://scout-tracking-app-next-js.vercel.app/api/graphql`,
	cache: new InMemoryCache(),
	devtools: {
		enabled: true,
	}
});

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: Infinity,
			staleTime: Infinity,
			retry: true,
			networkMode: 'offlineFirst'
		}
	}
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="sk">
			<head>
				<title>React App</title>
				<meta name="description" content="Web site created..." />
			</head>
			<body className={inter.className}>
				<NavBar />
				<QueryClientProvider client={queryClient}>
					<ApolloProvider client={client}>{children} </ApolloProvider>
					<ReactQueryDevtools buttonPosition="bottom-left" styleNonce="" />
				</QueryClientProvider>
			</body>
		</html>
	);
}
