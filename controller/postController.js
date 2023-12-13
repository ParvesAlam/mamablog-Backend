const { ObjectId } = require("bson");
const { default: mongoose } = require("mongoose");
const Post = require("../model/PostModel")

// Create Post
const createPost = async (req, res) => {
  const { title, description } = req.body;
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Please upload an imgage' });
  }
  const newPost = new Post({
    title,
    description,
    img: `http://localhost:8000/${req.file.path}`,
  });

  await newPost.save();
  // Send a response
  return res.status(200).json({ message: 'Post Created successfully', data: newPost });
      
}

// Get All Post
const getAllPost = async (req, res) => {
  try {
    const getAllPost = await Post.find({});
    res.status(200).json({ msg: "Data Found", success: true, getAllPost });
  } catch (err) {
    throw new Error(err);
  }
};

// Get Post
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await Post.findById(id);
    return res.json(findPost);
  } catch (err) {
    throw new Error(err);
  }
};

// Update a Post
const updatePost = async (req, res) => {
  const { title, description, img } = req.body;
  let imgfile 
  if (!req.file || !req.file.path) {
    imgfile = img
  } else {
    imgfile = `http://localhost:8000/${req.file.path}`
  }

  try {
    const _id = new mongoose.Types.ObjectId(req.params);
    const findPostAndUpdate = await Post.findByIdAndUpdate(
      _id ,
      {
        title,
        description,
        img:  imgfile
       
      },
      { new: true }
    );
    return res.json(findPostAndUpdate);
  } catch (err) {
    throw new Error(err);
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndRemove(id);
    
    return res.json(id);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
    createPost,
    getAllPost,
    getPost,
    updatePost,
    deletePost
  };