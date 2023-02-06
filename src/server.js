import express from "express";
// const express = require("express");
const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}
const banProtected = (req, res, next) => {
    const url = req.url;
    if (url === "/protected") {
        return res.send("<h1>You cannot be here</h1>");
    }
    console.log("You can be here");
    next();
}
const handleHome = (req, res) => {
    return res.send("Here it works!"); 
}
const protectedController = (req, res) => {
    return res.send("Here is private");
}

app.use(logger);
app.use(banProtected);
app.get("/", handleHome);
app.get("/protected", protectedController);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`); 

app.listen(PORT, handleListening);