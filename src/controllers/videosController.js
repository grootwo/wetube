const fakeUser = {
    name: "Hiho",
    loggedIn: true,
}

export const trending = (req, res) => {
    const videos = [1, 2, 3, 4, 5, 6]
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