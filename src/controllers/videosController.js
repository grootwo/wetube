export const homr = (req, res) => {
    return res.render("home", {pageTitle: "Home", videos: videos});
}
export const watch = (req, res) => {
    const id = req.params.id;
    return res.render("watch", {pageTitle: `Watching video` });
}
export const getEdit = (req, res) => {
    const id = req.params.id;
    return res.render("edit", {pageTitle: `Editing video` });
}
export const postEdit = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Uploading video"});
}
export const postUpload = (req, res) => {
    const { title } = req.body;
    return res.redirect("/");
}