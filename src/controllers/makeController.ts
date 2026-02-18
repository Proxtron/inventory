import type { Request, Response } from "express";
import { getAllMakes } from "../db/make.js";
import { validationResult } from "express-validator";
import { getAllVehiclesByMake } from "../db/vehicle.js";

export const index = async (req: Request, res: Response) => {
    const makes = await getAllMakes();

    res.render("makes", {makes})
}

export const vehiclesByMake = async (req: Request<{make_id: string}>, res: Response) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).send("Bad request");
    }

    const makeId = parseInt(req.params.make_id);
    const queryResult = await getAllVehiclesByMake(makeId);
    res.render("vehicleByMake", {
        vehicles: queryResult,
        make: queryResult[0]?.make_name
    });
}