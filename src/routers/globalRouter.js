import express from "express";
import { join, login } from "../controllers/usersController";
import { trending } from "../controllers/videosController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;