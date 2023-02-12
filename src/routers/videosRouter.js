import express from "express";
import { watch, getEdit, postEdit} from "../controllers/videosController";

const videosRouter = express.Router();

videosRouter.get("/:id(\\d+)", watch);
videosRouter.get("/:id(\\d+)/edit", getEdit);
videosRouter.post("/:id(\\d+)/edit", postEdit);

export default videosRouter;