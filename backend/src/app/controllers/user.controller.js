const mongoose = require("mongoose");
require("dotenv").config();

const UserModel = require("../models/user.model");
const verifyOTP = require("../utils/sendOtp");
const { userService } = require("../services/user.service");
const hashedUtil = require("../utils/hashed.util");

class UserController {
  register = async (req, res, next) => {
    const { username, password, email } = req.body;

    verifyOTP.withEmail(email).then(async (code) => {
      const data = await userService.createUser(
        username,
        password,
        email,
        code.otpCode,
      );

      return res.status(200).json({
        msg: "Successfully created user",
        data: data,
        otpCode: code.otpCode,
      });
    });
  };

  login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userService.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    const validPassword = await userService.checkPassword(user, password);

    if (!validPassword) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      msg: "Login success",
      data: user,
    });
  };

  getByUsername = async (req, res, next) => {
    const { username } = req.params;
    const user = await userService.findUserByUsername(username);

    if (user) {
      return res.status(200).json({
        msg: "Username already exists",
        isExist: true,
      });
    }

    return res.status(200).json({
      msg: "Username available",
      isExist: false,
    });
  };

  getAllUsersByUsername = async (req, res, next) => {
    try {
      const { username, limit, skip } = req.query;

      if (limit || skip) {
        const users =
          limit || skip
            ? await UserModel.find({})
              .sort({ createdAt: -1 })
              .limit(limit)
              .skip(skip)
            : await UserModel.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
          msg: "Get all users successfully",
          users,
        });
      }

      if (username) {
        // Split the username into an array of words
        const words = username.split(/\s+/).filter((word) => word.trim() !== "");

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
      }

      const users = await UserModel.find({});
      return res.status(200).json({
        msg: "Get all users successfully",
        users,
      });
    } catch (error) {
      console.error("[GET_ALL_USERS_BY_USERNAME]", error);
      return res.status(500).json({
        msg: "[GET_ALL_USERS_BY_USERNAME]",
        error,
      });
    }
  };

  getUser = async (req, res, next) => {
    const userID = req.params.userID;
    const user = await UserModel.findById(userID);

    return res.status(200).json({
      msg: "Get user successfully",
      user,
    });
  };

  validateSocialLink = (link, fieldName) => {
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

  updateUser = async (req, res, next) => {
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
        isVerifyEmail,
        borderAvatar,
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
      user.password =
        (password && (await hashedUtil.saltHash(password))) || user.password;
      user.email = email || user.email;
      user.profilePicture = profilePicture || user.profilePicture;
      user.coverPicture = coverPicture || user.coverPicture;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.isVerify = isVerify || false;
      user.isVerifyEmail = isVerifyEmail;
      user.borderAvatar = borderAvatar || user.borderAvatar;

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
          insta: this.validateSocialLink(insta, "Instagram"),
          linkedin: this.validateSocialLink(linkedin, "LinkedIn"),
          github: this.validateSocialLink(github, "GitHub"),
          pinterest: this.validateSocialLink(pinterest, "Pinterest"),
          youtube: this.validateSocialLink(youtube, "YouTube"),
          twitter: this.validateSocialLink(twitter, "Twitter"),
          twitch: this.validateSocialLink(twitch, "Twitch"),
        };

        Object.keys(socialLinks).forEach((key) => {
          const { isValid, value, error } = socialLinks[key];
          if (!isValid) {
            return res.status(500).json({ msg: error });
          }

          // if new username of social link is flank will set to empty string
          if (value?.length === 0) {
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
          (friend) => !existingFriends.includes(friend),
        );
        user.friends = [...existingFriends, ...newFriends].map((id) =>
          mongoose.Types.ObjectId(id),
        );

        // If approver accept friend, then remove user who request to become friend from friendRequest list
        user.friendRequests = user.friendRequests.filter((friendRequest) => {
          return !user.friends.some(
            (friend) => friendRequest.toString() === friend.toString(),
          );
        });
      }

      if (Array.isArray(followings)) {
        const existingFollowings = user.followings || [];
        const newFollowing = followings.filter(
          (follower) => !existingFollowings.includes(follower),
        );
        user.followings = [...existingFollowings, ...newFollowing].map((id) =>
          mongoose.Types.ObjectId(id),
        );
      }

      if (Array.isArray(followers)) {
        const existingFollowers = user.followers || [];
        const newFollowers = followers.filter(
          (follower) => !existingFollowers.includes(follower),
        );
        user.followers = [
          ...existingFollowers,
          ...newFollowers.map((id) => mongoose.Types.ObjectId(id)),
        ];
      }

      if (postSaved) {
        const existingPostSaved = user.postSaved.find(
          (post) => post.postID === postSaved.postID,
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
          (user) => !existingFriendRequests.includes(user),
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

  followUser = async (req, res, next) => {
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
          },
        );

        const updatedUserWhoAcceptRequest = await UserModel.findOneAndUpdate(
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
          },
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
          },
        );

        const updatedUserWhoAcceptRequest = await UserModel.findOneAndUpdate(
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
          },
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

  deleteUser = async (req, res, next) => {
    const userID = req.params.userID;
    try {
      await UserModel.findByIdAndDelete(userID);

      return res.status(200).json({
        msg: `Deleted user ${userID} successfully`,
      });
    } catch (error) {
      console.log("[DELETE_USER]", error)
      return res.status(500).json({
        msg: `Failed to delete user ${userID}`,
      });
    }
  };

  deleteAllUsers = async (req, res, next) => {
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

  getPostsShared = async (req, res) => {
    const userID = req.params.userID;

    try {
      const user = await UserModel.findById(userID);

      const postShared = user.postShared.sort(
        (a, b) => b.createdAt - a.createdAt,
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

  getPostsSaved = async (req, res) => {
    const userID = req.params.userID;

    try {
      const user = await UserModel.findById(userID);

      const postSaved = user.postSaved.sort(
        (a, b) => b.createdAt - a.createdAt,
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
}

const userController = new UserController();

module.exports = {
  userController,
};
