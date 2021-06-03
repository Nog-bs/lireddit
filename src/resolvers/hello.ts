import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    // FIRST LETTER CAPITALIZED
    @Query(() => String)
    hello() {
        return "hello";
    }
}
