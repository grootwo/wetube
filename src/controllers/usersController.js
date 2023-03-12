import bcrypt from "bcrypt";
import fetch from "node-fetch";
import User from "../model/User";
import Video from "../model/Video";

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
  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    req.flash("info", "Done");
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
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
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      req.flash("error", "Not authorized");
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    req.flash("info", "Done");
    return res.redirect("/");
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.user = null;
  res.locals.loggedInUser = req.session.user;
  req.flash("info", "Done");
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { email, name, location },
    file,
  } = req;
  if (email !== req.session.user.email) {
    // 만약 이메일을 변경한다면
    const exists = await User.find({ email: email });
    if (exists.length !== 0) {
      // 이미 이메일이 존재한다면
      req.flash("error", "The email already exists");
      return res.status(403).redirect("/users/edit");
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      email,
      name,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  req.flash("info", "Done");
  return res.redirect("/users/edit");
};

export const getChangePw = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
  return res.render("change-password", { pageTitle: "Change Password" });
};

export const postChangePw = async (req, res) => {
  const pageTitle = "Change Password";
  const {
    session: {
      user: { _id },
    },
    body: { oldPw, newPw, newPw1 },
  } = req;
  const user = await User.findById(_id);
  const match = await bcrypt.compare(oldPw, user.password);
  if (!match) {
    return res.status(400).render("change-password", {
      pageTitle,
      errorMsg: "The current password is incorrect",
    });
  }
  if (newPw !== newPw1) {
    return res.status(400).render("change-password", {
      pageTitle,
      errorMsg: "New password confirmation doesn't match",
    });
  }
  user.password = newPw;
  await user.save();
  req.flash("info", "Done");
  return res.redirect("/users/logout");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found" });
  }
  return res.render("profile", { pageTitle: user.name, user });
};
