let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);

router.get('/', async(req, res) => {
  try {
      const categories = await knex("categories")
        .join('category_translations', 'category_translations.category_id', 'categories.category_id')
        .join('languages', 'languages.language_id', 'category_translations.language_id')
        .select(
            'categories.*',
            'languages.name as language',
            'category_translations.name as translation',
        )
        res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to load categories" });
    }
});

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

router.get('/:categoryId/content', async(req, res) => {
   try {
        const categoryId = Number(req.params.categoryId);

        if (!Number.isInteger(categoryId)) {
            return res.status(400).json({
                error: 'Invalid category ID',
            });
        }

        const content = await knex('content')
            .where('category_id', categoryId)
            .orderBy('type')
            .orderBy('content_id', 'asc');

        const contentIds = content.map(item => item.content_id);

        const translations = contentIds.length
            ? await knex('content_translations')
                .join('languages', 'languages.language_id', 'content_translations.language_id')
                .whereIn('content_id', contentIds)
                .select('content_translations.*', 'languages.code as language_code')
                .orderBy('content_translations.language_id')
            : [];

        const result = content.map(item => ({
            ...item,
            translations: translations.filter(
                translation => translation.content_id === item.content_id
            ),
        }));

        return res.json(result);
    } catch (error) {
        console.error('Error fetching category content:', error);
        return res.status(500).json({
            error: 'Failed to fetch category content',
        });
    }
});

module.exports = router;