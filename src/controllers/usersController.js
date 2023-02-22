import bcrypt from "bcrypt";
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
    return res.status(400).render("join", { pageTitle, errorMsg });
  }
  if (password !== password1) {
    const errorMsg = "Password confirmation does not match";
    return res.status(400).render("join", { pageTitle, errorMsg });
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
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMsg: "User doesn't exist",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("login", {
      pageTitle,
      errorMsg: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: "8af1dc42b0da2e13e0a2",
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect("/users/github/finish");
};
export const finishGithubLogin = (req, res) => {};
export const edit = (req, res) => {
  return res.send("User edit");
};
export const remove = (req, res) => {
  return res.send("User remove");
};
export const logout = (req, res) => {
  return res.send("User logout");
};
export const see = (req, res) => {
  return res.send(`User ${req.params.id} see`);
};
