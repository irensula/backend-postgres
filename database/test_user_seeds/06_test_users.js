const bcryptjs = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const password = "12345678";
  const hashedPassword = await bcryptjs.hash(password, 10);

  const avatar = await knex("avatars")
    .where("avatar_path", "/images/avatars/dog.png")
    .first();

  const language = await knex("languages")
    .where("code", "en")
    .first();

  if (!avatar) {
    throw new Error("Avatar not found: /images/avatars/dog.png");
  }
  
  if (!language) {
    throw new Error("Language not found: en");
  }

  const users = await knex('users')
    .insert({ 
        username: "testuser",
        email: "test@gmail.com",
        password: hashedPassword,
        avatar_id: avatar.avatar_id,
        ui_language_id: language.language_id,
      })
    .onConflict("email")
    .ignore();
};