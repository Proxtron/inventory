import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getVehicle, getAllVehiclesByType, addVehicle } from "../db/vehicle.js";
import { getAllMakes } from "../db/make.js";
import { getAllModelTypeCombos } from "../db/model.js";
import type { CreateVehiclePostBody } from "../types.js";

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

export const getCreateForm = async (req: Request, res: Response) => {
    const allMakes = await getAllMakes();
    const allModelTypeCombos = await getAllModelTypeCombos();
    return res.render("create/createVehicle", {allMakes, allModelTypeCombos});
}

export const postCreateForm = async (
    req: Request<{}, {}, CreateVehiclePostBody>, res: Response
) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).send("Bad request");
    }

    const body = req.body

    const year = parseInt(body.year);
    const color = body.color;
    const price = parseFloat(body.price);
    const make = parseInt(body.make);
    const model = parseInt(body.model);

    try {
        const insertedVehicleId = await addVehicle({year, color, price, make, model});
        if(!insertedVehicleId) {
            return res.status(500).send("An error occured when trying to add your vehicle. Please try again");
        } else {
            return res.redirect(`/vehicle/detail/${insertedVehicleId.id}`);
        }
    } catch(err) {
        return res.status(500).send("An error occured when trying to add your vehicle. Please try again");
    }
}