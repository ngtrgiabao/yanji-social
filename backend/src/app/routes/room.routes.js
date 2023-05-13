const express = require("express");
const router = express.Router();

const RoomMiddleware = require("../middleware/room.middleware");
const UserMiddleware = require("../middleware/user.middleware");
const RoomController = require("../controllers/room.controller");

router.get("/", (req, res) => {
    res.send({ msg: "Hello from room :D" });
});
router.get(
    "/all-rooms/user/:userID",
    RoomMiddleware.validateJoinedRoom,
    RoomMiddleware.validateParticipantID,
    UserMiddleware.validateUserById,
    RoomController.getRoomsByParticipant
);
router.get(
    "/:roomID",
    RoomMiddleware.validateRoomID,
    RoomController.getRoomByID
);

router.post(
    "/create-room/user/:userID",
    RoomMiddleware.validateNameOfRoom,
    RoomController.createRoom
);
router.post(
    "/join-room/:roomID/user/:userID",
    RoomMiddleware.validateRoomID,
    RoomMiddleware.validateIsParticipant,
    UserMiddleware.validateUserById,
    RoomController.joinRoom
);

router.put(
    "/add-participant/:roomID/user/:userID",
    RoomMiddleware.validateRoomID,
    RoomMiddleware.validateJoinedRoom,
    RoomMiddleware.validateIsParticipant,
    UserMiddleware.validateUserById,
    RoomController.addParticipant
);

router.delete(
    "/:roomID/remove-user/:userID",
    RoomMiddleware.validateRoomID,
    RoomMiddleware.validateJoinedRoom,
    RoomMiddleware.validateParticipantID,
    UserMiddleware.validateUserById,
    RoomController.removeParticipant
);
router.delete("/delete-all/user/:userID", RoomController.deleteAllRooms);

module.exports = router;