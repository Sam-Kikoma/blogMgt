const config = require("./utils/config")
require('express-async-errors')
const blogsRouter = require("./controllers/blogs")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app