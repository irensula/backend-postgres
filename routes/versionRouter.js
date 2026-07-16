let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);

router.get("/", async (req, res) => {

    const rows = await knex("app_settings");

    const settings = {};

    rows.forEach((row) => {
        settings[row.key] = row.value;
    });

    res.json({
        latestVersion: settings.latest_version,
        minimumVersion: settings.minimum_version,
        forceUpdate: settings.force_update === "true",
        message: settings.update_message,
        playStoreUrl: settings.google_play_url,
    });

});

module.exports = router;