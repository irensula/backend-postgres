let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");
// get user's courses
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
// users_languages: user_id, language_id, translation_language_id
    // content: content_id, type, image_path, category_id
    // content_translations: content_translation_id, content_id, language_id, value, sound_path, title
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

module.exports = router;