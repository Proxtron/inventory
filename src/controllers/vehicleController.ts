import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getVehicle, getAllVehiclesByType } from "../db/vehicle.js";

export const index = async (req: Request<{vehicle_id: string}>, res: Response) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).send("Bad request");
    }

    const vehicleId = parseInt(req.params.vehicle_id);
    const queryResult = await getVehicle(vehicleId);
    const vehicle = queryResult[0];

    if(queryResult.length === 0) {
        return res.status(404).render("notFound");
    } else {
        return res.render("vehicle", {vehicle});
    }
}

export const vehiclesByType = async (req: Request<{type_id: string}>, res: Response) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).send("Bad request");
    }

    const vehicleTypeId = parseInt(req.params.type_id);
    const queryResult = await getAllVehiclesByType(vehicleTypeId);
    const vehicleType = queryResult[0]?.vehicle_type_name

    if(queryResult.length === 0) {
        return res.status(404).render("notFound");
    } else {
        return res.render("vehicleByType", {vehicles: queryResult, vehicleType});
    }
}