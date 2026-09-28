let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const { sendPushNotification } = require("../utils/notifications.js");

// GET NOTIFICATIONS FOR CURRENT USER
router.get("/", async (req, res) => {
  try {
    const userId = res.locals.auth.userId;

    const notifications = await knex("notification_log as n")
      .leftJoin("notification_user_status as s", function () {
        this.on("s.notification_id", "=", "n.notification_id")
          .andOn("s.user_id", "=", knex.raw("?", [userId]));
      })
      .where(function () {
        this.whereNull("n.user_id")
          .orWhere("n.user_id", userId);
      })
      .andWhere(function () {
        this.whereNull("s.hidden")
          .orWhere("s.hidden", false);
      })
      .select(
        "n.notification_id",
        "n.user_id",
        "n.type",
        "n.title",
        "n.body",
        "n.data",
        "n.created_at",
        knex.raw("COALESCE(s.read, false) as read")
      )
      .orderBy("n.created_at", "desc");

    res.json(notifications);
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({
      error: "Failed to fetch notifications",
    });
  }
});

// SEND NOTIFICATION TO ALL USERS
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

    const tokens = await knex("user_push_tokens").select("user_id", "expo_push_token");

    if (!tokens.length) {
      return res.status(404).json({ message: "No push tokens found" });
    }

    // Create individual status for every user
    const statuses = tokens.map((token) => ({
      user_id: token.user_id,
      notification_id,
      read: false,
      hidden: false,
    }));

    await knex("notification_user_status").insert(statuses);

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
// SEND NOTIFICATION TO USER BY ID
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

    await knex("notification_user_status").insert({
      user_id,
      notification_id,
      read: false,
      hidden: false,
    });

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
// HIDE NOTIFICATION BY ID
router.patch('/:notificationId/hide', async (req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { notificationId } = req.params

    const updatedRows = await knex("notification_user_status")
      .where({ user_id: userId, notification_id: notificationId })
      .update({ hidden: true });

    if (updatedRows === 0) {
      return res.status(404).json({
        error: "Notification not found",
      });
    }

    res.json({
      message: "Notification hidden successfully",
    });
  } catch (error) {
    console.error("Hide notification error:", error);
    res.status(500).json({ error: "Failed to hide notification" });
  }
});
// HIDE ALL NOTIFICATIONS
router.patch("/hide-all", async (req, res) => {
  try {
    const userId = res.locals.auth.userId;

    const notifications = await knex("notification_log")
      .where(function () {
        this.whereNull("user_id")
          .orWhere("user_id", userId);
      })
      .select("notification_id");

    if (notifications.length === 0) {
      return res.json({
        message: "No notifications to hide",
      });
    }

    const notificationIds = notifications.map(
      (notification) => notification.notification_id
    );

    const existingStatuses = await knex("notification_user_status")
      .where({ user_id: userId })
      .whereIn("notification_id", notificationIds)
      .select("notification_id");

    const existingIds = new Set(
      existingStatuses.map((status) => status.notification_id)
    );

    const newStatuses = notificationIds
      .filter((id) => !existingIds.has(id))
      .map((notification_id) => ({
        user_id: userId,
        notification_id,
        read: true,
        hidden: true,
      }));

    if (newStatuses.length > 0) {
      await knex("notification_user_status").insert(newStatuses);
    }

    await knex("notification_user_status")
      .where({ user_id: userId })
      .whereIn("notification_id", notificationIds)
      .update({
        hidden: true,
      });

    res.json({
      message: "All notifications hidden successfully",
    });
  } catch (error) {
    console.error("Hide all notifications error:", error);
    res.status(500).json({
      error: "Failed to hide all notifications",
    });
  }
});
// MARK NOTIFICATION READ
router.patch("/:notificationId/read", async (req, res) => {
  try {
    const userId = res.locals.auth.userId;
    const { notificationId } = req.params;

    const updatedRows = await knex("notification_user_status")
      .where({
        user_id: userId,
        notification_id: notificationId,
      })
      .update({
        read: true,
      });

    if (updatedRows === 0) {
      return res.status(404).json({
        error: "Notification not found",
      });
    }

    res.json({
      message: "Notification marked as read",
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);
    res.status(500).json({
      error: "Failed to mark notification as read",
    });
  }
});

module.exports = router;