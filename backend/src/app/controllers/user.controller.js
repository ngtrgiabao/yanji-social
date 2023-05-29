const mongoose = require("mongoose");

const UserModel = require("../models/user.model");

const register = (req, res, next) => {
    const { username, password, email } = req.body;

    UserModel.create({
        username,
        password,
        email,
    })
        .then((data) => {
            return res.status(200).json({
                msg: "Successfully created user",
                data,
            });
        })
        .catch((error) => {
            console.error(`Failed to create user ${username}`, error);
            return res.status(500).json({ msg: "Failed to create user" });
        });
};

const login = (req, res, next) => {
    const { username, password } = req.body;

    UserModel.findOne({ username: username, password: password })
        .then((data) => {
            res.status(200).json({ msg: "Login success", data: data });
        })
        .catch((error) => {
            console.error(`Failed to login`, error);
            res.status(500).json({ msg: "Failed to login" });
        });
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({});

        return res.status(200).json({
            msg: "Get all users successfully",
            users,
        });
    } catch (error) {
        console.error("Failed to get all users");
        return res.status(500).json({
            msg: "Failed to get all users",
        });
    }
};

const getUser = async (req, res, next) => {
    const userID = req.params.userID;
    const user = await UserModel.findById(userID);

    return res.status(200).json({
        msg: "Get user successfully",
        user,
    });
};

const updateUser = async (req, res, next) => {
    const userID = req.params.userID;
    try {
        const {
            username,
            password,
            email,
            profilePicture,
            bio,
            firstName,
            lastName,
            photos,
            friends,
            followers,
            following,
        } = req.body;
        const user = await UserModel.findById(userID);

        user.username = username || user.username;
        user.password = password || user.password;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;
        user.bio = bio || user.bio;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;

        // Update photos if they are new
        if (photos && photos.length > 0) {
            const newPhotos = photos.map((photo) => {
                return {
                    name: photo.name || null,
                };
            });

            const existingPhotoNames = user.photos.map((photo) => photo.name);

            for (const newPhoto of newPhotos) {
                if (!existingPhotoNames.includes(newPhoto.name)) {
                    user.photos.push(newPhoto);
                } else {
                    return res.status(500).json({
                        msg: `Photo with name ${newPhoto.name} already exists.`,
                    });
                }
            }
        }

        if (Array.isArray(followers)) {
            const existingFollowers = user.followers || [];
            const newFollowers = followers.filter(
                (follower) => !existingFollowers.includes(follower)
            );
            user.followers = [...existingFollowers, ...newFollowers].map((id) =>
                mongoose.Types.ObjectId(id)
            );
        }

        if (Array.isArray(friends)) {
            const existingFriends = user.friends || [];
            const newFriends = friends.filter(
                (friend) => !existingFriends.includes(friend)
            );

            user.friends = [...existingFriends, ...newFriends].map((id) =>
                mongoose.Types.ObjectId(id)
            );
        }

        if (Array.isArray(following)) {
            const existingFollowing = user.followings || [];
            const newFollowing = following.filter(
                (follow) => !existingFollowing.includes(follow)
            );
            user.followings = [...existingFollowing, ...newFollowing].map(
                (id) => mongoose.Types.ObjectId(id)
            );
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            msg: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(`Failed to updated user ${userID}`, error);
        return res.status(500).json({
            msg: "Failed to update user",
        });
    }
};

const deleteUser = async (req, res, next) => {
    const userID = req.params.userID;
    try {
        await UserModel.findByIdAndDelete(userID);

        return res.status(200).json({
            msg: `Deleted user ${userID} successfully`,
        });
    } catch (error) {}
};

const deleteAllUsers = async (req, res, next) => {
    try {
        const result = await UserModel.deleteMany({});

        return res.status(200).json({
            msg: "Deleted all users successfully",
            count: result.deletedCount,
        });
    } catch (error) {
        console.error("An error occured while deleting all users");
        return res.status(500).json({
            msg: "An error occured while deleting all users",
        });
    }
};

module.exports = {
    register,
    login,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    deleteAllUsers,
};
