import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
    // & joins the types together
    req: Request & { session: { userId: number } };
    redis: Redis;
    res: Response;
};
