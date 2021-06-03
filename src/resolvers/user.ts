import { MyContext } from "../types";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;
    
    @Field()
    password: string;
}

@Resolver()
export class UserResolver {
    // FIRST LETTER CAPITALIZED
    @Query(() => String)
    @Mutation(() => String)
    register(
        @Arg('options') options: UsernamePasswordInput
        @Ctx() {em}: MyContext
    ) {

    }
}