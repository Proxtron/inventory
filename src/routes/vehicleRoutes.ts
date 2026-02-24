import { Router } from "express";
import * as vehicleController from "../controllers/vehicleController.js"
import { param, body } from "express-validator";

const vehicleRouter = Router();

vehicleRouter.get("/detail/:vehicle_id",
    param("vehicle_id").isInt(),
    vehicleController.index);

vehicleRouter.get("/type/:type_id",
    param("type_id").isInt(),
    vehicleController.vehiclesByType
)

vehicleRouter.get("/new", vehicleController.getCreateForm)

vehicleRouter.post("/new",
    body(["year", "make", "model"]).isInt(),
    body("price").isFloat(),
    body("color").notEmpty(),
    vehicleController.postCreateForm
)

vehicleRouter.post("/delete",
    body("vehicle_id").isInt(),
    vehicleController.postDeleteForm
)

export default vehicleRouter;