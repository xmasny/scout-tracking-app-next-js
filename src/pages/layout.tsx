'use client';

import "./globals.css";

import { Inter } from "next/font/google";
import Head from "next/head";

import NavBar from "@/components/NavBar/NavBar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { QueryClient } from "@tanstack/react-query";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Head>
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </Head>
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
