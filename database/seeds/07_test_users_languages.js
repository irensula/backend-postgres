/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const user = await knex("users")
    .where("email", "test@gmail.com")
    .first();

  const language = await knex("languages")
    .where("code", "en")
    .first();

  const translationLanguage = await knex("languages")
    .where("code", "uk")
    .first();

  const category = await knex("categories")
    .where("image_path", "/images/category_images/school.png")
    .first();

  if (!user) {
    throw new Error("User not found: test@gmail.com");
  }

  if (!language) {
    throw new Error("Language not found: en");
  }

  if (!language) {
    throw new Error("Language not found: uk");
  }

  if (!category) {
    throw new Error("Category not found: /images/category_images/school.png");
  }
  
  await knex('users_languages')
    .insert({ 
        user_id: user.user_id,
        language_id: language.language_id,
        translation_language_id: translationLanguage.language_id,
        last_category_id: category.category_id,
      })
    .onConflict(["user_id", "language_id"])
    .merge([
      "translation_language_id",
      "last_category_id",
    ]);
};