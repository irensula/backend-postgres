/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // 1. APP SETTINGS
  await knex.schema.createTable("app_settings", (t) => {
    t.string("key").primary();
    t.text("value").notNullable();
  });
  // 2. AVATARS
  await knex.schema.createTable("avatars", (t) => {
    t.increments("avatar_id").primary();

    t.string("avatar_path").notNullable();
  });
  // 3. LANGUAGES
  await knex.schema.createTable("languages", (t) => {
    t.increments("language_id").primary();

    t.string("code", 10).notNullable().unique();

    t.string("name").notNullable();

    t.string("flag_path").notNullable();
  });
  // 4. CATEGORIES
  await knex.schema.createTable("categories", (t) => {
    t.increments("category_id").primary();

    t.string("code").notNullable().unique();

    t.string("image_path").notNullable();

    t.integer("sort_order").notNullable().defaultTo(0);

    t.timestamps(true, true);
  });
  // 5. CATEGORIES TRANSLATIONS
  await knex.schema.createTable("category_translations", (t) => {
    t.increments("category_translation_id").primary();

    t.integer("category_id")
      .notNullable()
      .references("category_id")
      .inTable("categories")
      .onDelete("CASCADE");

    t.integer("language_id")
      .notNullable()
      .references("language_id")
      .inTable("languages")
      .onDelete("CASCADE");

    t.string("name", 100).notNullable();

    t.unique(["category_id", "language_id"]);
  });
  // 6. USERS
  await knex.schema.createTable("users", (t) => {
    t.increments("user_id").primary();

    t.string("username").notNullable();

    t.string("email").notNullable().unique();

    t.string("password").notNullable();

    t.integer("avatar_id")
      .references("avatar_id")
      .inTable("avatars")
      .onDelete("SET NULL");

    t.integer("ui_language_id")
      .notNullable()
      .references("language_id")
      .inTable("languages")
      .onDelete("RESTRICT");

    t.timestamps(true, true);
  });
  // 7. USERS LANGUAGES
  await knex.schema.createTable("users_languages", (t) => {
    t.increments("user_language_id").primary();

    t.integer("user_id")
      .references("user_id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");

    t.integer("language_id")
      .notNullable()
      .references("language_id")
      .inTable("languages")
      .onDelete("CASCADE");

    t.integer("translation_language_id")
      .notNullable()
      .references("language_id")
      .inTable("languages")
      .onDelete("CASCADE");

    t.integer("last_category_id")
      .references("category_id")
      .inTable("categories")
      .onDelete("SET NULL");

    t.timestamps(true, true);

    t.unique([
      "user_id",
      "language_id",
    ]);
  });
  // 8. EXERCISES
  await knex.schema.createTable("exercises", (t) => {
    t.increments("exercise_id").primary();

    t.string("screen_name").notNullable().unique();

    t.integer("max_score").notNullable().defaultTo(5);

     t.integer("sort_order").notNullable().defaultTo(0);

    t.timestamps(true, true);
  });  
  // 9. EXERCISES TRANSLATIONS
  await knex.schema.createTable("exercise_translations", (t) => {
    t.increments("exercise_translation_id").primary();

    t.integer("exercise_id")
      .notNullable()
      .references("exercise_id")
      .inTable("exercises")
      .onDelete("CASCADE");

    t.integer("language_id")
      .notNullable()
      .references("language_id")
      .inTable("languages")
      .onDelete("CASCADE");

    t.string("name", 100).notNullable();

    t.text("description");

    t.unique(["exercise_id", "language_id"]);
  });
  // 10. CONTENT
  await knex.schema.createTable("content", (t) => {
    t.increments("content_id").primary();

    t.enu("type", ["word", "sentence", "text"]).notNullable();

    t.string("image_path");

    t.integer("category_id")
      .references("category_id")
      .inTable("categories")
      .onDelete("SET NULL");

    t.timestamps(true, true);
  });
  // 11. CONTENT TRANSLATIONS
  await knex.schema.createTable("content_translations", (t) => {
    t.increments("content_translation_id").primary();

    t.integer("content_id")
      .notNullable()
      .references("content_id")
      .inTable("content")
      .onDelete("CASCADE");

    t.integer("language_id")
      .notNullable()
      .references("language_id")
      .inTable("languages")
      .onDelete("CASCADE");

    t.text("value").notNullable();

    t.string("answer_value");

    t.string("sound_path");

    t.string("title").nullable();

    t.timestamps(true, true);

    t.unique(["content_id", "language_id"]);
  });
  // 12. PROGRESS
  await knex.schema.createTable("progress", (t) => {
    t.increments("progress_id").primary();

    t.integer("user_language_id")
      .notNullable()
      .references("user_language_id")
      .inTable("users_languages")
      .onDelete("CASCADE");

    t.integer("category_id")
      .nullable()
      .references("category_id")
      .inTable("categories")
      .onDelete("CASCADE");

    t.integer("exercise_id")
      .notNullable()
      .references("exercise_id")
      .inTable("exercises")
      .onDelete("CASCADE");

    t.integer("score").notNullable().defaultTo(0);

    t.timestamps(false, true);

    t.unique([
      "user_language_id",
      "category_id",
      "exercise_id"
    ]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("progress")
    .dropTableIfExists("content_translations")
    .dropTableIfExists("content")
    .dropTableIfExists("exercise_translations")
    .dropTableIfExists("exercises")
    .dropTableIfExists("users_languages")
    .dropTableIfExists("users")
    .dropTableIfExists("category_translations")
    .dropTableIfExists("categories")
    .dropTableIfExists("languages")
    .dropTableIfExists("avatars")
    .dropTableIfExists("app_settings");
};