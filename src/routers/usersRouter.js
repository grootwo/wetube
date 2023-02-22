import express from "express";
import {
  edit,
  remove,
  startGithubLogin,
  finishGithubLogin,
  logout,
  see,
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.get("/edit", edit);
usersRouter.get("/remove", remove);
usersRouter.get("/logout", logout);
usersRouter.get("/github/start", startGithubLogin);
usersRouter.get("/github/finish", finishGithubLogin);
usersRouter.get("/:id(\\d+)", see);

export default usersRouter;
