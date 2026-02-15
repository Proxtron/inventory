import { Router } from "express";
import * as vehicleController from "../controllers/vehicleController.js"
import { param } from "express-validator";

const vehicleRouter = Router();

vehicleRouter.get("/:vehicle_id",
    param("vehicle_id").isInt(),
    vehicleController.index);

export default vehicleRouter;