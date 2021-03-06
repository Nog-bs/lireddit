import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [logout, { loading: logoutFetching }] = useLogoutMutation();
    const { data, loading } = useMeQuery({
        skip: isServer(),
    });
    const apolloClient = useApolloClient();
    let body = null;

    // data is loading
    if (loading) {
    }

    // user not logged in
    else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color="white" mr="2">
                        Login
                    </Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color="white" mr="2">
                        Register
                    </Link>
                </NextLink>
            </>
        );
    }

    // user logged in
    else {
        body = (
            <Flex align="center">
                <NextLink href="/create-post">
                    <Button colorScheme="teal" as={Link} mr={4}>
                        <Link mr={2}>create post </Link>
                    </Button>
                </NextLink>
                <Box mr="2">{data.me.username}</Box>
                <Button
                    isLoading={logoutFetching}
                    onClick={async () => {
                        await logout();
                        apolloClient.resetStore();
                    }}
                    variant="link"
                >
                    logout
                </Button>
            </Flex>
        );
    }

    return (
        <Flex
            position="sticky"
            top="0"
            zIndex={1}
            bg="tan"
            p={4}
            align="center"
        >
            <Flex flex={1} m="auto" align="center" maxW={800}>
                <NextLink href="/">
                    <Link>
                        <Heading>LiReddit</Heading>
                    </Link>
                </NextLink>
                <Box ml="auto">{body}</Box>
            </Flex>
        </Flex>
    );
};
