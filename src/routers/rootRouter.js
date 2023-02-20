import express from "express";
import { join, login } from "../controllers/usersController";
import { home, search } from "../controllers/videosController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/join", join);
rootRouter.get("/login", login);
rootRouter.get("/search", search);

export default rootRouter;