let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");
// get user's progress at current course
router.get('/', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    // get user's courses
    const courses = await knex("users_languages")
      .join("languages as study_lang", "study_lang.language_id", "users_languages.language_id")
      .join("languages as trans_lang", "trans_lang.language_id", "users_languages.translation_language_id")
      .where("users_languages.user_id", userId)
      .select(
        "users_languages.user_language_id as course",
        "study_lang.name as studyLanguage",
        "users_languages.user_id",
        "users_languages.translation_language_id",
        "trans_lang.name as translationLanguage",
        "users_languages.last_category_id",
      );
    // get progress per course
    const progress = await knex("progress")
      .select(
        "user_language_id",
        knex.raw("COALESCE(SUM(score), 0) as totalScore") // total points per course
      )
      .groupBy("user_language_id");
    // convert array to map for fast lookup (O(1))
    const progressMap = Object.fromEntries(
      progress.map(p => [
        Number(p.user_language_id), // normalize key to number
        Number(p.totalscore)] // normalize value to number
      )
    );
    // merge progress into courses
    const result = courses.map(course => ({
      ...course,
      totalScore: progressMap[course.course] || 0 // if course has no progress, default 0
    }));
    // return final API response for frontend
    res.json(result);

  } catch (error) {
    console.error("Error fetching user's progress:", error);
    res.status(500).json({ error: error.message });
  }
}); 

// insert progress
router.post('/course/:courseId/category/:categoryId/exercise/:exerciseId', async (req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId, categoryId, exerciseId } = req.params;
    // 1. validation
    if (!courseId || !categoryId || !exerciseId) {
      return res.status(400).json({
        error: "Language and exercise are required"
      })
    }
    // 2. prevent duplicates
    const existing = await knex('progress')
      .where({ 
        user_language_id: courseId,
        category_id: categoryId, 
        exercise_id: exerciseId
      })
      .first();

    if (existing) {
        return res.status(400).json({ error: "Progress for this exercise already exists"});
    } 

    // 3. get exercise score
    const exercise = await knex("exercises")
      .where({ exercise_id: exerciseId })
      .first();

    if (!exercise) {
      return res.status(404).json({
        error: "Exercise not found"
      });
    }
    // 4. insert progress
    await knex("progress").insert({
        user_language_id: courseId,
        category_id: categoryId,
        exercise_id: exerciseId,
        score: exercise.max_score
      })
    // 5. check category completion 
    const totalExercises = await knex("exercises")
      .sum("max_score as total")
      .first();

    const completedExercises = await knex("progress")
      .where({
        user_language_id: courseId,
        category_id: categoryId
      })
      .sum("score as completed")
      .first();

    const total = Number(totalExercises.total);
    const completed = Number(completedExercises.completed);
    // 6. unlock next category
    if (Number(completed) >= Number(total)) {
      const nextCategory = await knex("categories")
        .where("category_id", ">", categoryId)
        .orderBy("category_id")
        .first();
      
      if (nextCategory) {
        await knex("users_languages")
          .where("user_language_id", courseId)
          .update({
            last_category_id: nextCategory.category_id
          });
      }
    }

    return res.status(201).json({ message: "Progress created successfully" });
    
  } catch (error) {
    console.error("Progress error FULL:", error);
  res.status(500).json({ error: error.message });
  }
});

module.exports = router;