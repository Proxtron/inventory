import type { Request, Response } from "express";
import { getAllModels } from "../db/model.js";

export const index = async (req: Request, res: Response) => {
    const models = await getAllModels();
    res.render("models", {models});
}