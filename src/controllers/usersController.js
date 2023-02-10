export const join = (req, res) => {
    return res.send("User Join");
}
export const edit = (req, res) => {
    return res.send("User edit");
}
export const remove = (req, res) => {
    return res.send("User remove");
}
export const login = (req, res) => {
    return res.send("User login");
}
export const logout = (req, res) => {
    return res.send("User logout");
}
export const see = (req, res) => {
    return res.send(`User ${req.params.id} see`);
}