import { Router } from "express";
import * as makeController from "../controllers/makeController.js"

const makeRouter = Router();

makeRouter.get("/", makeController.index)

export default makeRouter;