import express from "express";

const videosRouter = express.Router();

const handleVideoWatch = (req, res) => {
    return res.send("Video watch");
}

videosRouter.get("/watch", handleVideoWatch);

export default videosRouter;