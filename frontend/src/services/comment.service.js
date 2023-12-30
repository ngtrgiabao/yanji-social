import api from "./api.service";

class CommentService {
  async getAllComments() {
    return await api.get(`/api/v1/comment/all-comments`);
  }

  async getAllCommentsByUserID(userID) {
    return await api.get(`/api/v1/comment/all-comments/user/${userID}`);
  }

  async getAllCommentsByPostID(postID) {
    return await api.get(`/api/v1/comment/all-comments/post/${postID}`);
  }

  async getCommentByID(commentID) {
    return await api.get(`/api/v1/comment/get-comment/${commentID}`);
  }

  async updateComment(updateComment) {
    return await api.put(
      `/api/v1/comment/update-comment/${updateComment.commentID}`,
      updateComment,
    );
  }

  async deleteComment(commentID) {
    return await api.delete(`/api/v1/comment/delete-comment/${commentID}`);
  }
}

export default new CommentService();
