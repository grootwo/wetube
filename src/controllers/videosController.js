import Video from "../model/Video";

export const home = async(req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", {pageTitle: "Home", videos: videos });
    } catch(error) {
        console.log("error: ", error);
    }
}
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" });
    }
    return res.render("watch", {pageTitle: video.title, video });
}
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" });
    }
    return res.render("edit", { pageTitle: `Editing video`, video });
}
export const postEdit = async (req, res) => {
    const id = req.params.id;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" });
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    })
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Uploading video"});
}
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
    } catch(error) {
        const errorMsg = error._message;
        return res.render("upload", { pageTitle: "Uploading video", errorMsg: errorMsg });
    }
    return res.redirect("/");
}