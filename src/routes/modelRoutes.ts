import { Router } from "express";
import * as modelController from "../controllers/modelController.js"

const modelRouter = Router();

modelRouter.get("/", modelController.index);

export default modelRouter;