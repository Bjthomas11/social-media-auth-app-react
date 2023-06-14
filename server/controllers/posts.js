import User from "../models/User.js";
import Post from "../models/post.js";

export const createPostController = async (req, res) => {
  const { userId, picturePath, description } = req.body; // get data from request body
  try {
    const user = await User.findById(userId); // find user by id
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      likes: {},
      comments: [],
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
    });

    await newPost.save(); // save new post

    const post = await Post.find(); // find all posts
    res.status(201).json(post); // send all posts
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPostsController = async (req, res) => {
  try {
    const post = await Post.find(); // find all posts
    res.status(200).json(post); // send all posts
  } catch (err) {
    es.status(404).json({ message: err.message });
  }
};

export const getUsersPostsController = async (req, res) => {
  const { userId } = req.params; // get user id from request params
  try {
    const post = await Post.find({ userId }); // find all posts by user id
    res.status(200).json(post); // send all posts
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePostController = async (req, res) => {
  const { id } = req.params; // get post id from request params
  const { userId } = req.body; // get user id from request body
  try {
    const post = await Post.findById(id); // find post by id
    const likes = post.likes.get(userId); // get likes from post
    if (likes) {
      post.likes.delete(userId); // delete like
    } else {
      post.likes.set(userId, true); // add like
    }
    const updatedPost = await post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
