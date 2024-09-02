'use client';

import './globals.css';

import { Inter } from 'next/font/google';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient } from '@tanstack/react-query';

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
