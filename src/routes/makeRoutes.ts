import { Router } from "express";
import * as makeController from "../controllers/makeController.js"
import { param } from "express-validator";

const makeRouter = Router();

makeRouter.get("/", makeController.index)
makeRouter.get("/:make_id",
    param("make_id").isInt(),
    makeController.vehiclesByMake
)

export default makeRouter;