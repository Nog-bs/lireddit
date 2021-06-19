import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

// OBJECTYPE ALLOWS ONE TO MAKE A GRAPHQL SCHEMA
@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    // HOOK TO UPDATE DATE
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column()
    title!: string;
}
