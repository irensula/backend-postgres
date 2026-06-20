let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");
// get user's courses
router.get('/', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;

     // 1. get courses
    const courses = await knex("users_languages")
      .join("languages as study_lang", "study_lang.language_id", "users_languages.language_id")
      .join("languages as trans_lang", "trans_lang.language_id", "users_languages.translation_language_id")
      .where("users_languages.user_id", userId)
      .select(
        "users_languages.user_language_id as course",
        "study_lang.name as studyLanguage",
        "trans_lang.name as translationLanguage",
        "users_languages.last_category_id as currentCategory"
      );

    // 2. attach aggregated progress per course
    const progress = await knex("progress")
      .select(
        "progress.user_language_id",
        knex.raw("COALESCE(SUM(progress.score), 0) as total_score")
      )
      .groupBy("progress.user_language_id");

    const progressMap = Object.fromEntries(
      progress.map(p => [
        Number(p.user_language_id), 
        Number(p.total_score || 0)
      ])
    );

    // 3. categories
    const totalCategoriesRow = await knex("categories")
      .count("category_id as total")
      .first();

    const totalCategories = Number(totalCategoriesRow.total);

    // 4. completed categories per course
    const completed = await knex("progress")
      .join("exercises", "exercises.exercise_id", "progress.exercise_id")
      .join("categories", "categories.category_id", "exercises.category_id")
      .select("progress.user_language_id")
      .whereIn("progress.user_language_id", courses.map(c => c.course))
      .groupBy("progress.user_language_id")
      .havingRaw("SUM(progress.score) > 0")
      .countDistinct("categories.category_id as completed");

    const completedMap = Object.fromEntries(
      completed.map(c => [c.user_language_id, Number(c.completed)])
    );

    const result = courses.map(c => {
      const totalScore = progressMap[c.course] || 0;
      const done = completedMap[c.course] || 0;

      return {
        ...c,
        totalScore,
        totalCategories,
        completedCategories: done,
        percent:
          totalCategories > 0
            ? Math.round((done / totalCategories) * 100)
            : 0
      };
    });
      
    res.json(result);

  } catch (error) {
    console.error("Error fetching user's courses:", error);
    res.status(500).json({ error: error.message });
  }
});
// get content
router.get('/:courseId/categories/:categoryId/content', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId, categoryId } = req.params;
    const type = req.query.type || "word";
    // get course
    const course = await knex("users_languages")
      .where("user_language_id", courseId)
      .first();

    const { language_id, translation_language_id } = course;
    
    const content = await knex("content")
      .join("content_translations as study", "study.content_id", "content.content_id")
      .join("content_translations as translation", "translation.content_id", "content.content_id")
      .where("content.type", type)
      .where("content.category_id", categoryId)
      .where("study.language_id", language_id)
      .where("translation.language_id", translation_language_id)      
      .select(
        "content.content_id",
        "content.type",
        "content.image_path",
        "content.category_id",
        "study.value as study_value",
        "translation.value as translation_value",
        "study.sound_path",
        "study.title"
      );
      
    res.json(content);
  } catch (error) {
    console.error("Error fetching user's content:", error);
    res.status(500).json({ error: "Failed to load content" });
  }
});
// create course
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
        language_id
      })
      .first();

    if (existing) {
        return res.status(400).json({ error: "Course already exists"});
    } 

    const course = await knex("users_languages")
      .insert({
        user_id: userId,
        language_id,
        translation_language_id,
        last_category_id: 1
      })

    return res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
});
// edit translation language
router.put("/:id", async(req, res) => {
  try {
    const courseId = req.params.id;
    const userId = res.locals.auth.userId;
    const { translation_language_id } = req.body;
    // validate request
    if (!translation_language_id) {
      return res.status(400).json({ error: "translation_language_id required" });
    }
    // find user's course
    const course = await knex("users_languages")
      .where({ user_id: userId, user_language_id: courseId })
      .first();
    // check if course exists
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // check that language and translation language are different
    if (course.language_id === translation_language_id) {
      return res.status(400).json({ error: "Study language and translation language must be different" });
    }
    // update translation language
    await knex("users_languages")
      .where({
        user_id: userId,
        user_language_id: courseId
      })
      .update({ translation_language_id });
    // return updated course
    const updated = await knex("users_languages")
      .where({
        user_id: userId,
        user_language_id: courseId
      })
      .first();
    
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation language update failed" });
  }
})
// delete course
router.delete('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = res.locals.auth.userId;

    const deleteRows = await knex("users_languages")
      .where({
        user_language_id: courseId,
        user_id: userId
      })
      .del();

      if (deleteRows === 0) {
        return res.status(404).json({
          error: "Course not found"
        });
      }

      res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});
