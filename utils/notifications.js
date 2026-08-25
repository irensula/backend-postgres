// const EXPO_ACCESS_TOKEN = process.env.EXPO_ACCESS_TOKEN; 
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);

async function sendPushNotification(expoPushToken, title, body, type, notification_id) {
  // Validate the token format
  if (
    !expoPushToken ||
    typeof expoPushToken !== "string" ||
    !expoPushToken.startsWith("ExponentPushToken[")
  ) {
    console.warn("Token is not valid:", expoPushToken);
    return;
  }
  
  // Construct the message payload
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    channelId: "default",
    data: { 
      type,
      notification_id,
     },
  };

  // Send the notification
  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${EXPO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    console.log("Expo's response:", data);

    if (!response.ok) {
      throw new Error(
        `Expo Push API error: ${response.status} ${JSON.stringify(data)}`
      );
    }

    // Delete invalid tokens
    const error =
      data?.data?.details?.error ||
      data?.errors?.[0]?.details?.error;

    if (error === "DeviceNotRegistered") {
      console.warn("Delete invalid token:", expoPushToken);

      await knex("user_push_tokens")
        .where({ expo_push_token: expoPushToken })
        .del();
    }
  } catch (error) {
    console.error("Ошибка отправки пуша:", error);
  }
}

module.exports = { sendPushNotification };