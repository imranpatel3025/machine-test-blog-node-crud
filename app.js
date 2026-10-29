
const express = require("express")

const router = require("./router/blogrouter")

const app = express()

app.use(express.json())

app.use("/api/blogss", router)

module.exports = app;