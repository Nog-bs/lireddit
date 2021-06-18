import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>;
    // & joins the types together
    req: Request & { session: { userId: number } };
    redis: Redis;
    res: Response;
};
