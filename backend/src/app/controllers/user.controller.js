const mongoose = require("mongoose");
const { PlayFab, PlayFabClient } = require("playfab-sdk");
require("dotenv").config();

const UserModel = require("../models/user.model");

const registerTheColorsAccount = (username, email, pw) => {
    PlayFab.settings.developerSecretKey =
        process.env.PlayFabSettingsDeveloperSecretKey;
    PlayFab.settings.titleId = process.env.PlayFabSettingsTitleId;

    const registerRequest = {
        Email: email,
        Password: pw,
        Username: username,
    };

    PlayFabClient.RegisterPlayFabUser(registerRequest, (response, error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("User registered successfully:", response);
        }
    });
};

const register = (req, res, next) => {
    const { username, password, email } = req.body;

    registerTheColorsAccount(username, email, password);

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
        const { username } = req.query;
        // Split the username into an array of words
        const words = username
            .split(/\s+/)
            .filter((word) => word.trim() !== "");

        // Create an array of regular expressions to match each word
        const regexQueries = words.map((word) => new RegExp(word, "i"));

        // Use the $or operator to match any of the regular expressions
        const users = await UserModel.find({
            $or: [
                { username: { $in: words } }, // Match exact words
                { username: { $in: regexQueries } }, // Match partial words using regular expressions
            ],
        });

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

const validateSocialLink = (link, fieldName) => {
    if (link && link.length > 100) {
        return {
            isValid: false,
            error: `Link for ${fieldName} cannot be longer than 100 characters`,
        };
    } else {
        if (link && link.length === 0) {
            return { isValid: true, value: "" };
        }

        return { isValid: true, value: link };
    }
};

const updateUser = async (req, res, next) => {
    const userID = req.params.userID;
    try {
        const {
            username,
            password,
            email,
            profilePicture,
            coverPicture,
            bio,
            firstName,
            lastName,
            photos,
            friends,
            followers,
            followings,
            friendRequests,
            postSaved,
            isVerify,
            // Social links
            insta,
            linkedin,
            github,
            pinterest,
            youtube,
            twitter,
            twitch,
        } = req.body;
        const user = await UserModel.findById(userID);

        user.username = username || user.username;
        user.password = password || user.password;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;
        user.coverPicture = coverPicture || user.coverPicture;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.isVerify = isVerify || user.isVerify;

        if (
            insta ||
            linkedin ||
            github ||
            pinterest ||
            youtube ||
            twitter ||
            twitch
        ) {
            const socialLinks = {
                insta: validateSocialLink(insta, "Instagram"),
                linkedin: validateSocialLink(linkedin, "LinkedIn"),
                github: validateSocialLink(github, "GitHub"),
                pinterest: validateSocialLink(pinterest, "Pinterest"),
                youtube: validateSocialLink(youtube, "YouTube"),
                twitter: validateSocialLink(twitter, "Twitter"),
                twitch: validateSocialLink(twitch, "Twitch"),
            };

            Object.keys(socialLinks).forEach((key) => {
                const { isValid, value, error } = socialLinks[key];
                if (!isValid) {
                    return res.status(500).json({ msg: error });
                }

                // if new username of social link is flank will set to empty string
                if (value.length === 0) {
                    user[key] = "";
                } else {
                    user[key] = value || user[key];
                }
            });
        }

        if (bio?.length > 50) {
            return res.status(500).json({
                msg: `The bio cannot be longer than 50 characters`,
            });
        } else {
            if (bio?.length === 0) {
                user.bio = "";
            } else {
                user.bio = bio || user.bio;
            }
        }

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

        if (Array.isArray(friends)) {
            const existingFriends = user.friends || [];
            const newFriends = friends.filter(
                (friend) => !existingFriends.includes(friend)
            );
            user.friends = [...existingFriends, ...newFriends].map((id) =>
                mongoose.Types.ObjectId(id)
            );

            // If approver accept friend, then remove user who request to become friend from friendRequest list
            user.friendRequests = user.friendRequests.filter(
                (friendRequest) => {
                    return !user.friends.some(
                        (friend) =>
                            friendRequest.toString() === friend.toString()
                    );
                }
            );
        }

        if (Array.isArray(followings)) {
            const existingFollowings = user.followings || [];
            const newFollowing = followings.filter(
                (follower) => !existingFollowings.includes(follower)
            );
            user.followings = [...existingFollowings, ...newFollowing].map(
                (id) => mongoose.Types.ObjectId(id)
            );
        }

        if (Array.isArray(followers)) {
            const existingFollowers = user.followers || [];
            const newFollowers = followers.filter(
                (follower) => !existingFollowers.includes(follower)
            );
            user.followers = [
                ...existingFollowers,
                ...newFollowers.map((id) => mongoose.Types.ObjectId(id)),
            ];
        }

        if (postSaved) {
            const existingPostSaved = user.postSaved.find(
                (post) => post.postID === postSaved.postID
            );

            if (!existingPostSaved) {
                user.postSaved.push(postSaved);
            } else {
                user.postSaved.pull(existingPostSaved._id);
            }
        }

        if (Array.isArray(friendRequests)) {
            const existingFriendRequests = user.friendRequests || [];
            const newFriendRequests = friendRequests.filter(
                (user) => !existingFriendRequests.includes(user)
            );

            user.friendRequests = [
                ...existingFriendRequests,
                ...newFriendRequests.map((id) => mongoose.Types.ObjectId(id)),
            ];
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

const followUser = async (req, res, next) => {
    const userID = req.params.userID;
    const user = await UserModel.findById(userID);
    const { newFollower } = req.body;
    const infoNewFollower = await UserModel.findById(newFollower);

    try {
        if (
            !infoNewFollower.followings.includes(userID) &&
            !user.followers.includes(newFollower)
        ) {
            const updatedUserWhoSentRequest = await UserModel.findOneAndUpdate(
                {
                    _id: newFollower,
                },
                {
                    $push: {
                        followings: userID,
                    },
                },
                {
                    new: true,
                }
            );

            const updatedUserWhoAcceptRequest =
                await UserModel.findOneAndUpdate(
                    {
                        _id: userID,
                    },
                    {
                        $push: {
                            followers: newFollower,
                        },
                    },
                    {
                        new: true,
                    }
                );

            return res.status(200).json({
                msg: "Added new follower",
                data: {
                    userRequest: updatedUserWhoSentRequest,
                    userAccept: updatedUserWhoAcceptRequest,
                },
            });
        } else {
            const updatedUserWhoSentRequest = await UserModel.findOneAndUpdate(
                {
                    _id: newFollower,
                },
                {
                    $pull: {
                        followings: userID,
                    },
                },
                {
                    new: true,
                }
            );

            const updatedUserWhoAcceptRequest =
                await UserModel.findOneAndUpdate(
                    {
                        _id: userID,
                    },
                    {
                        $pull: {
                            followers: newFollower,
                        },
                    },
                    {
                        new: true,
                    }
                );

            return res.status(200).json({
                msg: "Removed follower",
                data: {
                    userRequest: updatedUserWhoSentRequest,
                    userAccept: updatedUserWhoAcceptRequest,
                },
            });
        }
    } catch (error) {
        console.error("Failed to sent follow", error);

        return res.status(500).json({
            msg: "Failed to sent follow",
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
    } catch (error) {
        return res.status(500).json({
            msg: `Failed to delete user ${userID}`,
        });
    }
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

const getPostsShared = async (req, res) => {
    const userID = req.params.userID;

    try {
        const user = await UserModel.findById(userID);

        const postShared = user.postShared.sort(
            (a, b) => b.createdAt - a.createdAt
        );

        return res.status(200).json({
            msg: "Get posts shared successfully",
            postShared,
        });
    } catch (error) {
        console.error(`Error retrieving posts shared: ${error}`);
        return res.status(500).json({
            msg: `Error retrieving posts shared: ${error}`,
        });
    }
};

const getPostsSaved = async (req, res) => {
    const userID = req.params.userID;

    try {
        const user = await UserModel.findById(userID);

        const postSaved = user.postSaved.sort(
            (a, b) => b.createdAt - a.createdAt
        );

        return res.status(200).json({
            msg: "Get posts saved successfully",
            postSaved,
        });
    } catch (error) {
        console.error(`Error retrieving posts saved: ${error}`);
        return res.status(500).json({
            msg: `Error retrieving posts saved: ${error}`,
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
    getPostsShared,
    getPostsSaved,
    followUser,
};
