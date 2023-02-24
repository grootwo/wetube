import express from "express";
import {
  getEdit,
  postEdit,
  remove,
  startGithubLogin,
  finishGithubLogin,
  logout,
  see,
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.route("/edit").get(getEdit).post(postEdit);
usersRouter.get("/edit", getEdit);
usersRouter.get("/remove", remove);
usersRouter.get("/logout", logout);
usersRouter.get("/github/start", startGithubLogin);
usersRouter.get("/github/finish", finishGithubLogin);
usersRouter.get("/:id(\\d+)", see);

export default usersRouter;
