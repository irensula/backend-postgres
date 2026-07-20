const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_languages').del();
  await knex('exercises').del();
  await knex('users').del();
  await knex('categories').del();
  await knex('languages').del();
  await knex('avatars').del();
  await knex('app_settings').del();
   // 1. APP SETTINGS
  const app_settings = await knex("app_settings").insert([
    { key: "latest_version", value: "1.0.0" },
    { key: "minimum_version", value: "1.0.0" },
    { key: "force_update", value: "false" },
    { key: "update_message", value: "Bug fixes and performance improvements." },
    { key: "google_play_url", value: "https://play.google.com/store/apps/details?id=com.your.package" },
  ]).returning('*');
  // 2. AVATARS
  const avatars = await knex('avatars').insert([
    { avatar_path: '/images/avatars/dog.png' },
    { avatar_path: '/images/avatars/cat.png' },
    { avatar_path: '/images/avatars/robot.png' },
    { avatar_path: '/images/avatars/alien.png' },
    { avatar_path: '/images/avatars/bear.png' },
    { avatar_path: '/images/avatars/fox.png' },
    { avatar_path: '/images/avatars/panda.png' },
    { avatar_path: '/images/avatars/frog.png' },
    { avatar_path: '/images/avatars/dinosaur.png' },
    { avatar_path: '/images/avatars/tiger.png' },
  ]).returning('*');
  // 3. LANGUAGES
  const languages = await knex('languages').insert([
    { code: 'en', name: 'English', flag_path: '/images/flags/en_flag.png' },
    { code: 'fi', name: 'Finnish', flag_path: '/images/flags/fi_flag.png' },
    { code: 'uk', name: 'Ukrainian', flag_path: '/images/flags/uk_flag.png' },
    { code: 'ru', name: 'Russian', flag_path: '/images/flags/ru_flag.png' },
  ]).returning('*');
  // 4. CATEGORIES
  const categories = await knex('categories').insert([
    { image_path: '/images/category_images/family.png', sort_order: 1 },
    { image_path: '/images/category_images/school.png', sort_order: 2 },
    { image_path: '/images/category_images/food.png', sort_order: 3 },
    { image_path: '/images/category_images/transport.png', sort_order: 4 },
    { image_path: '/images/category_images/room.png', sort_order: 5 },
  ]).returning('*');
  // 5. CATEGORY TRANSLATIONS
  const category_translations = await knex("category_translations").insert([
    // Family
    { category_id: categories[0].category_id, language_id: 1, name: "Family" },
    { category_id: categories[0].category_id, language_id: 2, name: "Perhe" },
    { category_id: categories[0].category_id, language_id: 3, name: "Сім'я" },
    { category_id: categories[0].category_id, language_id: 4, name: "Семья" },

    // School
    { category_id: categories[1].category_id, language_id: 1, name: "School" },
    { category_id: categories[1].category_id, language_id: 2, name: "Koulu" },
    { category_id: categories[1].category_id, language_id: 3, name: "Школа" },
    { category_id: categories[1].category_id, language_id: 4, name: "Школа" },

    // Food
    { category_id: categories[2].category_id, language_id: 1, name: "Food" },
    { category_id: categories[2].category_id, language_id: 2, name: "Ruoka" },
    { category_id: categories[2].category_id, language_id: 3, name: "Їжа" },
    { category_id: categories[2].category_id, language_id: 4, name: "Еда" },

    // Transport
    { category_id: categories[3].category_id, language_id: 1, name: "Transport" },
    { category_id: categories[3].category_id, language_id: 2, name: "Liikenne" },
    { category_id: categories[3].category_id, language_id: 3, name: "Транспорт" },
    { category_id: categories[3].category_id, language_id: 4, name: "Транспорт" },

    // Room
    { category_id: categories[4].category_id, language_id: 1, name: "Room" },
    { category_id: categories[4].category_id, language_id: 2, name: "Huone" },
    { category_id: categories[4].category_id, language_id: 3, name: "Кімната" },
    { category_id: categories[4].category_id, language_id: 4, name: "Комната" },
  ]);
  // 6. USERS
  const password = "12345678";
  const hashedPassword = await bcrypt.hash(password, 10);
  const users = await knex('users').insert([
    { 
      username: "testuser",
      email: "test@gmail.com",
      password: hashedPassword,
      avatar_id: avatars[0].avatar_id,
      ui_language_id: languages[0].language_id,
    },
  ]).returning('*');
  // 7. USERS LANGUAGES
  const users_languages = await knex('users_languages').insert([
    { 
      user_id: users[0].user_id,
      language_id: languages[0].language_id,
      translation_language_id: languages[2].language_id,
      last_category_id: categories[1].category_id,
    },
  ]).returning('*');
};