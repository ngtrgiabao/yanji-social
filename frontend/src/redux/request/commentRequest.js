import commentService from "../../services/comment.service";
import {
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailed,
  getCommentStart,
  getCommentSuccess,
  getCommentFailed,
} from "../commentSlice";

export const getAllComments = async (dispatch) => {
  dispatch(getCommentStart());
  try {
    const res = await commentService.getAllComments();
    dispatch(getCommentSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getCommentFailed());
  }
};

export const getAllCommentsByUserID = async (userID, dispatch) => {
  dispatch(getCommentStart());
  try {
    const res = await commentService.getAllCommentsByUserID(userID);
    dispatch(getCommentSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getCommentFailed());
  }
};

export const getAllCommentsByPostID = async (postID, dispatch) => {
  dispatch(getCommentStart());
  try {
    const res = await commentService.getAllCommentsByPostID(postID);
    dispatch(getCommentSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getCommentFailed());
  }
};

export const getCommentByID = async (commentID, dispatch) => {
  dispatch(getCommentStart());
  try {
    const res = await commentService.getCommentByID(commentID);
    dispatch(getCommentSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getCommentFailed());
  }
};

export const updatePost = async (updatePost, dispatch) => {
  dispatch(updateCommentStart());

  try {
    const res = await commentService.updateComment(updatePost);
    dispatch(updateCommentSuccess(res.data));
  } catch (error) {
    dispatch(updateCommentFailed());
  }
};

export const deleteComment = async (commentID, dispatch) => {
  dispatch(deleteCommentStart());
  try {
    const res = await commentService.deleteComment(commentID);
    dispatch(deleteCommentSuccess());
    return res.data;
  } catch (error) {
    dispatch(deleteCommentFailed());
  }
};
