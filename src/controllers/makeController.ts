import type { Request, Response } from "express";
import { getAllMakes } from "../db/make.js";

export const index = async (req: Request, res: Response) => {
    const makes = await getAllMakes();

    res.render("makes", {makes})
}