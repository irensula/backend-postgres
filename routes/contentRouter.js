let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");

router.get('/words', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const words = await knex("content")
      .select("*").where("type", "word");
    res.json(words);
  } catch (error) {
    console.error("Error fetching user's courses:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;