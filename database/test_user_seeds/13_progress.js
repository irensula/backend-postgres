/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  
  const userLanguage = await knex('users_languages')
    .join('users', 'users.user_id', 'users_languages.user_id')
    .where('users.email', 'test@gmail.com')
    .select('users_languages.*')
    .first();

  if (!userLanguage) {
    throw new Error('Demo user_language not found — run users/users_languages seed first');
  }

  const categories = await knex('categories')
    .select("category_id", "slug");

  const categoryMap = Object.fromEntries(
    categories.map((category) => [
      category.slug,
      category.category_id,
    ])
  );

  const exercises = await knex('exercises').select('exercise_id', 'screen_name');

  const exerciseMap = Object.fromEntries(
    exercises.map((exercise) => [exercise.screen_name, exercise.exercise_id])
  );
  
  const progress = await knex('progress').insert([
    { user_language_id: userLanguage.user_language_id, category_id: categoryMap.family, exercise_id: exerciseMap.WordsList, score: 5 },
    { user_language_id: userLanguage.user_language_id, category_id: categoryMap.family, exercise_id: exerciseMap.WordCard, score: 5 },
    { user_language_id: userLanguage.user_language_id, category_id: categoryMap.family, exercise_id: exerciseMap.SentenceCard, score: 5 },
    { user_language_id: userLanguage.user_language_id, category_id: categoryMap.family, exercise_id: exerciseMap.Text, score: 5 },
    { user_language_id: userLanguage.user_language_id, category_id: categoryMap.family, exercise_id: exerciseMap.MemoGame, score: 5 },
    { user_language_id: userLanguage.user_language_id, category_id: categoryMap.family, exercise_id: exerciseMap.MatchGame, score: 5 },
    { user_language_id: userLanguage.user_language_id, category_id: categoryMap.family, exercise_id: exerciseMap.GapsTask, score: 5 }
  ])
  .onConflict(["user_language_id", "category_id", "exercise_id"])
  .merge(["score"]);
};