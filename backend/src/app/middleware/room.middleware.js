const Room = require("../models/room.model");

const validateRoomID = async (req, res, next) => {
  try {
    const roomID = req.params.roomID;
    const room = await Room.findById(roomID);

    if (!room) {
      console.error("Room not found!");
      return res.status(404).json({
        msg: "Room not found!",
      });
    }

    next();
  } catch (error) {
    console.error("Failed to validate room ID", error);
    return res.status(500).json({
      msg: "Failed to validate room ID",
    });
  }
};

const validateNameOfRoom = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      console.error("Name of room can't be empty");
      return res.status(401).json({
        msg: "Name of room can't be empty",
      });
    }

    next();
  } catch (error) {
    console.error("Failed to validate name of room", error);
    return res.status(500).json({
      msg: "Failed to validate name of room",
    });
  }
};

const validateParticipantID = async (req, res, next) => {
  try {
    const participantID = req.params.userID;
    const participant = await Room.find({
      participants: participantID,
    });

    if (!participant) {
      console.error("Invalid participant ID");
      return res.status(404).json({
        msg: "Invalid participant ID",
      });
    }

    next();
  } catch (error) {
    console.error("Failed to validate participant ID", error);
    return res.status(500).json({
      msg: "Failed to validate participant ID",
    });
  }
};

const validateJoinedRoom = async (req, res, next) => {
  const participantID = req.params.userID;

  try {
    const rooms = await Room.find({
      participants: participantID,
    });

    if (!rooms) {
      console.error(`Participant ${participantID} doesn't join any room`);
      return res.status(404).json({
        msg: `Participant ${participantID} doesn't join any room`,
      });
    }

    next();
  } catch (error) {
    console.error("Failed to get rooms of participant:", error);
    return res.status(500).json({
      msg: `Failed to get rooms of participant: ${participantID}`,
    });
  }
};

const validateIsParticipant = async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const roomID = req.params.roomID;
    const room = await Room.findById(roomID);

    if (!room) {
      console.error(`Room ${roomID} not found!`);
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if the user is already a participant in the room
    if (room.participants.includes(userID)) {
      console.error(`User is already a participant in the room`);
      return res
        .status(409)
        .json({ message: "User is already a participant in the room" });
    }

    next();
  } catch (error) {
    console.error(`Failed to validate user ${userID}`);
    return res.status(500).json({
      msg: "Failed to validate is participant",
    });
  }
};

module.exports = {
  validateRoomID,
  validateParticipantID,
  validateJoinedRoom,
  validateNameOfRoom,
  validateIsParticipant,
};
