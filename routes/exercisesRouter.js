const express = require("express");
const router = express.Router();
const knex = require('../knex');

router.get("/", async (req, res) => {
  try {
    const exercises = await knex("exercises")
        .join('exercise_translations', 'exercise_translations.exercise_id', 'exercises.exercise_id')
        .join('languages', 'languages.language_id', 'exercise_translations.language_id')
        .select(
            'exercises.*',
            'languages.name as language',
            'exercise_translations.name as translation',
            'exercise_translations.description as description',
        );

    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ error: "Failed to load exercises" });
  }
});

module.exports = router;