let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");
// get user's data
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await knex("users")
      .where({ "users.user_id": userId })
      .leftJoin("avatars", "users.avatar_id", "avatars.avatar_id")
      .select("users.*", "avatars.avatar_path as url")
      .first();

      if (!user) {
        res.status(404).json({ error: "user not found" });
      }
      return res.json(user);
  } catch (error) {
    console.error("Error fetching user: ", error.message);
    res.status(500).json({ error: "Failed to fetch user by _id" });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, email, phonenumber, password, avatar_id } = req.body;
  console.log("BODY RECEIVED:", req.body);
  if (userId !== res.locals.auth.userId.toString()) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot update another user" });
  }

  if (!username || !email || !phonenumber) {
    return res.status(400).json({
      error: "Missing required fields (username, email, phonenumber)",
    });
  }
  try {
    const updatedUser = {
      username,
      email,
      phonenumber,
    };

    if (password && password.trim() !== "") {
      updatedUser.password = await bcrypt.hash(password, 10);
    }

    if (avatar_id !== undefined) {
      updatedUser.avatar_id = avatar_id;
    }

    await knex("users").where("user_id", "=", userId).update(updatedUser);

    const updated = await knex("users")
      .leftJoin("avatars", "users.avatars", "avatars.avatar_id")
      .select(
        "users.user_id as id",
        "users.username",
        "users.email",
        "users.phonenumber",
        "users.password",
        "users.avatar_id",
        "users.category_id",
        "avatars.url as url"
      )
      .where("users.user_id", "=", userId)
      .first();

    if (!updated) {
      return res.status(404).json({ error: "User not found after update" });
    }
    res.json(updated);
  } catch (err) {
    console.error("UPDATE users failed", err);
    res.status(500).json({ error: "Database update error" });
  }
});

router.get("/:id/category", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await knex("users")
      .where({ "users.user_id": userId })
      .select("category_id")
      .first();

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ category_id: user.category_id });
  } catch (err) {
    console.error("Error fetching category_id: ", err);
    res.status(500).json({ error: "Failed to fetch category_id" });
  }
});

router.put("/:id/category", async (req, res) => {
  const userId = req.params.id;

  if (userId !== res.locals.auth.userId.toString()) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot update another user" });
  }

  try {
    // 1. Get user's current category
    const user = await knex("users").where("user_id", userId).first();

    if (!user) return res.status(404).json({ error: "User not found" });

    const currentCategory_id = user.category_id;

    // 2. Get all exercises and sum user progress
    const exercises = await knex("exercises")
      .leftJoin("progress", function () {
        this.on("exercises.exercise_id", "progress.exercise_id").andOn(
          "progress.user_id",
          "=",
          knex.raw("?", [userId])
        );
      })
      .where("exercises.category_id", currentCategory_id)
      .select(
        "exercises.maxScore",
        "progress.score_en",
        "progress.score_fi",
        "progress.score_ua",
        "progress.score_ru"
      );

    let userTotal = 0;
    let totalCategoryScore = 0;

    exercises.forEach((ex) => {
      const exerciseScore =
        (ex.score_en || 0) +
        (ex.score_fi || 0) +
        (ex.score_ua || 0) +
        (ex.score_ru || 0);
      userTotal += exerciseScore;
      totalCategoryScore += ex.maxScore * 4;
    });

    const percent =
      totalCategoryScore > 0 ? (userTotal / totalCategoryScore) * 100 : 0;

    console.log({ userTotal, totalCategoryScore, percent, currentCategory_id });
    // 3. Unlock next category if threshold is met (80% in your case)

    if (percent >= 80) {
      const nextCategory = await knex("categories")
        .where("category_id", ">", currentCategory_id)
        .orderBy("category_id", "asc")
        .first();

      if (nextCategory) {
        await knex("users")
          .where("user_id", userId)
          .update({ category_id: nextCategory.category_id });
      }
    }
    // 4. Return updated user
    const updatedUser = await knex("users").where("user_id", userId).first();

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating category: ", err);
    res.status(500).json({ error: "Failed to update category" });
  }
});

module.exports = router;
