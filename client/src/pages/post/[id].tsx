import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Post = ({}) => {
    const router = useRouter();
    router.query.id;
    return (
        <div>
            <h1>Post Route</h1>
        </div>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
