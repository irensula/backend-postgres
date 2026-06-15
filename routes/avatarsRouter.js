const express = require("express");
const router = express.Router();
const config = require("../utils/config");
const knex = require('../knex');

router.get("/", async (req, res) => {
  try {
    const avatars = await knex("avatars").select("*");
    res.json(avatars);
  } catch (error) {
    console.error("Error fetching avatars:", error);
    res.status(500).json({ error: "Failed to load avatars" });
  }
});

module.exports = router;