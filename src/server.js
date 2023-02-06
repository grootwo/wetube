import express from "express";
// const express = require("express");
const POST = 4000;
const app = express();

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`); 

app.listen(POST, handleListening);