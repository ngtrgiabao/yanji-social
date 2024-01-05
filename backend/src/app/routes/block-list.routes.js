const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ msg: "Hello from block list :D" });
});

module.exports = router;
