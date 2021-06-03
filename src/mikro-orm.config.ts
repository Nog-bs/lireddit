import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        // DIR IS THE ABSOLUTE DIRECTORY
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    // SCHEMA
    entities: [Post],
    dbName: "lireddit",
    password: "root",
    debug: !__prod__,
    type: "postgresql",
} as Parameters<typeof MikroORM.init>[0];
