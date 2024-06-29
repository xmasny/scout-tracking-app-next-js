'use client';

import './globals.css';

import { Inter } from 'next/font/google';

import NavBar from '@/components/NavBar/NavBar';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });

const client = new ApolloClient({
  /*   link: new HttpLink({ */
  uri: 'http://localhost:3001/graphql',
  //uri: 'https://scout-tracking-app-graphql.herokuapp.com/graphql',
  /*   }), */
  cache: new InMemoryCache(),
});

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <NavBar />
      <body className={inter.className}>
        <ApolloProvider client={client}>{children} </ApolloProvider>
      </body>
    </>
  );
}

/*       <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider> */
