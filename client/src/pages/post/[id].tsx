import { Box, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
    const [{ data, error, fetching }] = useGetPostFromUrl();

    if (fetching) {
        return <Layout>loading...</Layout>;
    }

    if (error) {
        return <Layout>{error.message}</Layout>;
    }

    if (!data?.post) {
        return (
            <Layout>
                <Box>post does not exist</Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Heading mb={4}>{data?.post?.title}</Heading>
            <Box>{data?.post?.text}</Box>
            <EditDeletePostButtons
                id={data.post.id}
                creatorId={data.post.creator.id}
            />
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
