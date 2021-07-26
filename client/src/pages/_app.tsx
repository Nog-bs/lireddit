import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import theme from "../theme";
import { createUrqlClient } from "../utils/createUrqlClient";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PaginatedPosts } from "../generated/graphql";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    posts: {
                        keyArgs: ["limit"],
                        merge(
                            existing: PaginatedPosts | undefined,
                            incoming: PaginatedPosts
                        ): PaginatedPosts {
                            console.log(existing, incoming);
                            return {
                                ...incoming,
                                posts: [
                                    ...(existing?.posts || []),
                                    ...incoming.posts,
                                ],
                            };
                        },
                    },
                },
            },
        },
    }),
});

function MyApp({ Component, pageProps }: any) {
    return (
        <ApolloProvider client={client}>
            <ChakraProvider resetCSS theme={theme}>
                <ColorModeProvider
                    options={{
                        useSystemColorMode: true,
                    }}
                >
                    <Component {...pageProps} />
                </ColorModeProvider>
            </ChakraProvider>
        </ApolloProvider>
    );
}

export default withUrqlClient(createUrqlClient)(MyApp);
