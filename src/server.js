// const express = require("express");
import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();

const handleHome = (req, res) => {
    return res.send("Home");
}

globalRouter.get("/", handleHome)

const usersRouter = express.Router();

const handleUserEdit = (req, res) => {
    return res.send("User edit");
}

usersRouter.get("/edit", handleUserEdit);

const videosRouter = express.Router();

const handleVideoWatch = (req, res) => {
    return res.send("Video watch");
}

videosRouter.get("/watch", handleVideoWatch);


app.use("/", globalRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);


const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`); 

app.listen(PORT, handleListening);