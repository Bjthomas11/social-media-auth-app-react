import User from "../models/User.js";

// read user
export const getUser = async (req, res) => {
  const { id } = req.params; // id of user
  try {
    const user = await User.findById(id); // find user by id
    res.status(200).json(user); // send user back
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// read user friends
export const getUserFriends = async (req, res) => {
  const { id } = req.params; // id of user

  try {
    const user = await User.findById(id); // find user by id

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatted = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        _id, firstName, lastName, picturePath, location, occupation;
      }
    );
    res.status(200).json(formatted);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// update
export const addRemoveFriend = async (req, res) => {
  const { id, friendId } = req.params;
  try {
    const user = await User.findById(id); // find user by id
    const friend = await User.findById(friendId); // find friend by id

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId); // remove friend
      friend.friends = friend.friends.filter((id) => id !== id); // remove user from friends list
    } else {
      user.friends.push(friendId); // add friend
      friend.friends.push(id); // add user to friends list
    }
    await user.save(); // save user
    await friend.save(); // save friend

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)) // find all friends
    );
    const formatted = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        _id, firstName, lastName, picturePath, location, occupation;
      }
    ); // format friends

    res.status(200).json(formatted); // send friends back
  } catch (error) {
    res.status(404).json({ error: err.message }); // send error back
  }
};
