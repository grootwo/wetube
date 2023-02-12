import express from "express";
import { search, upload, watch, getEdit, postEdit, remove } from "../controllers/videosController";

const videosRouter = express.Router();

videosRouter.get("/upload", upload);
videosRouter.get("/:id(\\d+)", watch);
videosRouter.get("/:id(\\d+)/edit", getEdit);
videosRouter.post("/:id(\\d+)/edit", postEdit);
videosRouter.get("/:id(\\d+)/remove", remove);

export default videosRouter;