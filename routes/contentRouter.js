let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");

router.get('/words/:languageId/:categoryId', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { languageId, categoryId } = req.params;

    const words = await knex("content")
      .join("content_translations", "content_translations.content_id", "content.content_id")
      .select(
        "content.content_id",
        "content.image_path",
        "content.category_id",
        "content_translations.value",
        "content_translations.sound_path",
        "content_translations.sound_path"
      )
      .where("content.type", "word")
      .where("content.category_id", categoryId)
      .where("content_translations.language_id", languageId );
      
    res.json(words);
  } catch (error) {
    console.error("Error fetching user's courses:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;