import { Router } from "express";
import * as modelController from "../controllers/modelController.js"
import { body } from "express-validator";


const modelRouter = Router();

modelRouter.get("/", modelController.index);
modelRouter.get("/new", modelController.getCreateModel)
modelRouter.post("/new", 
    body("model").isString(),
    body(["make", "vehicle_type"]).isInt(),
    modelController.postCreateModel
);

export default modelRouter;