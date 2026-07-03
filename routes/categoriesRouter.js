let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");

router.get('/:courseId', async(req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { courseId } = req.params;
    
    const course = await knex("users_languages")
      .where({
        user_language_id: courseId,
        "user_id": userId
      })
      .first();
    
      if (!course) {
        return res.status(404).json({
          error: "Course not found"
        });
    }

    const categories = await knex("categories")
      .join("category_translations", "categories.category_id", "category_translations.category_id")
      .where("category_translations.language_id", course.language_id)
      .select(
        "categories.category_id",
        "categories.image_path",
        "categories.sort_order",
        "category_translations.name"
      )
      .orderBy("categories.sort_order");

    const categoryProgress = await knex("progress")
      .select(
        "category_id",
        knex.raw("SUM(score) as score")
      )
      .where("user_language_id", courseId)
      .groupBy("category_id");

    const progressMap = Object.fromEntries(
      categoryProgress.map(p => [
        Number(p.category_id),
        Number(p.score)
      ])
    );

    const maxScoreRow = await knex("exercises")
      .sum("max_score as total")
      .first();

    const maxCategoryScore = Number(maxScoreRow.total);


    const result = categories.map(category => {
      let status = "locked";

      if (category.category_id < course.last_category_id) {
        status = "completed";
      }

      if (category.category_id === course.last_category_id) {
        status = "current";
      }

      const score = progressMap[category.category_id] || 0;

      return {
        categoryId: category.category_id,
        name: category.name,
        imagePath: category.image_path,
        status,

        percent:
          status === "completed"
            ? 100
            : Math.round((score / maxCategoryScore) * 100)
      }
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;