import './globals.css';

import { Inter } from 'next/font/google';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import NavBar from '@/components/NavBar/NavBar';
import { ApolloWrapper } from '@/lib/apollo-wrapper';

const inter = Inter({ subsets: ['latin'] });

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
					<ApolloWrapper>{children} </ApolloWrapper>
					<ReactQueryDevtools buttonPosition="bottom-left" styleNonce="" />
				</QueryClientProvider>
			</body>
		</html>
	);
}
