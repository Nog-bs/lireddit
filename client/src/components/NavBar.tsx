import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    let body = null;

    // data is loading
    if (fetching) {
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
            <Flex>
                <Box mr="2">{data.me.username}</Box>
                <Button
                    isLoading={logoutFetching}
                    onClick={() => logout()}
                    variant="link"
                >
                    logout
                </Button>
            </Flex>
        );
    }

    return (
        <Flex position="sticky" top="0" zIndex={1} bg="tan" p={4}>
            <NextLink href="/">
                <Link>
                    <Heading>LiReddit</Heading>
                </Link>
            </NextLink>
            <Box ml="auto">{body}</Box>
        </Flex>
    );
};
