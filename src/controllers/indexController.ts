import type { Request, Response } from "express";
import { getAllVehicles } from "../db/vehicle.js";

export const index = async (req: Request, res: Response) => {
    const vehicles = await getAllVehicles();
    res.render("index", {vehicles});
}