const fakeUser = {
    name: "Hiho",
    loggedIn: true,
}
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
    return res.render("home", {pageTitle: "Home", fakeUser: fakeUser, videos: videos});
}
export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1]
    return res.render("watch", {pageTitle: `Watching ${video.title} video`, fakeUser: fakeUser, video: video});
}
export const edit = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1]
    return res.render("edit", {pageTitle: `Watching ${video.title} video`, fakeUser: fakeUser, video: video});
}
export const search = (req, res) => {
    return res.send("Video search");
}
export const remove = (req, res) => {
    return res.send(`Video ${req.params.id} remove`);
}
export const upload = (req, res) => {
    return res.send("Video upload");
}