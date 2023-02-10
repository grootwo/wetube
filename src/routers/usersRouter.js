import express from "express";
import { edit, remove, login, logout, see } from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.get("/edit", edit);
usersRouter.get("/remove", remove);
usersRouter.get("/login", login);
usersRouter.get("/logout", logout);
usersRouter.get("/:id", see);

export default usersRouter;