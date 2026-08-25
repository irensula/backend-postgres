let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const { sendPushNotification } = require("../utils/notifications.js");

router.get("/", async (req, res) => {
  const userId = res.locals.auth.userId;

  try {
    const notificationLog = await knex("notification_log").select("*");
    res.json(notificationLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unregister expo_push_token" });
  }
});

// Send notification to all users
router.post("/all", async (req, res) => {
  const { title, body, type } = req.body;

  try {
    const [notification] = await knex("notification_log")
      .insert({
        user_id: null,
        title,
        body,
        type,
      })
      .returning("notification_id");

    const notification_id = notification.notification_id;

    const tokens = await knex("user_push_tokens").select("expo_push_token");

    if (!tokens.length) {
      return res.status(404).json({ message: "No push tokens found" });
    }

    await Promise.all(
      tokens.map(async (token) => {
        try {
          await sendPushNotification(
            token.expo_push_token,
            title,
            body,
            type,
            notification_id
          );
        } catch (err) {
          console.error(
            "Failed to send to token:",
            token.expo_push_token,
            err
          );
        }
      })
    );

    res.json({ success: true, sent: tokens.length, notification_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

router.post("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { title, body, type } = req.body;

  try {
    const [notification] = await knex("notification_log")
      .insert({
        user_id,
        title,
        body,
        type,
      })
      .returning("notification_id");

    const notification_id = notification.notification_id;

    const tokens = await knex("user_push_tokens")
      .where({ user_id })
      .select("expo_push_token");

    if (!tokens.length) {
      return res
        .status(404)
        .json({ message: "No push tokens found for this user" });
    }

    await Promise.all(
      tokens.map(async (token) => {
        await sendPushNotification(
          token.expo_push_token,
          title,
          body,
          type,
          notification_id
        );
      })
    );

    res.json({ 
      success: true,
      sent: tokens.length,
      notification_id
   });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

module.exports = router;