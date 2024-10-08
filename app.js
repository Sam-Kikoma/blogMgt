const config = require("./utils/config")
require('express-async-errors')
const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

module.exports = app