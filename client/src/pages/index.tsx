import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
    const [{ data }] = usePostsQuery();
    return (
        <>
            <NavBar />
            <h1>Posts</h1>
            <br />
            {!data ? (
                <div>loading...</div>
            ) : (
                data.posts.map((p) => <div key={p.id}>{p.title}</div>)
            )}
        </>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
