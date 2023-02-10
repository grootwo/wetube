// const express = require("express");
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import usersRouter from "./routers/usersRouter";
import videosRouter from "./routers/videosRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);


app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/", globalRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);


const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`); 

app.listen(PORT, handleListening);