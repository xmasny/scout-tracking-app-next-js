import { Inter } from 'next/font/google';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import NavBar from '@/components/NavBar/NavBar';
import { ApolloWrapper } from '@/lib/apollo-wrapper';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme();
// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: Infinity,
			staleTime: Infinity,
			retry: true,
			networkMode: 'offlineFirst',
		},
	},
});

interface Props {
	readonly children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="sk">
			<head>
				<title>React App</title>
				<meta name="description" content="Web site created..." />
			</head>
			<body className={inter.className}>
				<ThemeProvider theme={theme}>
					<NavBar />
					<QueryClientProvider client={queryClient}>
						<ApolloWrapper>{children} </ApolloWrapper>
						<ReactQueryDevtools buttonPosition="bottom-left" styleNonce="" />
					</QueryClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
