const routes = require("express").Router();
const {
  createUser,
  loginUser,
  getUser,
} = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const uploadImg  = require("../middleware/fileUpload");

routes.post("/register", uploadImg, createUser);
routes.post("/login", loginUser);
routes.get("/login/user-details",authMiddleware, getUser);



module.exports = routes;
