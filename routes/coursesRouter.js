let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");

router.get('/', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const courses = await knex("users_languages")
      .where({ user_id: userId })
      .select("*");
    res.json(courses);
  } catch (error) {
    console.error("Error fetching user's courses:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { language_id, translation_language_id } = req.body;
    
    if (!language_id || !translation_language_id) {
      return res.status(400).json({
        error: "Missing language selection"
    })
  }

    if (language_id === translation_language_id) {
      return res.status(400).json({
        error: "Languages must be different"
      });
    }

    const existing = await knex('users_languages')
      .where({ 
        user_id: userId, 
        language_id, 
        translation_language_id
      })
      .first();

    if (existing) {
        return res.status(400).json({ error: "Course already exists"});
    } 

    const course = await knex("users_languages")
      .insert({
        user_id: userId,
        language_id,
        translation_language_id
      })

    return res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
});

module.exports = router;