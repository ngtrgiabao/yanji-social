import api from "./api.service";

class CommentService {
  async getAllComments() {
    return await api.get(`/comment/all-comments`);
  }

  async getAllCommentsByUserID(userID) {
    return await api.get(`/comment/all-comments/user/${userID}`);
  }

  async getAllCommentsByPostID(postID) {
    return await api.get(`/comment/all-comments/post/${postID}`);
  }

  async getCommentByID(commentID) {
    return await api.get(`/comment/get-comment/${commentID}`);
  }

  async updateComment(updateComment) {
    return await api.put(
      `/comment/update-comment/${updateComment.commentID}`,
      updateComment,
    );
  }

  async deleteComment(commentID) {
    return await api.delete(`/comment/delete-comment/${commentID}`);
  }
}

export default new CommentService();
