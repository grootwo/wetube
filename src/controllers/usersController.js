import User from "../model/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { email, username, password, password1, name, location } = req.body;
  const pageTitle = "Join";
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    const errorMsg = "This email/username is already taken";
    return res.render("join", { pageTitle, errorMsg });
  }
  if (password !== password1) {
    const errorMsg = "Password confirmation does not match";
    return res.render("join", { pageTitle, errorMsg });
  }
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
