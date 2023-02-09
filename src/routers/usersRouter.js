import express from "express";

const usersRouter = express.Router();

const handleUserEdit = (req, res) => {
    return res.send("User edit");
}

usersRouter.get("/edit", handleUserEdit);

export default usersRouter;