const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "kaas" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
