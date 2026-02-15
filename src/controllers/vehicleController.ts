import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getVehicle } from "../db/vehicle.js";

export const index = async (req: Request<{vehicle_id: string}>, res: Response) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).send("Bad request");
    }

    const vehicleId = parseInt(req.params.vehicle_id);
    const queryResult = await getVehicle(vehicleId);
    const vehicle = queryResult[0];

    if(queryResult.length === 0) {
        return res.status(404).render("vehicle", {notFound: true, vehicle});
    } else {
        return res.render("vehicle", {notFound: false, vehicle});
    }
}