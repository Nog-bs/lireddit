import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

// Middleware function that you wrap resolvers with that check if the user is logged in
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("not authenticated");
    }

    return next();
};
