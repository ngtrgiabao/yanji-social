const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ msg: "Hello from contact :D" });
});

module.exports = router;
