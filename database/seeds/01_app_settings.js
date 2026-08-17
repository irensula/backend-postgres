/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("app_settings")
    .insert([
      { key: "latest_version", value: "1.0.0" },
      { key: "minimum_version", value: "1.0.0" },
      { key: "force_update", value: "false" },
      { key: "update_message", value: "Bug fixes and performance improvements." },
      { key: "google_play_url", value: "https://play.google.com/store/apps/details?id=com.irensula.opetuspeliapp" },
    ])
    .onConflict("key")
    .merge(["value"]);
};