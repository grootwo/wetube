import express from "express";
import { search, upload, watch, edit, remove } from "../controllers/videosController";

const videosRouter = express.Router();

videosRouter.get("/search", search);
videosRouter.get("/upload", upload);
videosRouter.get("/:id(\\d+)", watch);
videosRouter.get("/:id(\\d+)/edit", edit);
videosRouter.get("/:id(\\d+)/remove", remove);

export default videosRouter;