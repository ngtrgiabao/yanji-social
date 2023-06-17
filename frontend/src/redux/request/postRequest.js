import postService from "../../services/post.service";
import {
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
} from "../postSlice";

export const uploadPost = async (post, dispatch) => {
    dispatch(uploadPostStart());
    try {
        const res = await postService.uploadPost(post);
        dispatch(uploadPostSuccess(res.data));
    } catch (error) {
        dispatch(uploadPostFailed());
    }
};

export const getPostByID = async (postID, dispatch) => {
    dispatch(getPostStart());
    try {
        const res = await postService.getPostByID(postID);
        dispatch(getPostSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getPostFailed());
    }
};

export const getAllPostsByUser = async (userID, dispatch) => {
    dispatch(getPostStart());
    try {
        const res = await postService.getAllPostByUserID(userID);
        dispatch(getPostSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getPostFailed());
    }
};

export const deletePost = async (postID, dispatch) => {
    dispatch(deletePostStart());
    try {
        await postService.deletePost(postID);
        dispatch(deletePostSuccess());
    } catch (error) {
        dispatch(deletePostFailed());
    }
};

export const deleteAllPosts = async (userID, dispatch) => {
    dispatch(deletePostStart());
    try {
        await postService.deleteAllPosts(userID);
        dispatch(deletePostSuccess());
    } catch (error) {
        dispatch(deletePostFailed());
    }
};

export const updatePost = async (updatePost, dispatch) => {
    dispatch(updatePostStart());

    try {
        const res = await postService.updatePost(updatePost);
        dispatch(updatePostSuccess(res.data));
    } catch (error) {
        dispatch(updatePostFailed());
    }
};

export const likePost = async (post, dispatch) => {
    dispatch(updatePostStart());

    try {
        const res = await postService.likePost(post);
        dispatch(updatePostSuccess(res.data));
    } catch (error) {
        dispatch(updatePostFailed());
    }
};

export const sharePost = async (post, dispatch) => {
    dispatch(updatePostStart());

    try {
        const res = await postService.sharePost(post);
        dispatch(updatePostSuccess(res.data));
    } catch (error) {
        dispatch(updatePostFailed());
    }
};

export const commentPost = async (post, dispatch) => {
    dispatch(updatePostStart());

    try {
        const res = await postService.commentPost(post);
        dispatch(updatePostSuccess(res.data));
    } catch (error) {
        dispatch(updatePostFailed());
    }
};
