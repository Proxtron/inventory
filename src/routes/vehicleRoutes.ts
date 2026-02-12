import { Router } from "express";
import * as vehicleController from "../controllers/vehicleController.js"

const vehicleRouter = Router();

vehicleRouter.get("/", vehicleController.index);

export default vehicleRouter;