const express = require("express");
const router = express.Router();

const RoomMiddleware = require("../middleware/room.middleware");
const UserMiddleware = require("../middleware/user.middleware");
const RoomController = require("../controllers/room.controller");

router.get("/", (req, res) => {
    res.send({ msg: "Hello from room :D" });
});
router.get(
    "/list-rooms/:userID",
    RoomMiddleware.validateJoinedRoom,
    RoomMiddleware.validateParticipantID,
    RoomController.getRoomsByParticipant
);
router.get(
    "/:roomID",
    RoomMiddleware.validateRoomID,
    RoomController.getRoomByID
);

router.post("/create-room/:userID", RoomController.createRoom);
router.post(
    "/join-room/:roomID/:userID",
    RoomMiddleware.validateRoomID,
    RoomMiddleware.isParticipant,
    RoomController.joinRoom
);
router.post(
    "/add-participant/:roomID/:userID",
    RoomMiddleware.validateRoomID,
    RoomMiddleware.validateJoinedRoom,
    RoomMiddleware.isParticipant,
    RoomController.addParticipant
);

router.delete(
    "/participant/:userID/:roomID",
    RoomMiddleware.validateRoomID,
    RoomMiddleware.validateJoinedRoom,
    RoomMiddleware.validateParticipantID,
    RoomController.removeParticipant
);
router.delete("/delete-all-rooms/:userID", RoomController.deleteAllRooms);

module.exports = router;
