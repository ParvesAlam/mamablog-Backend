const routes = require("express").Router();

const postRoute= require("../routes/post")
const userRoute= require("../routes/authRoute")

routes.use("/post", postRoute)
routes.use("/user", userRoute)


module.exports = routes;
