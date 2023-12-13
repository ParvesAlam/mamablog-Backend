const routes = require("express").Router();
const {
    createPost,
    getAllPost,
    getPost,
    updatePost,
    deletePost
} = require("../controller/postController");
const {authMiddleware } = require("../middleware/authMiddleware");
const uploadImg  = require("../middleware/fileUpload");


routes.post("/create", authMiddleware, uploadImg,  createPost);
routes.get("/get", getAllPost);
routes.get("/get/:id", getPost);
routes.put("/update/:id", authMiddleware, uploadImg, updatePost);
routes.delete("/delete/:id", authMiddleware, deletePost);

module.exports = routes;