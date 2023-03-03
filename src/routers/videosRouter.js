import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videosController";
import { loggedInOnlyMiddleware, uploadVideo } from "../middlewares";

const videosRouter = express.Router();

videosRouter
  .route("/upload")
  .all(loggedInOnlyMiddleware)
  .get(getUpload)
  .post(
    uploadVideo.fields([{ name: "video" }, { name: "thumbnail" }]),
    postUpload
  );
videosRouter.get("/:id([0-9a-f]{24})", watch);
videosRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(loggedInOnlyMiddleware)
  .get(getEdit)
  .post(postEdit);
videosRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(loggedInOnlyMiddleware)
  .get(deleteVideo);

export default videosRouter;