// get info about current course
router.get('/:courseId/progress', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId } = req.params;

    const courseInfo = await knex("users_languages")
      .join("languages", "languages.language_id", "users_languages.language_id")
      .leftJoin("categories", "categories.category_id", "users_languages.last_category_id")
      .where("users_languages.user_id", userId)
      .where("users_languages.language_id", courseId)
      .select(
        "languages.language_id as courseId",
        "languages.name as languageName",
        "languages.name as title",
        "categories.category_id as currentCategoryId",
        "categories.name as currentCategory"
      )
      .first(); 
    
    const totalExercises = await knex("exercises")
      .where("category_id", courseInfo.currentCategoryId)
      .count("exercise_id as total")
      .first();

    const completedExercises = await knex("progress")
      .join("users_languages", "users_languages.user_language_id", "progress.user_language_id")
      .where("users_languages.user_id", userId)
      .where("users_languages.language_id", courseId)
      .count("progress.exercise_id as completed")
      .first();

    const total = Number(totalExercises.total || 0);
    const done = Number(completedExercises.completed || 0);

    const persent = 
      total > 0 
      ? Math.round((done / total) * 100) 
      : 0;

    res.json({
      courseId: courseInfo.courseId,
      languageName: courseInfo.languageName,
      title: courseInfo.name,
      currentCategoryId: courseInfo.currentCategoryId,
      currentCategory: courseInfo.currentCategory,
      progress: {
        completed: done,
        total,
        persent
      }
    });

  } catch (error) {
    console.error("Error fetching user's progress:", error);
    res.status(500).json({ error: error.message });
  }
});
// get content for exercises
router.get('/:courseId/categories/:categoryId/exercises/:exerciseId', async(req, res) => {
    const userId = res.locals.auth.userId;
    const { courseId, categoryId, exerciseId } = req.params;
  
    // get exercise
    const exercise = await knex("exercises")
      .where("exercise_id", exerciseId)
      .first();

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    // get course
    const course = await knex("users_languages")
      .where("user_language_id", courseId)
      .first();

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    let content = [];

    let contentType = null;

    if (exercise.name === "MemoGame" || exercise.name === "MatchGame") {
      contentType = "word";
    }

    if (exercise.name === "GapsTask") {
      contentType = "sentence";
    }

    if (contentType) {
      const studyLangId = course.language_id;
      const transLangId = course.translation_language_id;

      content = await knex("content")
        .join("content_translations", "content_translations.content_id", "content.content_id")
        .where("content.category_id", categoryId)
        .where( "content.type", contentType)
        .groupBy("content.content_id", "content.type")
        .select(
          "content.content_id",
          "content.type",

          knex.raw(
            `MAX(
              CASE 
                WHEN content_translations.language_id = ? 
                THEN content_translations.value 
              END
            ) as study`, 
            [studyLangId]),

          knex.raw(
            `MAX(
              CASE 
                WHEN content_translations.language_id = ? 
                THEN content_translations.value 
              END
            ) as translation`, 
             [transLangId])
        );
    }
      
    res.json({
      categoryId: Number(categoryId),

      exercise: {
        id: exercise.exercise_id,
        name: exercise.name,
        description: exercise.description,
        maxScore: exercise.max_score
      },

      content
    });
});

module.exports = router;