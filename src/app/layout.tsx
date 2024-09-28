'use client';

import './globals.css';

import { Inter } from 'next/font/google';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import NavBar from '@/components/NavBar/NavBar';

const inter = Inter({ subsets: ['latin'] });

const client = new ApolloClient({
	/*   link: new HttpLink({ */
	uri: 'http://localhost:3000/api/graphql',
	//uri: 'https://scout-tracking-app-graphql.herokuapp.com/graphql',
	/*   }), */
	cache: new InMemoryCache(),
});

// Create a client
const queryClient = new QueryClient();

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