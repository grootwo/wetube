import express from "express";
import { 
    watch, 
    getEdit, 
    postEdit, 
    getUpload, 
    postUpload, 
    deleteVideo 
} from "../controllers/videosController";

const videosRouter = express.Router();

videosRouter.route("/upload").get(getUpload).post(postUpload);
videosRouter.get("/:id([0-9a-f]{24})", watch);
videosRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videosRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

export default videosRouter;