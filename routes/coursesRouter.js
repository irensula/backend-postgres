let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");
const { buildWordQuery, buildSentenceQuery, buildWholeSentenceQuery, buildTextQuery } = require("../queries/exerciseContent");

// GET USER COURSES
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

      const exerciseTypesRow = await knex("exercises").count("* as count").first();
      const exercisesPerCategory = Number(exerciseTypesRow.count);
      
      const maxPointsRow = await knex("exercises").sum("max_score as total").first();
      const maxPointsPerCategory = Number(maxPointsRow.total);

      // 4. build response per course
      const result = courses.map(course => {
        const courseProgress = progressRows.filter(
          p => p.user_language_id === course.user_language_id
        );

        const points = courseProgress.reduce(
          (sum, p) => sum + Number(p.score || 0),
          0
        );
        
        const totalMaxPoints = categoriesCount * maxPointsPerCategory;

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
        course: course.user_language_id,

        studyLanguageId: course.language_id,
        studyLanguage: course.study_language_name, 
        studyFlag: course.study_flag_path,

        translationLanguageId: course.translation_language_id,
        translationLanguage: course.translation_language_name,
        translationFlag: course.translation_flag_path,

        currentCategory: course.currentCategory,

        completedCategories: categoriesDone,
        totalCategories: categoriesCount,

        percent: Math.round(
          (points / totalMaxPoints) * 100
        )
      }
      });

      res.json(result);
    
  } catch (error) {
    console.error("Error fetching user's courses:", error);
    res.status(500).json({ error: error.message });
  }
});
// "course": 1,
//     "studyLanguageId": 1,
//     "studyLanguage": "English",
//     "studyFlag": "/images/flags/en_flag.png",
//     "translationLanguageId": 3,
//     "translationLanguage": "Ukrainian",
//     "translationFlag": "/images/flags/uk_flag.png",
//     "currentCategory": 2,
//     "totalScore": 35,
//     "totalCategories": 5,
//     "completedCategories": 1,
//     "percent": 20
// GET WORDS
router.get('/:courseId/categories/:categoryId/words', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId, categoryId } = req.params;

    // get course
    const course = await knex("users_languages")
      .where("user_language_id", courseId)
      .first();

    const { language_id, translation_language_id } = course;
    
    const content = await knex("content")
      .join("content_translations as study", "study.content_id", "content.content_id")
      .join("content_translations as translation", "translation.content_id", "content.content_id")
      .where("content.type", "word")
      .where("content.category_id", categoryId)
      .where("study.language_id", language_id)
      .where("translation.language_id", translation_language_id)      
      .select(
        "content.content_id",
        "content.type",
        "content.category_id",
        "content.image_path",
        "study.value as study_value",
        "study.sound_path as study_sound",
        "translation.value as translation_value",
        "translation.sound_path as translation_sound"
      );
      
    res.json(content);
  } catch (error) {
    console.error("Error fetching user's content:", error);
    res.status(500).json({ error: "Failed to load content" });
  }
});
// GET SENTENCES
router.get('/:courseId/categories/:categoryId/sentences', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId, categoryId } = req.params;

    // get course
    const course = await knex("users_languages")
      .where("user_language_id", courseId)
      .first();

    const { language_id, translation_language_id } = course;
    
    const content = await knex("content")
      .join("content_translations as study", "study.content_id", "content.content_id")
      .join("content_translations as translation", "translation.content_id", "content.content_id")
      // pivot
      .leftJoin("sentence_answers", "sentence_answers.sentence_content_id", "content.content_id")
      .leftJoin("content_translations as answer_study", function () {
        this.on("answer_study.content_id", "=", "sentence_answers.correct_word_content_id")
        .andOn("answer_study.language_id", "=", knex.raw("?", [language_id]));
      })
      .leftJoin("content_translations as answer_translation", function () {
        this.on("answer_translation.content_id", "=", "sentence_answers.correct_word_content_id")
        .andOn("answer_translation.language_id", "=", knex.raw("?", [translation_language_id]));
      })
      .where("content.type", "sentence")
      .where("content.category_id", categoryId)
      .where("study.language_id", language_id)
      .where("translation.language_id", translation_language_id)      
      .select(
        "content.content_id",
        "content.type",
        "content.category_id",
        "content.image_path",

        "study.value as study_value",
        "answer_study.value as answer_study",
        "study.sound_path as study_sound",
        
        "translation.value as translation_value",
        "answer_translation.value as answer_translation"
      );
      
    res.json(content);
  } catch (error) {
    console.error("Error fetching user's content:", error);
    res.status(500).json({ error: "Failed to load content" });
  }
});
// GET TEXTS
router.get('/:courseId/categories/:categoryId/texts', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId, categoryId } = req.params;

    // get course
    const course = await knex("users_languages")
      .where("user_language_id", courseId)
      .first();

    const { language_id, translation_language_id } = course;
    
    const content = await knex("content")
      .join("content_translations as study", "study.content_id", "content.content_id")
      .join("content_translations as translation", "translation.content_id", "content.content_id")
      .where("content.type", "text")
      .where("content.category_id", categoryId)
      .where("study.language_id", language_id)
      .where("translation.language_id", translation_language_id)      
      .select(
        "content.content_id",
        "content.type",
        "content.category_id",
        "study.title",
        "content.image_path",
        "study.value as study_value",
        "study.sound_path as study_sound",
        "translation.value as translation_value",
        "translation.sound_path as translation_sound"
      );
      
    res.json(content);
  } catch (error) {
    console.error("Error fetching user's content:", error);
    res.status(500).json({ error: "Failed to load content" });
  }
});
// CREATE COURSE
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
        return res.status(400).json({ error: "You have this course already!"});
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
// EDIT TRANSLATION LANGUAGE
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
// DELETE COURSE
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
// GET CURRENT COURSE INFO
router.get('/:courseId/progress', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId } = req.params;

    const courseInfo = await knex("users_languages")
      .join("languages", "languages.language_id", "users_languages.language_id")
      .leftJoin("categories", "categories.category_id", "users_languages.last_category_id")
      .leftJoin("category_translations", function () {
        this.on("category_translations.category_id", "=","categories.category_id")
        .andOn("category_translations.language_id","=","users_languages.language_id");
      })
      .where("users_languages.user_id", userId)
      .where("users_languages.user_language_id", courseId)
      .select(
        "languages.language_id as courseId",
        "languages.name as languageName",
        "languages.name as title",
        "categories.category_id as currentCategoryId",
        "category_translations.name as currentCategory"
      )
      .first(); 
    
    const totalExercises = await knex("exercises")
      .count("exercise_id as total")
      .first();

    const completedExercises = await knex("progress")
      .join("users_languages", "users_languages.user_language_id", "progress.user_language_id")
      .where("users_languages.user_id", userId)
      .where("users_languages.user_language_id", courseId)
      .count("progress.exercise_id as completed")
      .first();

    const total = Number(totalExercises.total || 0);
    const done = Number(completedExercises.completed || 0);

    const percent = 
      total > 0 
      ? Math.round((done / total) * 100) 
      : 0;

    res.json({
      courseId: courseInfo.courseId,
      languageName: courseInfo.languageName,
      title: courseInfo.title,
      currentCategoryId: courseInfo.currentCategoryId,
      currentCategory: courseInfo.currentCategory,
      progress: {
        completed: done,
        total,
        percent
      }
    });

  } catch (error) {
    console.error("Error fetching user's progress:", error);
    res.status(500).json({ error: error.message });
  }
});
// GET EXERCISES (MEMOGAME, MATCHGAME, GAPSTASK)
router.get('/:courseId/categories/:categoryId/exercises/:exerciseId', async(req, res) => {
    const userId = res.locals.auth.userId;
    const { courseId, categoryId, exerciseId } = req.params;
    const courseIdNum = Number(courseId);
    

    // get course
    const course = await knex("users_languages")
      .where({ user_language_id: courseIdNum, user_id: userId })
      .first();

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // get exercise
    const exercise = await knex("exercises")
      .join("exercise_translations", "exercise_translations.exercise_id", "exercises.exercise_id")
      .where("exercises.exercise_id", exerciseId)
      .where(
        "exercise_translations.language_id",
        course.language_id
      )
      .select(
        "exercises.exercise_id",
        "exercises.screen_name",
        "exercises.max_score",
        "exercise_translations.name",
        "exercise_translations.description"
      )
      .first();


    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    const builders = {
      WordsList: buildWordQuery,
      WordCard: buildWordQuery,
      SentenceCard: buildWholeSentenceQuery,
      Text: buildTextQuery,
      MemoGame: buildWordQuery,
      MatchGame: buildWordQuery,
      GapsTask: buildSentenceQuery
    };

    const build = builders[exercise.screen_name];

    if (!build) {
      return res.status(400).json({
        error: `Unknown exercise type: ${exercise.screen_name}`,
      });
    }

    const content = await build({ knex, course, categoryId });
    
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
// GET EXERCISES NAMES WITH STATUSES
router.get('/:courseId/categories/:categoryId/exercises', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId, categoryId } = req.params;
    
    // get course
    const course = await knex("users_languages")
      .where({
        "user_language_id": courseId,
        user_id: userId,
      })
      .first();
    
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // get exercises
    const exercises = await knex("exercises")
      .join("exercise_translations", "exercise_translations.exercise_id", "exercises.exercise_id")
      .where("exercise_translations.language_id", course.language_id)
      .leftJoin("progress", function () {
        this.on("progress.exercise_id", "exercises.exercise_id")
          .andOn("progress.user_language_id", knex.raw("?", [courseId]))
          .andOn("progress.category_id", knex.raw("?", [categoryId]));
      })
      .select(
        "exercises.exercise_id",
        "exercise_translations.name",
        "exercise_translations.description",
        "exercises.screen_name",
        "exercises.max_score",
        knex.raw("COALESCE(progress.score, 0) as score")
      )
      .orderBy("exercises.sort_order");

    const result = exercises.map(ex => ({
      ...ex,
      isCompleted: Number(ex.score) >= Number(ex.max_score)
    }));

    res.json(result);

  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ error: "Failed to load exercises" });
  }
});

module.exports = router;