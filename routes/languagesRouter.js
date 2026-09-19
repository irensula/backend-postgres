let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);

router.get('/', async(req, res) => {
  try {
    const languages = await knex("languages")
      .select("*");
    res.json(languages);
  } catch (error) {
    console.error("Error fetching user's courses:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;