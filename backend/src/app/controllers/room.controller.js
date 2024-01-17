const RoomModel = require("../models/room.model");

class RoomController {
  createRoom = async (req, res, next) => {
    const { name, sender, receiver } = req.body;

    RoomModel.create({
      name,
      participants: [sender, receiver],
      settings: {
        notification: true,
        sound: true,
        theme: "light",
        private: false,
      },
      isAdmin: true,
    })
      .then((data) => {
        return res.status(200).json({
          msg: `Created chat room ${name} success`,
          data: data,
        });
      })
      .catch((err) => {
        console.error(`Failed to create chat room ${name}`);
        return res.status(500).json({
          msg: `Failed to create chat room ${name}`,
          err,
        });
      });
  };

  getRoomByID = async (req, res, next) => {
    const roomID = req.params.roomID;
    const room = await RoomModel.findById(roomID);

    return res.status(200).json({
      data: room,
    });
  };

  getAllRooms = async (req, res, next) => {
    try {
      const rooms = await RoomModel.find({});

      return res.status(200).json({
        msg: "Get all rooms successfully",
        data: rooms,
      });
    } catch (error) {
      console.error("Failed to get all rooms");
      return res.status(500).json({
        msg: "Failed to get all rooms",
      });
    }
  };

  getRoomsByParticipant = async (req, res, next) => {
    const participantID = req.params.userID;
    const rooms = await RoomModel.find({
      participants: {
        $in: [participantID],
      },
    });
    const roomsLength = rooms.length;
    const roomIDs = rooms.map((room) => room._id);

    return res.status(200).json({
      msg: `Get rooms of participants ${participantID} success`,
      numsRoomsHasJoined: roomsLength,
      roomIDs,
      rooms,
    });
  };

  joinRoom = async (req, res, next) => {
    const roomID = req.params.roomID;
    const userID = req.params.userID;

    try {
      const room = await RoomModel.findById(roomID);

      room.participants.push(userID); // Add the user to the participants array
      room.isAdmin = false;
      await room.save();

      res.status(200).json({
        message: `User ${userID} joined the room ${roomID} successfully`,
        roomAfterJoined: room,
      });
    } catch (error) {
      console.error("Error while joining the room:", error);
      res.status(500).json({ message: "Error while joining the room" });
    }
  };

  updateRoom = async (req, res, next) => {
    try {
      const roomID = req.params.roomID;
      const { name, participants, settings } = req.body;
      const room = await RoomModel.findById(roomID);

      if (!room.isAdmin) {
        console.error("You don't have permission to update room");
        return res
          .status(403)
          .json({ message: "You don't have permission to update room" });
      }

      room.name = name || room.name;
      room.participants = participants || room.participants;
      room.settings = {
        ...room.settings,
        ...settings,
      };

      const updatedRoom = await room.save();

      return res.status(200).json({
        msg: "Room updated",
        data: updatedRoom,
      });
    } catch (error) {
      console.error("Failed to update room", error);
      return res.status(500).json({
        msg: "Failed to update room",
      });
    }
  };

  deleteRoom = async (req, res, next) => {
    const roomID = req.params.roomID;
    try {
      await RoomModel.findByIdAndDelete(roomID);

      return res.status(200).json({
        msg: `Deleted chat room ${roomID} successfully`,
      });
    } catch (error) {
      console.error(`Failed to delete room ${roomID}`, error);
      return res.status(500).json({
        msg: "Failed to delete room",
      });
    }
  };

  deleteAllRooms = async (req, res, next) => {
    const userID = req.params.userID;

    try {
      const result = await RoomModel.deleteMany({});

      return res.status(200).json({
        msg: `Deleted all chat rooms of user: ${userID} successfully`,
        count: result.deletedCount,
      });
    } catch (error) {
      console.error(
        `An error occurred while deleting all chat rooms of user: ${userID}`,
        error,
      );
      return res.status(500).json({
        msg: `An error occurred while deleting all chat rooms of user: ${userID}`,
      });
    }
  };

  addParticipant = async (req, res, next) => {
    const roomID = req.params.roomID;
    const userID = req.params.userID;

    try {
      // Find the room by its ID and update the participants array
      const room = await RoomModel.findById(roomID);
      room.participants.push(userID);
      await room.save();

      return res.status(200).json({
        msg: `Participant ${userID} added successfully`,
        room,
      });
    } catch (error) {
      console.error("Failed to add participant:", error);
      res.status(500).json({ message: "Failed to add participant" });
    }
  };

  removeParticipant = async (req, res, next) => {
    const roomID = req.params.roomID;
    const participantID = req.params.userID;
    const room = await RoomModel.findById(roomID);

    // if (room.isAdmin !== true) {
    //   console.error("You don't have permission to remove participant");
    //   return res.status(403).json({
    //     message: "You don't have permission to remove participant",
    //   });
    // }

    try {
      await RoomModel.findByIdAndUpdate(
        roomID,
        { $pull: { participants: participantID } },
        { new: true },
      );

      return res.status(200).json({
        msg: `Removed participant ${participantID} success`,
      });
    } catch (error) {
      console.error("Failed to remove participant:", error);
      return res.status(500).json({
        msg: "Failed to remove participant successfully",
      });
    }
  };
}

const roomController = new RoomController();

module.exports = {
  roomController,
};
