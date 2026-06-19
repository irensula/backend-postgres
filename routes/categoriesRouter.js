let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");

router.get('/', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
   
    const categories = await knex("categories")
      .select("category_id", "name", "image_path");
      res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;