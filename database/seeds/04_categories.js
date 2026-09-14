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
      { slug: "colors", image_path: '/images/category_images/colors.png', sort_order: 6 },
      { slug: "animals", image_path: '/images/category_images/animals.png', sort_order: 7 },
      { slug: "days", image_path: '/images/category_images/days.png', sort_order: 8 },
      { slug: "months", image_path: '/images/category_images/months.png', sort_order: 9 },
      { slug: "nature", image_path: '/images/category_images/nature.png', sort_order: 10 },
    ])
    .onConflict("slug")
    .merge(["image_path", "sort_order"]);
};