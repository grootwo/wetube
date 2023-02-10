export const trending = (req, res) => {
    return res.render("home");
}
export const watch = (req, res) => {
    return res.send(`Video ${req.params.id} watch`);
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