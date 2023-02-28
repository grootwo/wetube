import express from "express";
import {
  getEdit,
  postEdit,
  getChangePw,
  postChangePw,
  startGithubLogin,
  finishGithubLogin,
  logout,
  see,
} from "../controllers/usersController";
import {
  loggedInOnlyMiddleware,
  publicOnlyMiddleware,
  uploadAvatar,
} from "../middlewares";

const usersRouter = express.Router();

usersRouter
  .route("/edit")
  .all(loggedInOnlyMiddleware)
  .get(getEdit)
  .post(uploadAvatar.single("avatar"), postEdit);
usersRouter
  .route("/change-password")
  .all(loggedInOnlyMiddleware)
  .get(getChangePw)
  .post(postChangePw);
usersRouter.get("/logout", loggedInOnlyMiddleware, logout);
usersRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
usersRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
usersRouter.get("/:id", see);

export default usersRouter;
