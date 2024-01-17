import api from "./api.service";

class PostService {
  async getAllPostByUserID(userID) {
    return await api.get(`/post/all-posts/author/${userID}`);
  }

  async getAllPosts() {
    return await api.get(`/post/all-posts`);
  }

  async getPostByID(postID) {
    return await api.get(`/post/get-post/${postID}`);
  }

  async uploadPost(post) {
    return await api.post(`/post/upload-post/${post.userID}`, post);
  }

  async updatePost(updatePost) {
    return await api.put(`/post/update-post/${updatePost.postID}`, updatePost);
  }

  async likePost(post) {
    return await api.put(`/post/${post.postID}/like`, post);
  }

  async sharePost(post) {
    return await api.put(`/post/${post.postID}/share`, post);
  }

  async commentPost(post) {
    return await api.put(`/post/${post.postID}/comment`, post);
  }

  async deletePost(postID) {
    return await api.delete(`/post/delete-post/${postID}`);
  }

  async deleteAllPosts(userID) {
    return await api.delete(`/post/delete-all/author/${userID}`);
  }
}

export default new PostService();
