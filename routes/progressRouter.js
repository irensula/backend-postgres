let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");
// GET USER'S PROGRESS AT CURRENT COURSE
router.get('/', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    // 1. get user's courses
    const courses = await knex("users_languages")
        .join("languages as study_language", "study_language.language_id", "users_languages.language_id")
        .join("languages as translation_language", "translation_language.language_id", "users_languages.translation_language_id")
        .leftJoin("categories", "categories.category_id", "users_languages.last_category_id")
        .leftJoin("category_translations", function () {
          this.on(
            "category_translations.category_id",
            "=",
            "categories.category_id"
          ).andOn(
            "category_translations.language_id",
            "=",
            "users_languages.language_id"
          );
        })
        .where("user_id", userId)
        .where("users_languages.user_id", userId)
        .select(
            "users_languages.*",
            "study_language.name as study_language_name",
            "translation_language.name as translation_language_name",
            "study_language.flag_path as study_flag_path",
            "translation_language.flag_path as translation_flag_path",
            "category_translations.name as currentCategory"
        );

    if (!courses.length) {
      return res.json([]);
    }

    const coursesIds = courses.map(c => c.user_language_id);

    // 2. progress aggregated per course
    const progressRows = await knex("progress")
      .whereIn("user_language_id", coursesIds)
      .select(
        "progress.user_language_id",
        "progress.category_id", 
        "progress.exercise_id",
        "progress.score"
    )

    // 3. max values
    const totalCategories = await knex("categories").count("* as count").first();
    const categoriesCount = Number(totalCategories.count);

    const totalExercises = await knex("exercises").count("* as count").first();
    const exercisesPerCategory = Number(totalExercises.count);
    
    const maxPoints = await knex("exercises").sum("max_score as total").first();
    const maxPointsPerCategory = Number(maxPoints.total);

    // 4. build response per course
    const result = courses.map(course => {
      const courseProgress = progressRows.filter(
        p => p.user_language_id === course.user_language_id
      );

      const points = courseProgress.reduce(
        (sum, p) => sum + Number(p.score || 0),
        0
      );
      
      const totalExercisesCount = categoriesCount * exercisesPerCategory;

      const totalMaxPoints = categoriesCount * maxPointsPerCategory;

      const exercisesDone = courseProgress.reduce(
        (sum) => sum + 1,
        0
      );

      const progressByCategory = {};

      courseProgress.forEach(p => {
        if (!progressByCategory[p.category_id]) {
          progressByCategory[p.category_id] = new Set();
        }

        progressByCategory[p.category_id].add(p.exercise_id);
      });

      const categoriesDone = Object.values(progressByCategory)
        .filter(exercises => exercises.size === exercisesPerCategory)
        .length;

    return {
      courseId: course.user_language_id,

      languages: {
        study: course.language_id,
        study_name: course.study_language_name, 
        study_flag: course.study_flag_path,
        translation: course.translation_language_id,
        translation_name: course.translation_language_name,
        translation_flag: course.translation_flag_path,
      },

      progressPercent: Math.round(
        (points / totalMaxPoints) * 100
      ),

      categories: {
        done: categoriesDone,
        total: categoriesCount,
      },

      exercises: {
        done: exercisesDone,
        total: totalExercisesCount,
      },

      points: {
        got: points,
        max: totalMaxPoints,
      },

      currentCategory: course.currentCategory,
      };
    });

    res.json(result);

  } catch (error) {
    console.error("Error fetching user's progress:", error);
    res.status(500).json({ error: error.message });
  }
}); 
// POST PROGRESS
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
        return res.status(400).json({ error: "We saved your result already!"});
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