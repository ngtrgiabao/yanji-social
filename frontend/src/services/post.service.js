import api from "./api.service";

class PostService {
    async getAllPostByUserID(userID) {
        return await api.get(`/api/v1/post/all-posts/author/${userID}`);
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
            updatePost
        );
    }

    async deletePost(postID) {
        return await api.delete(`/api/v1/post/delete-post/${postID}`);
    }

    async deleteAllPosts(userID) {
        return await api.delete(`/api/v1/post/delete-all/author/${userID}`);
    }
}

export default new PostService();
