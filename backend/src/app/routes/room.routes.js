const express = require("express");
const router = express.Router();

const RoomMiddleware = require("../middleware/room.middleware");
const { userMiddleware } = require("../middleware/user.middleware");
const { roomController } = require("../controllers/room.controller");

router.get("/", (req, res) => {
  res.send({ msg: "Hello from room :D" });
});
router.get("/all-rooms", roomController.getAllRooms);
router.get(
  "/all-rooms/user/:userID",
  userMiddleware.validateUserById,
  roomController.getRoomsByParticipant,
);
router.get(
  "/:roomID",
  RoomMiddleware.validateRoomID,
  roomController.getRoomByID,
);

router.post(
  "/create-room",
  RoomMiddleware.validateNameOfRoom,
  roomController.createRoom,
);
router.post(
  "/join-room/:roomID/user/:userID",
  RoomMiddleware.validateRoomID,
  RoomMiddleware.validateIsParticipant,
  userMiddleware.validateUserById,
  roomController.joinRoom,
);

// router.put(
//   "/add-participant/:roomID/user/:userID",
//   RoomMiddleware.validateRoomID,
//   RoomMiddleware.validateJoinedRoom,
//   RoomMiddleware.validateIsParticipant,
//   userMiddleware.validateUserById,
//   roomController.addParticipant,
// );

router.delete(
  "/:roomID/remove-user/:userID",
  RoomMiddleware.validateRoomID,
  RoomMiddleware.validateJoinedRoom,
  RoomMiddleware.validateParticipantID,
  userMiddleware.validateUserById,
  roomController.removeParticipant,
);
router.delete(
  "/delete/:roomID",
  RoomMiddleware.validateRoomID,
  roomController.deleteRoom,
);
router.delete("/delete-all", roomController.deleteAllRooms);

module.exports = router;
