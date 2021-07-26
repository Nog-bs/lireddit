import { Link } from "@chakra-ui/layout";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
    const { data, error, loading, fetchMore, variables } = usePostsQuery({
        variables: {
            limit: 15,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    });

    if (!loading && !data) {
        return (
            <Box>
                <div>your query failed for some reason</div>
                <div>{error?.message}</div>
            </Box>
        );
    }

    return (
        <Layout>
            {!data && loading ? (
                <div>loading...</div>
            ) : (
                <Stack spacing={8}>
                    {data?.posts.posts.map((p, i) =>
                        !p ? null : (
                            <Flex key={i} p={5} shadow="md" borderWidth="1px">
                                <UpdootSection post={p} />
                                <Box flex={1}>
                                    <NextLink
                                        href="/post/[id]"
                                        as={`/post/${p.id}`}
                                    >
                                        <Link>
                                            <Heading fontSize="xl">
                                                {p.title}
                                            </Heading>{" "}
                                        </Link>
                                    </NextLink>
                                    <Text>posted by {p.creator.username}</Text>
                                    <Flex align="center">
                                        <Text mt={4}>{p.textSnippet}</Text>
                                        <Box ml="auto">
                                            <EditDeletePostButtons
                                                creatorId={p.creator.id}
                                                id={p.id}
                                            />
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        )
                    )}
                </Stack>
            )}
            {data && data.posts.hasMore ? (
                <Flex>
                    <Button
                        onClick={() =>
                            fetchMore({
                                variables: {
                                    limit: variables!.limit,
                                    cursor: data.posts.posts[
                                        data.posts.posts.length - 1
                                    ].createdAt,
                                },
                            })
                        }
                        colorScheme="teal"
                        m="auto"
                        my={4}
                    >
                        load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    );
};

export default withApollo({ ssr: true })(Index);
