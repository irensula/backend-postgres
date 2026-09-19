const express = require("express");
const router = express.Router();
const knex = require('../knex');

router.get("/", async (req, res) => {
  try {
    const sentences = await knex("content")
        .join('content_translations', 'content.content_id', 'content_translations.content_id')
        .join('categories', 'categories.category_id', 'content.category_id')
        .join('languages', 'languages.language_id', 'content_translations.language_id')
        .select(
            'content.*',
            'categories.slug as category',
            'languages.name as language',
            'content_translations.value',
            'content_translations.answer_value',
            'content_translations.sound_path'
        )
        .where('type', 'sentence');
    res.json(sentences);
  } catch (error) {
    console.error("Error fetching sentences:", error);
    res.status(500).json({ error: "Failed to load sentences" });
  }
});

module.exports = router;