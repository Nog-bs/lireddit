import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import React from "react";
import { Link } from "@chakra-ui/layout";

const Index = () => {
    const [{ data }] = usePostsQuery();
    return (
        <Layout>
            <NextLink href="/create-post">
                <Link>create post </Link>
            </NextLink>
            <h1>Posts</h1>
            <br />
            {!data ? (
                <div>loading...</div>
            ) : (
                data.posts.map((p) => <div key={p.id}>{p.title}</div>)
            )}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
