import express from "express";
import { watch, edit } from "../controllers/videosController";

const videosRouter = express.Router();

videosRouter.get("/watch", watch);
videosRouter.get("/edit", edit);

export default videosRouter;