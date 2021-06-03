import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

// OBJECTYPE ALLOWS ONE TO MAKE A GRAPHQL SCHEMA
@ObjectType()
@Entity()
export class Post {
    @Field()
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({ type: "date" })
    createdAt = new Date();

    @Field(() => String)
    // HOOK TO UPDATE DATE
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property()
    title!: string;
}
