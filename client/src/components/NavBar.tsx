import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery();
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
        <Flex bg="tan" p={4}>
            <Box ml="auto">{body}</Box>
        </Flex>
    );
};