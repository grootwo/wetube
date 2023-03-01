import express from "express";
import { registerView } from "../controllers/videosController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/views", registerView);

export default apiRouter;
