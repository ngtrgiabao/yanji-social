const RoomModel = require("../models/room.model");

const createRoom = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userID = req.params.userID;

        RoomModel.create({
            name,
            participants: userID,
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
                    data,
                });
            })
            .catch((err) => {
                console.error(`Failed to create chat room ${name}`);
                return res.status(500).json({
                    msg: `Failed to create chat room ${name}`,
                    err,
                });
            });
    } catch (error) {
        console.error("Failed to create room", error);
        return res.status(500).json({
            msg: "Failed to create room",
        });
    }
};

const getRoomByID = async (req, res, next) => {
    const roomID = await RoomModel.findById(req.params.roomID);

    return res.status(200).json({
        msg: roomID,
    });
};

const getRoomsByParticipant = async (req, res, next) => {
    const participantID = req.params.userID;
    const rooms = await RoomModel.find({
        participants: participantID,
    });
    const roomsLength = rooms.length;
    const roomIDs = rooms.map((room) => room._id);

    return res.status(200).json({
        msg: `Get rooms of participants ${participantID} success`,
        numsRoomsHasJoined: roomsLength,
        roomIDs,
    });
};

const joinRoom = async (req, res, next) => {
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

const updateRoom = async (req, res, next) => {
    try {
        const roomID = req.params.roomID;
        const { name, participants, settings } = req.body;
        const room = await RoomModel.findById(roomID);

        if (room.isAdmin !== true) {
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

const deleteRoom = async (req, res, next) => {
    try {
        const roomID = req.params.roomID;
        await RoomModel.findByIdAndDelete(roomID);

        return res.status(200).json({
            msg: `Deleted chat room ${roomID} success`,
        });
    } catch (error) {
        console.error("Failed to delete room", error);
        return res.status(500).json({
            msg: "Failed to delete room",
        });
    }
};

const deleteAllRooms = async (req, res, next) => {
    const userID = req.params.userID;

    try {
        const result = await RoomModel.deleteMany({});

        return res.status(200).json({
            msg: `Delete all chat room of user: ${userID} success`,
            count: result.deletedCount,
        });
    } catch (error) {
        console.error(
            `An error occurred while deleting all chat rooms of user: ${userID}`,
            error
        );
        return res.status(500).json({
            msg: `An error occurred while deleting all chat rooms of user: ${userID}`,
        });
    }
};

const addParticipant = async (req, res, next) => {
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

const removeParticipant = async (req, res, next) => {
    const roomID = req.params.roomID;
    const participantID = req.params.userID;
    const room = await RoomModel.findById(roomID);

    if (room.isAdmin !== true) {
        console.error("You don't have permission to remove participant");
        return res.status(403).json({
            message: "You don't have permission to remove participant",
        });
    }

    try {
        await RoomModel.findByIdAndUpdate(
            roomID,
            { $pull: { participants: participantID } },
            { new: true }
        );

        return res.status(200).json({
            msg: `Removed participant ${participantID} success`,
        });
    } catch (error) {
        console.error("Failed to remove participant:", error);
        return res.status(500).json({
            msg: "Failed to remove participant",
        });
    }
};

module.exports = {
    createRoom,
    getRoomByID,
    getRoomsByParticipant,
    joinRoom,
    updateRoom,
    deleteRoom,
    deleteAllRooms,
    addParticipant,
    removeParticipant,
};