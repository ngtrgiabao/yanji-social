import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {
      isFetching: false,
      error: false,
      success: false,
      currentPost: null,
    },
  },

  reducers: {
    // UPLOAD POST
    uploadPostStart: (state) => {
      state.post.isFetching = true;
    },
    uploadPostSuccess: (state, action) => {
      state.post.isFetching = false;
      state.post.currentPost = action.payload;
      state.post.success = true;
    },
    uploadPostFailed: (state) => {
      state.post.isFetching = false;
      state.post.error = true;
    },
    //GET POST
    getPostStart: (state) => {
      state.message = {};
      state.post.isFetching = true;
    },
    getPostSuccess: (state, action) => {
      state.post.isFetching = false;
      state.post.currentPost = action.payload;
      state.post.success = true;
    },
    getPostFailed: (state) => {
      state.post.isFetching = false;
      state.post.error = true;
    },
    // UPDATE POST
    updatePostStart: (state) => {
      state.post.isFetching = true;
    },
    updatePostSuccess: (state, action) => {
      state.post.isFetching = false;
      state.post.currentPost = action.payload;
      state.post.success = true;
    },
    updatePostFailed: (state) => {
      state.post.isFetching = false;
      state.post.error = true;
    },
    // DELETE POST
    deletePostStart: (state) => {
      state.post.isFetching = true;
    },
    deletePostSuccess: (state, action) => {
      state.post.isFetching = false;
      state.post.success = true;
    },
    deletePostFailed: (state) => {
      state.post.isFetching = false;
      state.post.error = true;
    },
  },
});

export const {
  uploadPostStart,
  uploadPostSuccess,
  uploadPostFailed,
  updatePostStart,
  updatePostSuccess,
  updatePostFailed,
  deletePostStart,
  deletePostSuccess,
  deletePostFailed,
  getPostStart,
  getPostSuccess,
  getPostFailed,
} = postSlice.actions;

export default postSlice.reducer;
