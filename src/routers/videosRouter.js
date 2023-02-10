import express from "express";
import { search, upload, watch, edit, remove } from "../controllers/videosController";

const videosRouter = express.Router();

videosRouter.get("/search", search);
videosRouter.get("/upload", upload);
videosRouter.get("/:id", watch);
videosRouter.get("/:id/edit", edit);
videosRouter.get("/:id/remove", remove);

export default videosRouter;