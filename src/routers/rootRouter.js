import express from "express";
import { getJoin, postJoin, login } from "../controllers/usersController";
import { home, search } from "../controllers/videosController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", search);

export default rootRouter;