/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) { 
  await knex('avatars')
    .insert([
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
    ])
    .onConflict("avatar_path")
    .ignore();
}