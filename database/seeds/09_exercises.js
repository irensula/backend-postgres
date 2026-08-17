/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const exercises = await knex('exercises')
    .insert([
      { screen_name: 'WordsList', max_score: 5, sort_order: 1 },
      { screen_name: 'WordCard', max_score: 5, sort_order: 2 },
      { screen_name: 'SentenceCard', max_score: 5, sort_order: 3 },
      { screen_name: 'Text', max_score: 5, sort_order: 4 },
      { screen_name: 'MemoGame', max_score: 5, sort_order: 5 },
      { screen_name: 'MatchGame', max_score: 5, sort_order: 6 },
      { screen_name: 'GapsTask', max_score: 5, sort_order: 7 },
    ])
    .onConflict("screen_name")
    .merge(["max_score", "sort_order"]);
};