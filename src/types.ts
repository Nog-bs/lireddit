import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";

export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>;
    // & joins the types together
    req: Request & { session: { userId: number } };
    res: Response;
};
