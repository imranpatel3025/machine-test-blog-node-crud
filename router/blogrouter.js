
const { route } = require("../app")
const blogControler = require("../controler/blogcontroler")

const express = require("express")

const router = express.Router()

router.get("/", blogControler.getBlog)

router.get("/:id", blogControler.getBlogById)

router.post("/", blogControler.createBlog)

router.patch("/:id", blogControler.updateBlog)

router.delete("/:id", blogControler.deleteBlog)

module.exports = router ;
