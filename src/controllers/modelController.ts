import type { Request, Response } from "express";
import { addModel, getAllModels } from "../db/model.js";
import { getAllMakes } from "../db/make.js";
import { getAllVehicleTypes } from "../db/vehicle.js";
import { validationResult } from "express-validator";
import type { CreateModelPostBody } from "../types.js";

export const index = async (req: Request, res: Response) => {
    const models = await getAllModels();
    res.render("models", {models});
}

export const getCreateModel = async (req: Request, res: Response) => {
    const [allMakes, allVehicleTypes] = await Promise.all([getAllMakes(), getAllVehicleTypes()]);
    res.render("create/createModel", {allMakes, allVehicleTypes});
}

export const postCreateModel = async (req: Request<{}, {}, CreateModelPostBody>, res: Response) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()) {
        return res.status(400).send("Bad request");
    }

    const model = req.body.model;
    const make = parseInt(req.body.make);
    const vehicle_type = parseInt(req.body.vehicle_type);

    try {
        await addModel({model, make, vehicle_type});
        return res.redirect("/model")
    } catch (error) {
        console.log(error);
        if(error instanceof Error && "code" in error && error.code == "23505") {
            res.status(400).send("The make and model combo is already in the system");
        } else {
            return res.status(500).send("An error occured when creating your model. Please contact us for help")
        }
    }
}