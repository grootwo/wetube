import express from "express";
// const express = require("express");
const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
    return res.send("Here it works!"); 
}
const handleLogin = (req, res) => {
    return res.send("You can login here.");
}

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`); 

app.listen(PORT, handleListening);