/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('languages')
    .insert([
      { code: 'en', name: 'English', flag_path: '/images/flags/en_flag.png' },
      { code: 'fi', name: 'Finnish', flag_path: '/images/flags/fi_flag.png' },
      { code: 'uk', name: 'Ukrainian', flag_path: '/images/flags/uk_flag.png' },
      { code: 'ru', name: 'Russian', flag_path: '/images/flags/ru_flag.png' },
    ])
    .onConflict("code")
    .merge(["name", "flag_path"]);
};