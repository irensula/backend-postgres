let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");
// get user's data
router.get("/me", async (req, res) => {
  const userId = res.locals.auth.userId;

  const user = await knex("users")
    .join("avatars", "avatars.avatar_id", "users.avatar_id")
    .where({ user_id: userId })
    .first()
    .select(
      "user_id",
      "username",
      "email",
      "users.avatar_id as avatar_id",
      "avatars.avatar_path as avatar_path",
      "ui_language_id"
    );

  const courses = await knex("users_languages")
    .where({ user_id: userId });
  
  res.json({ user, courses });
})
// edit user's data
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.auth.userId;
    const { username, email, password, avatar_id } = req.body;
    
    // user can edit only his own data
    if (Number(id) !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if ( !username || !email ) {
      return res.status(400).json({
        error: "Missing required fields (username, email)",
      });
    }
    const existingUser = await knex("users")
      .where("email", email)
      .whereNot("user_id", userId)
      .first();

    if (existingUser) {
      return res.status(400).json({
        error: "Email already in use"
      });
    }
    const updatedUser = {
      username,
      email,
    };

    if (username !== undefined) updatedUser.username = username;
    if (email !== undefined) updatedUser.email = email;
    if (password && password.trim() !== "") {
      updatedUser.password = await bcrypt.hash(password, 10);
    }
    if (avatar_id !== undefined) updatedUser.avatar_id = avatar_id;

    await knex("users").where("user_id", "=", userId).update(updatedUser);

    const updated = await knex("users")
      .leftJoin("avatars", "users.avatar_id", "avatars.avatar_id")
      .select(
        "users.user_id",
        "users.username",
        "users.email",
        "users.avatar_id",
        "avatars.avatar_path"
      )
      .where("users.user_id", "=", userId)
      .first();

    res.json(updated);
  } catch (err) {
    console.error("UPDATE users failed", err);
    res.status(500).json({ error: "Database update error" });
  }
});
// edit user's ui language
router.put("/:id/settings", async(req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.auth.userId;
    const { ui_language_id } = req.body;

    // user can edit only their own settings
    if (Number(id) !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!ui_language_id) {
      return res.status(400).json({ error: "ui_language_id required" })
    }

    await knex("users")
      .where("user_id", userId)
      .update({ ui_language_id });

    const updated = await knex("users")
      .where("user_id", userId)
      .select("user_id", "email", "ui_language_id")
      .first();

      res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Settings update failed" });
  }
})

module.exports = router;
