import api from "./api.service";

class PostService {
  async getAllPostByUserID(userID) {
    return await api.get(`/api/v1/post/all-posts/author/${userID}`);
  }

  async getAllPosts() {
    return await api.get(`/api/v1/post/all-posts`);
  }

  async getPostByID(postID) {
    return await api.get(`/api/v1/post/get-post/${postID}`);
  }

  async uploadPost(post) {
    return await api.post(`/api/v1/post/upload-post/${post.userID}`, post);
  }

  async updatePost(updatePost) {
    return await api.put(
      `/api/v1/post/update-post/${updatePost.postID}`,
      updatePost,
    );
  }

  async likePost(post) {
    return await api.put(`/api/v1/post/${post.postID}/like`, post);
  }

  async sharePost(post) {
    return await api.put(`/api/v1/post/${post.postID}/share`, post);
  }

  async commentPost(post) {
    return await api.put(`/api/v1/post/${post.postID}/comment`, post);
  }

  async deletePost(postID) {
    return await api.delete(`/api/v1/post/delete-post/${postID}`);
  }

  async deleteAllPosts(userID) {
    return await api.delete(`/api/v1/post/delete-all/author/${userID}`);
  }
}

export default new PostService();
