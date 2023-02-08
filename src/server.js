import express from "express";

const app = express();

const urlLogger = (req, res, next) => {
    console.log("Path: ", req.url);
    next();
};
const timeLogger = (req, res, next) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    console.log(`Time: ${year}/${month}/${day}`);
    next();
};
const securityLogger = (req, res, next) => {
    if (req.protocol === "https") {
        console.log("Secure");
    } else {
        console.log("Insecure");
    }
    next();
};
const protecter = (req, res, next) => {
    if (req.url === "/protected") {
        return res.send("You are not allowed to enter");
    } else {
        next();
    }
}

app.use(protecter);
app.use(urlLogger, timeLogger, securityLogger);
app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)
app.listen(4000, () => `Listening!✅`);
