import User from "../model/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { email, username, password, name, location } = req.body;
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => {
  return res.send("User edit");
};
export const remove = (req, res) => {
  return res.send("User remove");
};
export const login = (req, res) => {
  return res.send("User login");
};
export const logout = (req, res) => {
  return res.send("User logout");
};
export const see = (req, res) => {
  return res.send(`User ${req.params.id} see`);
};
