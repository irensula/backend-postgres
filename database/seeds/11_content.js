/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  const categories = await knex('categories')
    .select("category_id", "slug");

  const categoryMap = Object.fromEntries(
    categories.map((category) => [
      category.slug,
      category.category_id,
    ])
  );

  const content = await knex('content').insert([
    
    // WORDS
    { type: "word", slug: "family", image_path: "/images/family/family.png", category_id: categoryMap.family, },
    { type: "word", slug: "mother", image_path: "/images/family/mother.png", category_id: categoryMap.family, },
    { type: "word", slug: "father", image_path: "/images/family/father.png", category_id: categoryMap.family, },
    { type: "word", slug: "son", image_path: "/images/family/son.png", category_id: categoryMap.family, },
    { type: "word", slug: "daughter", image_path: "/images/family/daughter.png", category_id: categoryMap.family, },
    { type: "word", slug: "sister", image_path: "/images/family/sister.png", category_id: categoryMap.family, },
    { type: "word", slug: "brother", image_path: "/images/family/brother.png", category_id: categoryMap.family, },
    { type: "word", slug: "grandmother", image_path: "/images/family/grandmother.png", category_id: categoryMap.family, },
    { type: "word", slug: "grandfather", image_path: "/images/family/grandfather.png", category_id: categoryMap.family, },
    { type: "word", slug: "aunt", image_path: "/images/family/aunt.png", category_id: categoryMap.family, },
    { type: "word", slug: "uncle", image_path: "/images/family/uncle.png", category_id: categoryMap.family, },
    // SENTENCES
    { type: "sentence", slug: "family", image_path: "/images/family/family.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "mother", image_path: "/images/family/mother.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "father", image_path: "/images/family/father.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "son", image_path: "/images/family/son.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "daughter", image_path: "/images/family/daughter.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "sister", image_path: "/images/family/sister.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "brother", image_path: "/images/family/brother.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "grandmother", image_path: "/images/family/grandmother.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "grandfather", image_path: "/images/family/grandfather.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "aunt", image_path: "/images/family/aunt.png", category_id: categoryMap.family, },
    { type: "sentence", slug: "uncle", image_path: "/images/family/uncle.png", category_id: categoryMap.family, },
    // TEXT
    { type: "text", slug: "family", image_path: "/images/texts/family_image.png", category_id: categoryMap.family, },
    
  ])
  .onConflict(["category_id", "type", "slug"])
  .merge(["image_path"]);
};