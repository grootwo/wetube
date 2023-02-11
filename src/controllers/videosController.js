const fakeUser = {
    name: "Hiho",
    loggedIn: true,
}

export const trending = (req, res) => {
    const videos = [
        {
            title: "First Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
        {
            title: "Second Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
        {
            title: "Third Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
    ];
    return res.render("home", {pageTitle: "Home", fakeUser: fakeUser, videos: videos});
}
export const watch = (req, res) => {
    return res.render("watch", {pageTitle: "Watch"});
}
export const edit = (req, res) => {
    return res.send(`Video ${req.params.id} edit`);
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