/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) { 
  await knex('categories')
    .insert([
      { slug: "family", image_path: '/images/category_images/family.png', sort_order: 1 },
      { slug: "school", image_path: '/images/category_images/school.png', sort_order: 2 },
      { slug: "food", image_path: '/images/category_images/food.png', sort_order: 3 },
      { slug: "transport", image_path: '/images/category_images/transport.png', sort_order: 4 },
      { slug: "numbers", image_path: '/images/category_images/numbers.png', sort_order: 5 },
    ])
    .onConflict("slug")
    .merge(["image_path", "sort_order"]);
};