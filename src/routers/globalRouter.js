import express from "express";

const globalRouter = express.Router();

const handleHome = (req, res) => {
    return res.send("Home");
}

globalRouter.get("/", handleHome);

export default globalRouter;