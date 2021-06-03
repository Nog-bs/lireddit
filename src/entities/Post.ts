import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
    @PrimaryKey()
    id!: number;

    @Property({ type: "date" })
    createdAt = new Date();

    // HOOK TO UPDATE DATE
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    title!: string;
}
