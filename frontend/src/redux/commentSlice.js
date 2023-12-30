import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: {
      isFetching: false,
      error: false,
      success: false,
      currentComment: null,
    },
  },

  reducers: {
    //GET COMMENT
    getCommentStart: (state) => {
      state.comment = {};
      state.comment.isFetching = true;
    },
    getCommentSuccess: (state, action) => {
      state.comment.isFetching = false;
      state.comment.currentComment = action.payload;
      state.comment.success = true;
    },
    getCommentFailed: (state) => {
      state.comment.isFetching = false;
      state.comment.error = true;
    },
    // UPDATE COMMENT
    updateCommentStart: (state) => {
      state.comment.isFetching = true;
    },
    updateCommentSuccess: (state, action) => {
      state.comment.isFetching = false;
      state.comment.currentComment = action.payload;
      state.comment.success = true;
    },
    updateCommentFailed: (state) => {
      state.comment.isFetching = false;
      state.comment.error = true;
    },
    // DELETE COMMENT
    deleteCommentStart: (state) => {
      state.comment.isFetching = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.comment.isFetching = false;
      state.comment.success = true;
    },
    deleteCommentFailed: (state) => {
      state.comment.isFetching = false;
      state.comment.error = true;
    },
  },
});

export const {
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailed,
  getCommentStart,
  getCommentSuccess,
  getCommentFailed,
} = commentSlice.actions;

export default commentSlice.reducer;
