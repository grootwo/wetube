const videos = [
        {
            title: "First Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 1,
            id: 1,
        },
        {
            title: "Second Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 2,
        },
        {
            title: "Third Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 4399,
            id: 3,
        },
];

export const trending = (req, res) => {
    return res.render("home", {pageTitle: "Home", videos: videos});
}
export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1]
    return res.render("watch", {pageTitle: `Watching ${video.title} video`, video: video});
}
export const getEdit = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1];
    return res.render("edit", {pageTitle: `Editing ${video.title} video`, video: video});
}
export const postEdit = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Uploading video"});
}
export const postUpload = (req, res) => {
    const { title } = req.body;
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        createdAt: "Just now",
        views: 0,
        id: videos.length + 1,
    }
    videos.push(newVideo);
    return res.redirect("/");
}