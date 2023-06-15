import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      // action.payload = { user, token }
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // no action payload
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      // action.payload = friends
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.error("No user to set friends to");
      }
    },
    setPosts: (state, action) => {
      // action.payload = posts
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      // action.payload = post
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions; // export actions

export default authSlice.reducer; // export reducer
