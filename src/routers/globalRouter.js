import express from "express";
import { join } from "../controllers/usersController";
import { trending } from "../controllers/videosController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);

export default globalRouter;