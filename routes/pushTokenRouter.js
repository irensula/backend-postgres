let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);

router.get("/", async (req, res) => {
  const userId = res.locals.auth.userId;

  try {
    const pushTokens = await knex("user_push_tokens").select("*");
    res.json(pushTokens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unregister expo_push_token" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { expo_push_token } = req.body;
    const user_id = res.locals.auth.userId;

    console.log("Received token from frontend:", expo_push_token);
    console.log("User ID:", user_id);

    if (!expo_push_token) {
      return res.status(400).json({ error: "No token provided" });
    }

    await knex("user_push_tokens")
      .where({ expo_push_token })
      .del();

    await knex("user_push_tokens").insert({ 
        user_id,
        expo_push_token
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to save token:", err);
    res.status(500).json({ error: "Failed to save token" });
  }
});

router.post("/unregister", async (req, res) => {
  const { expo_push_token } = req.body;

  try {
    await knex("user_push_tokens").where({ expo_push_token }).del();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unregister expo_push_token" });
  }
});

module.exports = router;
