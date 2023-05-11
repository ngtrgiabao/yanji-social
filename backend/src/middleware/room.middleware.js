const { ObjectId } = require("mongodb");
const Room = require("../models/room.model");

const validateRoomID = async (req, res, next) => {
    try {
        const roomID = req.params.roomID;

        const room = Room.findById(ObjectId(roomID));

        if (!room) {
            console.error("Invalid Room ID");
            return res.status(404).json({
                msg: "Invalid Room ID",
            });
        }

        next();
    } catch (error) {
        console.error("Failed to get validate room ID", error);
        return res.status(500).json({
            msg: "Failed to get validate room ID",
        });
    }
};

const validateParticipantID = async (req, res, next) => {
    try {
        const participantID = req.params.userID;
        const participant = Room.findById({
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
    try {
        const participantID = req.params.userID;
        const rooms = Room.findById({
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
            msg: "Failed to get rooms of participant:",
        });
    }
};

const isParticipant = async (req, res, next) => {
    const roomID = req.params.roomID;
    const userID = req.params.userID;
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
};

module.exports = {
    validateRoomID,
    validateParticipantID,
    validateJoinedRoom,
    isParticipant,
};
