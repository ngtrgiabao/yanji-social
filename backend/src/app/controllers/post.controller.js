const PostModel = require("../models/post.model");

//TODO ADD SHARE AND COMMENT

const uploadPost = async (req, res) => {
    try {
        const { userID, desc, img } = req.body;
        const newPost = await PostModel.create({
            userID,
            desc,
            img,
        });

        return res.status(200).json({
            msg: `Post upload successfully`,
            data: newPost,
        });
    } catch (error) {
        console.error("Failed to upload post", error);
        return res.status(500).json({
            msg: "Failed to upload post",
            error,
        });
    }
};

const deletePost = async (req, res) => {
    const postID = req.params.postID;

    await PostModel.findByIdAndDelete(postID);

    return res.status(200).json({
        msg: "Deleted post successfully",
    });
};

const getAllPostsByUser = async (req, res) => {
    const userID = req.params.userID;

    try {
        const posts = await PostModel.find({
            userID,
        });

        return res.status(200).json({
            msg: "Get all posts successfully",
            posts,
        });
    } catch (error) {
        console.error(`Error retrieving posts of user ${userID}: ${error}`);

        return res.status(500).json({
            msg: `Error retrieving posts of user ${userID}: ${error}`,
        });
    }
};

const deleteAllPostsByUser = async (req, res) => {
    const userID = req.params.userID;

    try {
        const length = await PostModel.countDocuments();

        if (length <= 0) {
            console.error("Nothing to delete");

            return res.status(400).json({
                msg: "Nothing to delete",
            });
        }

        const result = await PostModel.deleteMany({ userID });

        return res.status(200).json({
            msg: `Delete all posts of user: ${userID} success`,
            count: result.deletedCount,
        });
    } catch (error) {
        console.error(
            `An error occurred while deleting all posts of user: ${userID}`,
            error
        );
        return res.status(500).json({
            msg: `An error occurred while deleting all posts of user: ${userID}`,
        });
    }
};

const getPostByID = async (req, res) => {
    const postID = req.params.postID;

    try {
        const result = await PostModel.findById(postID);

        return res.status(200).json({
            msg: `Get post ${postID} successfully`,
            data: result,
        });
    } catch (error) {
        console.error(`Failed to get post ${postID}`);

        return res.status(500).json({
            msg: `Failed to get post ${postID}`,
        });
    }
};

const updatePost = async (req, res) => {
    const postID = req.params.postID;

    try {
        const { desc, img, userID } = req.body;
        const post = await PostModel.findById(postID);

        if (userID) {
            console.error("You can't change userID of this post!");

            return res.status(404).json({
                msg: "You can't change userID of this post!",
            });
        }

        if ((desc && desc.length > 0) || img) {
            post.desc = desc || post.desc;
            post.img = img || post.img;

            const updatedPost = await post.save();

            return res.status(200).json({
                msg: "Updated post successfully",
                data: updatedPost,
            });
        }

        return res.status(200).json({
            msg: "Saved post",
        });
    } catch (error) {
        console.error("Failed to update post", error);
        return res.status(500).json({
            msg: "Failed to update post",
        });
    }
};

const likePost = async (req, res) => {
    const postID = req.params.postID;

    try {
        const { userID } = req.body;
        const post = await PostModel.findById(postID);

        if (!post.likes.includes(userID)) {
            const updatedPost = await PostModel.findOneAndUpdate(
                { _id: postID },
                { $push: { likes: userID } },
                { new: true } // Returns the updated post
            );

            return res.status(200).json({
                msg: "The post has been liked",
                data: updatedPost,
            });
        } else {
            const updatedPost = await PostModel.findOneAndUpdate(
                { _id: postID },
                { $pull: { likes: userID } },
                { new: true } // Returns the updated post
            );

            return res.status(200).json({
                msg: "The post has been disliked",
                data: updatedPost,
            });
        }
    } catch (error) {
        console.error(`Failed to action post ${postID}`, error);
        return res.status(500).json({
            msg: `Failed to action post ${postID}`,
            error,
        });
    }
};

const sharePost = async (req, res) => {
    const postID = req.params.postID;

    try {
        const { userID } = req.body;
        const post = await PostModel.findById(postID);

        if (!post.shares.includes(userID)) {
            const updatedPost = await PostModel.findOneAndUpdate(
                { _id: postID },
                { $push: { shares: userID } },
                { new: true } // Returns the updated post
            );

            return res.status(200).json({
                msg: "The post has been shared",
                data: updatedPost,
            });
        } else {
            const updatedPost = await PostModel.findOneAndUpdate(
                { _id: postID },
                { $pull: { shares: userID } },
                { new: true } // Returns the updated post
            );

            return res.status(200).json({
                msg: "The post has been unShared",
                data: updatedPost,
            });
        }
    } catch (error) {
        console.error(`Failed to share post ${postID}`, error);
        return res.status(500).json({
            msg: `Failed to share post ${postID}`,
            error,
        });
    }
};

const commentPost = async (req, res) => {
    const postID = req.params.postID;

    try {
        const { userID, content } = req.body;
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postID },
            { $push: { comments: { userID, content } } },
            { new: true } // Returns the updated post
        );

        return res.status(200).json({
            msg: "The post has been commented",
            data: updatedPost,
        });
    } catch (error) {
        console.error(`Failed to comment post ${postID}`, error);
        return res.status(500).json({
            msg: `Failed to comment post ${postID}`,
            error,
        });
    }
};

module.exports = {
    uploadPost,
    deletePost,
    getAllPostsByUser,
    deleteAllPostsByUser,
    getPostByID,
    updatePost,
    likePost,
    sharePost,
    commentPost,
};
