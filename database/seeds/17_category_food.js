/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {

  const categories = await knex("categories").select("category_id", "slug");

  const categoryMap = Object.fromEntries(
    categories.map((category) => [category.slug, category.category_id]));

  const languages = await knex("languages").select("language_id", "code");

  const languageMap = Object.fromEntries(
    languages.map(language => [language.code, language.language_id])
  );

  await knex('content').insert([

    // WORDS
    { type: "word", slug: "food", image_path: "/images/food/food.png", category_id: categoryMap.food },
    { type: "word", slug: "breakfast", image_path: "/images/food/breakfast.png", category_id: categoryMap.food },
    { type: "word", slug: "lunch", image_path: "/images/food/lunch.png", category_id: categoryMap.food },
    { type: "word", slug: "dinner", image_path: "/images/food/dinner.png", category_id: categoryMap.food },
    { type: "word", slug: "porridge", image_path: "/images/food/porridge.png", category_id: categoryMap.food },
    { type: "word", slug: "egg", image_path: "/images/food/egg.png", category_id: categoryMap.food },
    { type: "word", slug: "milk", image_path: "/images/food/milk.png", category_id: categoryMap.food },
    { type: "word", slug: "potato", image_path: "/images/food/potato.png", category_id: categoryMap.food },
    { type: "word", slug: "meat", image_path: "/images/food/meat.png", category_id: categoryMap.food },
    { type: "word", slug: "fish", image_path: "/images/food/fish.png", category_id: categoryMap.food },
    { type: "word", slug: "rice", image_path: "/images/food/rice.png", category_id: categoryMap.food },
    { type: "word", slug: "bread", image_path: "/images/food/bread.png", category_id: categoryMap.food },
    { type: "word", slug: "butter", image_path: "/images/food/butter.png", category_id: categoryMap.food },
    { type: "word", slug: "cheese", image_path: "/images/food/cheese.png", category_id: categoryMap.food },
    { type: "word", slug: "apple", image_path: "/images/food/apple.png", category_id: categoryMap.food },
    { type: "word", slug: "banana", image_path: "/images/food/banana.png", category_id: categoryMap.food },

    // SENTENCES
    { type: "sentence", slug: "food", image_path: "/images/food/food.png", category_id: categoryMap.food },
    { type: "sentence", slug: "breakfast", image_path: "/images/food/breakfast.png", category_id: categoryMap.food },
    { type: "sentence", slug: "lunch", image_path: "/images/food/lunch.png", category_id: categoryMap.food },
    { type: "sentence", slug: "dinner", image_path: "/images/food/dinner.png", category_id: categoryMap.food },
    { type: "sentence", slug: "porridge", image_path: "/images/food/porridge.png", category_id: categoryMap.food },
    { type: "sentence", slug: "egg", image_path: "/images/food/egg.png", category_id: categoryMap.food },
    { type: "sentence", slug: "milk", image_path: "/images/food/milk.png", category_id: categoryMap.food },
    { type: "sentence", slug: "potato", image_path: "/images/food/potato.png", category_id: categoryMap.food },
    { type: "sentence", slug: "meat", image_path: "/images/food/meat.png", category_id: categoryMap.food },
    { type: "sentence", slug: "fish", image_path: "/images/food/fish.png", category_id: categoryMap.food },
    { type: "sentence", slug: "rice", image_path: "/images/food/rice.png", category_id: categoryMap.food },
    { type: "sentence", slug: "bread", image_path: "/images/food/bread.png", category_id: categoryMap.food },
    { type: "sentence", slug: "butter", image_path: "/images/food/butter.png", category_id: categoryMap.food },
    { type: "sentence", slug: "cheese", image_path: "/images/food/cheese.png", category_id: categoryMap.food },
    { type: "sentence", slug: "apple", image_path: "/images/food/apple.png", category_id: categoryMap.food },
    { type: "sentence", slug: "banana", image_path: "/images/food/banana.png", category_id: categoryMap.food },

    // TEXT
    { type: "text", slug: "food", image_path: "/images/texts/food_image.png", category_id: categoryMap.food },
])
  .onConflict(["category_id", "type", "slug"])
  .merge(["image_path"]);

  const content = await knex("content")
      .select("content_id", "category_id", "type", "slug")
      .where("category_id", categoryMap.food);

  const contentMap = Object.fromEntries(
      content.map((item) => [
          `${item.category_id}_${item.type}_${item.slug}`,
          item.content_id,
       ])
   );

  await knex('content_translations').insert([

    // WORDS

    // word 1
    {
      content_id: contentMap[`${categoryMap.food}_word_food`],
      language_id: languageMap.en,
      value: "food",
      sound_path: "/sounds/food/words/en/food.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_food`],
      language_id: languageMap.fi,
      value: "ruoka",
      sound_path: "/sounds/food/words/fi/ruoka.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_food`],
      language_id: languageMap.uk,
      value: "їжа",
      sound_path: "/sounds/food/words/uk/їжа.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_food`],
      language_id: languageMap.ru,
      value: "еда",
      sound_path: "/sounds/food/words/ru/еда.mp3"
    },

    // word 2
    {
      content_id: contentMap[`${categoryMap.food}_word_breakfast`],
      language_id: languageMap.en,
      value: "breakfast",
      sound_path: "/sounds/food/words/en/breakfast.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_breakfast`],
      language_id: languageMap.fi,
      value: "aamiainen",
      sound_path: "/sounds/food/words/fi/aamiainen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_breakfast`],
      language_id: languageMap.uk,
      value: "сніданок",
      sound_path: "/sounds/food/words/uk/сніданок.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_breakfast`],
      language_id: languageMap.ru,
      value: "завтрак",
      sound_path: "/sounds/food/words/ru/завтрак.mp3"
    },

    // word 3
    {
      content_id: contentMap[`${categoryMap.food}_word_lunch`],
      language_id: languageMap.en,
      value: "lunch",
      sound_path: "/sounds/food/words/en/lunch.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_lunch`],
      language_id: languageMap.fi,
      value: "lounas",
      sound_path: "/sounds/food/words/fi/lounas.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_lunch`],
      language_id: languageMap.uk,
      value: "обід",
      sound_path: "/sounds/food/words/uk/обід.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_lunch`],
      language_id: languageMap.ru,
      value: "обед",
      sound_path: "/sounds/food/words/ru/обед.mp3"
    },

    // word 4
    {
      content_id: contentMap[`${categoryMap.food}_word_dinner`],
      language_id: languageMap.en,
      value: "dinner",
      sound_path: "/sounds/food/words/en/dinner.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_dinner`],
      language_id: languageMap.fi,
      value: "päivällinen",
      sound_path: "/sounds/food/words/fi/päivällinen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_dinner`],
      language_id: languageMap.uk,
      value: "вечеря",
      sound_path: "/sounds/food/words/uk/вечеря.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_dinner`],
      language_id: languageMap.ru,
      value: "ужин",
      sound_path: "/sounds/food/words/ru/ужин.mp3"
    },

    // word 5
    {
      content_id: contentMap[`${categoryMap.food}_word_porridge`],
      language_id: languageMap.en,
      value: "porridge",
      sound_path: "/sounds/food/words/en/porridge.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_porridge`],
      language_id: languageMap.fi,
      value: "puuro",
      sound_path: "/sounds/food/words/fi/puuro.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_porridge`],
      language_id: languageMap.uk,
      value: "каша",
      sound_path: "/sounds/food/words/uk/каша.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_porridge`],
      language_id: languageMap.ru,
      value: "каша",
      sound_path: "/sounds/food/words/ru/каша.mp3"
    },

    // word 6
    {
      content_id: contentMap[`${categoryMap.food}_word_egg`],
      language_id: languageMap.en,
      value: "egg",
      sound_path: "/sounds/food/words/en/egg.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_egg`],
      language_id: languageMap.fi,
      value: "kananmuna",
      sound_path: "/sounds/food/words/fi/kananmuna.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_egg`],
      language_id: languageMap.uk,
      value: "яйце",
      sound_path: "/sounds/food/words/uk/яйце.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_egg`],
      language_id: languageMap.ru,
      value: "яйцо",
      sound_path: "/sounds/food/words/ru/яйцо.mp3"
    },

    // word 7
    {
      content_id: contentMap[`${categoryMap.food}_word_milk`],
      language_id: languageMap.en,
      value: "milk",
      sound_path: "/sounds/food/words/en/milk.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_milk`],
      language_id: languageMap.fi,
      value: "maito",
      sound_path: "/sounds/food/words/fi/maito.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_milk`],
      language_id: languageMap.uk,
      value: "молоко",
      sound_path: "/sounds/food/words/uk/молоко.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_milk`],
      language_id: languageMap.ru,
      value: "молоко",
      sound_path: "/sounds/food/words/ru/молоко.mp3"
    },

    // word 8
    {
      content_id: contentMap[`${categoryMap.food}_word_potato`],
      language_id: languageMap.en,
      value: "potato",
      sound_path: "/sounds/food/words/en/potato.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_potato`],
      language_id: languageMap.fi,
      value: "peruna",
      sound_path: "/sounds/food/words/fi/peruna.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_potato`],
      language_id: languageMap.uk,
      value: "картопля",
      sound_path: "/sounds/food/words/uk/картопля.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_potato`],
      language_id: languageMap.ru,
      value: "картофель",
      sound_path: "/sounds/food/words/ru/картофель.mp3"
    },

    // word 9
    {
      content_id: contentMap[`${categoryMap.food}_word_meat`],
      language_id: languageMap.en,
      value: "meat",
      sound_path: "/sounds/food/words/en/meat.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_meat`],
      language_id: languageMap.fi,
      value: "liha",
      sound_path: "/sounds/food/words/fi/liha.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_meat`],
      language_id: languageMap.uk,
      value: "м'ясо",
      sound_path: "/sounds/food/words/uk/м'ясо.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_meat`],
      language_id: languageMap.ru,
      value: "мясо",
      sound_path: "/sounds/food/words/ru/мясо.mp3"
    },

    // word 10
    {
      content_id: contentMap[`${categoryMap.food}_word_fish`],
      language_id: languageMap.en,
      value: "fish",
      sound_path: "/sounds/food/words/en/fish.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_fish`],
      language_id: languageMap.fi,
      value: "kala",
      sound_path: "/sounds/food/words/fi/kala.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_fish`],
      language_id: languageMap.uk,
      value: "риба",
      sound_path: "/sounds/food/words/uk/риба.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_fish`],
      language_id: languageMap.ru,
      value: "рыба",
      sound_path: "/sounds/food/words/ru/рыба.mp3"
    },

    // word 11
    {
      content_id: contentMap[`${categoryMap.food}_word_rice`],
      language_id: languageMap.en,
      value: "rice",
      sound_path: "/sounds/food/words/en/rice.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_rice`],
      language_id: languageMap.fi,
      value: "riisi",
      sound_path: "/sounds/food/words/fi/riisi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_rice`],
      language_id: languageMap.uk,
      value: "рис",
      sound_path: "/sounds/food/words/uk/рис.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_rice`],
      language_id: languageMap.ru,
      value: "рис",
      sound_path: "/sounds/food/words/ru/рис.mp3"
    },

    // word 12
    {
      content_id: contentMap[`${categoryMap.food}_word_bread`],
      language_id: languageMap.en,
      value: "bread",
      sound_path: "/sounds/food/words/en/bread.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_bread`],
      language_id: languageMap.fi,
      value: "leipä",
      sound_path: "/sounds/food/words/fi/leipä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_bread`],
      language_id: languageMap.uk,
      value: "хліб",
      sound_path: "/sounds/food/words/uk/хліб.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_bread`],
      language_id: languageMap.ru,
      value: "хлеб",
      sound_path: "/sounds/food/words/ru/хлеб.mp3"
    },

    // word 13
    {
      content_id: contentMap[`${categoryMap.food}_word_butter`],
      language_id: languageMap.en,
      value: "butter",
      sound_path: "/sounds/food/words/en/butter.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_butter`],
      language_id: languageMap.fi,
      value: "voi",
      sound_path: "/sounds/food/words/fi/voi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_butter`],
      language_id: languageMap.uk,
      value: "масло",
      sound_path: "/sounds/food/words/uk/масло.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_butter`],
      language_id: languageMap.ru,
      value: "масло",
      sound_path: "/sounds/food/words/ru/масло.mp3"
    },

    // word 14
    {
      content_id: contentMap[`${categoryMap.food}_word_cheese`],
      language_id: languageMap.en,
      value: "cheese",
      sound_path: "/sounds/food/words/en/cheese.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_cheese`],
      language_id: languageMap.fi,
      value: "juusto",
      sound_path: "/sounds/food/words/fi/juusto.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_cheese`],
      language_id: languageMap.uk,
      value: "сир",
      sound_path: "/sounds/food/words/uk/сир.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_cheese`],
      language_id: languageMap.ru,
      value: "сыр",
      sound_path: "/sounds/food/words/ru/сыр.mp3"
    },

    // word 15
    {
      content_id: contentMap[`${categoryMap.food}_word_apple`],
      language_id: languageMap.en,
      value: "apple",
      sound_path: "/sounds/food/words/en/apple.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_apple`],
      language_id: languageMap.fi,
      value: "omena",
      sound_path: "/sounds/food/words/fi/omena.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_apple`],
      language_id: languageMap.uk,
      value: "яблуко",
      sound_path: "/sounds/food/words/uk/яблуко.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_apple`],
      language_id: languageMap.ru,
      value: "яблоко",
      sound_path: "/sounds/food/words/ru/яблоко.mp3"
    },

    // word 16
    {
      content_id: contentMap[`${categoryMap.food}_word_banana`],
      language_id: languageMap.en,
      value: "banana",
      sound_path: "/sounds/food/words/en/banana.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_banana`],
      language_id: languageMap.fi,
      value: "banaani",
      sound_path: "/sounds/food/words/fi/banaani.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_banana`],
      language_id: languageMap.uk,
      value: "банан",
      sound_path: "/sounds/food/words/uk/банан.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_word_banana`],
      language_id: languageMap.ru,
      value: "банан",
      sound_path: "/sounds/food/words/ru/банан.mp3"
    },

    // SENTENCES

    // sentence 1
    {
      content_id: contentMap[`${categoryMap.food}_sentence_food`],
      language_id: languageMap.en,
      value: "I like healthy {{answer}}.",
      answer_value: "food",
      sound_path: "/sounds/food/sentences/en/food.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_food`],
      language_id: languageMap.fi,
      value: "Pidän terveellisestä {{answer}}.",
      answer_value: "ruoasta",
      sound_path: "/sounds/food/sentences/fi/ruoka.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_food`],
      language_id: languageMap.uk,
      value: "Я люблю здорову {{answer}}.",
      answer_value: "їжу",
      sound_path: "/sounds/food/sentences/uk/їжа.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_food`],
      language_id: languageMap.ru,
      value: "Я люблю здоровую {{answer}}.",
      answer_value: "еду",
      sound_path: "/sounds/food/sentences/ru/еда.mp3"
    },

    // sentence 2
    {
      content_id: contentMap[`${categoryMap.food}_sentence_breakfast`],
      language_id: languageMap.en,
      value: "I have {{answer}} in the morning.",
      answer_value: "breakfast",
      sound_path: "/sounds/food/sentences/en/breakfast.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_breakfast`],
      language_id: languageMap.fi,
      value: "Minä syön {{answer}} aamulla.",
      answer_value: "aamiaista",
      sound_path: "/sounds/food/sentences/fi/aamiainen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_breakfast`],
      language_id: languageMap.uk,
      value: "Я їм {{answer}} вранці.",
      answer_value: "сніданок",
      sound_path: "/sounds/food/sentences/uk/сніданок.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_breakfast`],
      language_id: languageMap.ru,
      value: "Я ем {{answer}} утром.",
      answer_value: "завтрак",
      sound_path: "/sounds/food/sentences/ru/завтрак.mp3"
    },

    // sentence 3
    {
      content_id: contentMap[`${categoryMap.food}_sentence_lunch`],
      language_id: languageMap.en,
      value: "I have {{answer}} at school in the afternoon.",
      answer_value: "lunch",
      sound_path: "/sounds/food/sentences/en/lunch.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_lunch`],
      language_id: languageMap.fi,
      value: "Minä syön {{answer}} koulussa iltapäivällä.",
      answer_value: "lounasta",
      sound_path: "/sounds/food/sentences/fi/lounas.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_lunch`],
      language_id: languageMap.uk,
      value: "Я їм {{answer}} у школі вдень.",
      answer_value: "обід",
      sound_path: "/sounds/food/sentences/uk/обід.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_lunch`],
      language_id: languageMap.ru,
      value: "Я ем {{answer}} в школе днём.",
      answer_value: "обед",
      sound_path: "/sounds/food/sentences/ru/обед.mp3"
    },

    // sentence 4
    {
      content_id: contentMap[`${categoryMap.food}_sentence_dinner`],
      language_id: languageMap.en,
      value: "My family has {{answer}} together in the evening.",
      answer_value: "dinner",
      sound_path: "/sounds/food/sentences/en/dinner.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_dinner`],
      language_id: languageMap.fi,
      value: "Minun perhe syö {{answer}} yhdessä illalla.",
      answer_value: "päivällistä",
      sound_path: "/sounds/food/sentences/fi/päivällinen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_dinner`],
      language_id: languageMap.uk,
      value: "Моя сім'я їсть {{answer}} разом увечері.",
      answer_value: "вечерю",
      sound_path: "/sounds/food/sentences/uk/вечеря.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_dinner`],
      language_id: languageMap.ru,
      value: "Моя семья ест {{answer}} вместе вечером.",
      answer_value: "ужин",
      sound_path: "/sounds/food/sentences/ru/ужин.mp3"
    },

    // sentence 5
    {
      content_id: contentMap[`${categoryMap.food}_sentence_porridge`],
      language_id: languageMap.en,
      value: "I eat {{answer}} for breakfast.",
      answer_value: "porridge",
      sound_path: "/sounds/food/sentences/en/porridge.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_porridge`],
      language_id: languageMap.fi,
      value: "Minä syön {{answer}} aamiaiseksi.",
      answer_value: "puuroa",
      sound_path: "/sounds/food/sentences/fi/puuro.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_porridge`],
      language_id: languageMap.uk,
      value: "Я їм {{answer}} на сніданок.",
      answer_value: "кашу",
      sound_path: "/sounds/food/sentences/uk/каша.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_porridge`],
      language_id: languageMap.ru,
      value: "Я ем {{answer}} на завтрак.",
      answer_value: "кашу",
      sound_path: "/sounds/food/sentences/ru/каша.mp3"
    },

    // sentence 6
    {
      content_id: contentMap[`${categoryMap.food}_sentence_egg`],
      language_id: languageMap.en,
      value: "I eat an {{answer}} for breakfast.",
      answer_value: "egg",
      sound_path: "/sounds/food/sentences/en/egg.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_egg`],
      language_id: languageMap.fi,
      value: "Minä syön {{answer}} aamiaiseksi.",
      answer_value: "kananmunan",
      sound_path: "/sounds/food/sentences/fi/kananmuna.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_egg`],
      language_id: languageMap.uk,
      value: "Я їм {{answer}} на сніданок.",
      answer_value: "яйце",
      sound_path: "/sounds/food/sentences/uk/яйце.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_egg`],
      language_id: languageMap.ru,
      value: "Я ем {{answer}} на завтрак.",
      answer_value: "яйцо",
      sound_path: "/sounds/food/sentences/ru/яйцо.mp3"
    },

    // sentence 7
    {
      content_id: contentMap[`${categoryMap.food}_sentence_milk`],
      language_id: languageMap.en,
      value: "I drink {{answer}} every morning.",
      answer_value: "milk",
      sound_path: "/sounds/food/sentences/en/milk.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_milk`],
      language_id: languageMap.fi,
      value: "Juon {{answer}} joka aamu.",
      answer_value: "maitoa",
      sound_path: "/sounds/food/sentences/fi/maito.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_milk`],
      language_id: languageMap.uk,
      value: "Я п'ю {{answer}} щоранку.",
      answer_value: "молоко",
      sound_path: "/sounds/food/sentences/uk/молоко.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_milk`],
      language_id: languageMap.ru,
      value: "Я пью {{answer}} каждое утро.",
      answer_value: "молоко",
      sound_path: "/sounds/food/sentences/ru/молоко.mp3"
    },

    // sentence 8
    {
      content_id: contentMap[`${categoryMap.food}_sentence_potato`],
      language_id: languageMap.en,
      value: "I eat {{answer}} for lunch.",
      answer_value: "potatoes",
      sound_path: "/sounds/food/sentences/en/potato.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_potato`],
      language_id: languageMap.fi,
      value: "Minä syön {{answer}} lounaaksi.",
      answer_value: "perunoita",
      sound_path: "/sounds/food/sentences/fi/peruna.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_potato`],
      language_id: languageMap.uk,
      value: "Я їм {{answer}} на обід.",
      answer_value: "картоплю",
      sound_path: "/sounds/food/sentences/uk/картопля.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_potato`],
      language_id: languageMap.ru,
      value: "Я ем {{answer}} на обед.",
      answer_value: "картофель",
      sound_path: "/sounds/food/sentences/ru/картофель.mp3"
    },

    // sentence 9
    {
      content_id: contentMap[`${categoryMap.food}_sentence_meat`],
      language_id: languageMap.en,
      value: "My father likes {{answer}}.",
      answer_value: "meat",
      sound_path: "/sounds/food/sentences/en/meat.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_meat`],
      language_id: languageMap.fi,
      value: "Minun isä pitää {{answer}}.",
      answer_value: "lihasta",
      sound_path: "/sounds/food/sentences/fi/liha.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_meat`],
      language_id: languageMap.uk,
      value: "Мій тато любить {{answer}}.",
      answer_value: "м'ясо",
      sound_path: "/sounds/food/sentences/uk/м'ясо.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_meat`],
      language_id: languageMap.ru,
      value: "Мой папа любит {{answer}}.",
      answer_value: "мясо",
      sound_path: "/sounds/food/sentences/ru/мясо.mp3"
    },

    // sentence 10
    {
      content_id: contentMap[`${categoryMap.food}_sentence_fish`],
      language_id: languageMap.en,
      value: "My mother likes {{answer}}.",
      answer_value: "fish",
      sound_path: "/sounds/food/sentences/en/fish.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_fish`],
      language_id: languageMap.fi,
      value: "Minun äiti pitää {{answer}}.",
      answer_value: "kalasta",
      sound_path: "/sounds/food/sentences/fi/kala.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_fish`],
      language_id: languageMap.uk,
      value: "Моя мама любить {{answer}}.",
      answer_value: "рибу",
      sound_path: "/sounds/food/sentences/uk/риба.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_fish`],
      language_id: languageMap.ru,
      value: "Моя мама любит {{answer}}.",
      answer_value: "рыбу",
      sound_path: "/sounds/food/sentences/ru/рыба.mp3"
    },

    // sentence 11
    {
      content_id: contentMap[`${categoryMap.food}_sentence_rice`],
      language_id: languageMap.en,
      value: "I eat {{answer}} with fish.",
      answer_value: "rice",
      sound_path: "/sounds/food/sentences/en/rice.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_rice`],
      language_id: languageMap.fi,
      value: "Minä syön {{answer}} kalan kanssa.",
      answer_value: "riisiä",
      sound_path: "/sounds/food/sentences/fi/riisi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_rice`],
      language_id: languageMap.uk,
      value: "Я їм {{answer}} із рибою.",
      answer_value: "рис",
      sound_path: "/sounds/food/sentences/uk/рис.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_rice`],
      language_id: languageMap.ru,
      value: "Я ем {{answer}} с рыбой.",
      answer_value: "рис",
      sound_path: "/sounds/food/sentences/ru/рис.mp3"
    },

    // sentence 12
    {
      content_id: contentMap[`${categoryMap.food}_sentence_bread`],
      language_id: languageMap.en,
      value: "We eat {{answer}} every day.",
      answer_value: "bread",
      sound_path: "/sounds/food/sentences/en/bread.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_bread`],
      language_id: languageMap.fi,
      value: "Me syömme {{answer}} joka päivä.",
      answer_value: "leipää",
      sound_path: "/sounds/food/sentences/fi/leipä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_bread`],
      language_id: languageMap.uk,
      value: "Ми їмо {{answer}} щодня.",
      answer_value: "хліб",
      sound_path: "/sounds/food/sentences/uk/хліб.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_bread`],
      language_id: languageMap.ru,
      value: "Мы едим {{answer}} каждый день.",
      answer_value: "хлеб",
      sound_path: "/sounds/food/sentences/ru/хлеб.mp3"
    },

    // sentence 13
    {
      content_id: contentMap[`${categoryMap.food}_sentence_butter`],
      language_id: languageMap.en,
      value: "I eat bread with {{answer}}.",
      answer_value: "butter",
      sound_path: "/sounds/food/sentences/en/butter.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_butter`],
      language_id: languageMap.fi,
      value: "Minä syön leipää {{answer}} kanssa.",
      answer_value: "voin",
      sound_path: "/sounds/food/sentences/fi/voi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_butter`],
      language_id: languageMap.uk,
      value: "Я їм хліб із {{answer}}.",
      answer_value: "маслом",
      sound_path: "/sounds/food/sentences/uk/масло.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_butter`],
      language_id: languageMap.ru,
      value: "Я ем хлеб с {{answer}}.",
      answer_value: "маслом",
      sound_path: "/sounds/food/sentences/ru/масло.mp3"
    },

    // sentence 14
    {
      content_id: contentMap[`${categoryMap.food}_sentence_cheese`],
      language_id: languageMap.en,
      value: "My sister likes {{answer}}.",
      answer_value: "cheese",
      sound_path: "/sounds/food/sentences/en/cheese.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_cheese`],
      language_id: languageMap.fi,
      value: "Minun sisko pitää {{answer}}.",
      answer_value: "juustosta",
      sound_path: "/sounds/food/sentences/fi/juusto.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_cheese`],
      language_id: languageMap.uk,
      value: "Моя сестра любить {{answer}}.",
      answer_value: "сир",
      sound_path: "/sounds/food/sentences/uk/сир.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_cheese`],
      language_id: languageMap.ru,
      value: "Моя сестра любит {{answer}}.",
      answer_value: "сыр",
      sound_path: "/sounds/food/sentences/ru/сыр.mp3"
    },

    // sentence 15
    {
      content_id: contentMap[`${categoryMap.food}_sentence_apple`],
      language_id: languageMap.en,
      value: "My brother likes {{answer}}.",
      answer_value: "apples",
      sound_path: "/sounds/food/sentences/en/apple.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_apple`],
      language_id: languageMap.fi,
      value: "Minun veli pitää {{answer}}.",
      answer_value: "omenoista",
      sound_path: "/sounds/food/sentences/fi/omena.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_apple`],
      language_id: languageMap.uk,
      value: "Мій брат любить {{answer}}.",
      answer_value: "яблукa",
      sound_path: "/sounds/food/sentences/uk/яблуко.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_apple`],
      language_id: languageMap.ru,
      value: "Мой брат любит {{answer}}.",
      answer_value: "яблоки",
      sound_path: "/sounds/food/sentences/ru/яблоко.mp3"
    },

    // sentence 16
    {
      content_id: contentMap[`${categoryMap.food}_sentence_banana`],
      language_id: languageMap.en,
      value: "I eat a {{answer}} after lunch.",
      answer_value: "banana",
      sound_path: "/sounds/food/sentences/en/banana.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_banana`],
      language_id: languageMap.fi,
      value: "Minä syön {{answer}} lounaan jälkeen.",
      answer_value: "banaanin",
      sound_path: "/sounds/food/sentences/fi/banaani.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_banana`],
      language_id: languageMap.uk,
      value: "Я їм {{answer}} після обіду.",
      answer_value: "банан",
      sound_path: "/sounds/food/sentences/uk/банан.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.food}_sentence_banana`],
      language_id: languageMap.ru,
      value: "Я ем {{answer}} после обеда.",
      answer_value: "банан",
      sound_path: "/sounds/food/sentences/ru/банан.mp3"
    },

    // TEXT
    {
      content_id: contentMap[`${categoryMap.food}_text_food`],
      language_id: languageMap.en,
      value: "Hello! My name is Emma. Every day I eat healthy food. In the morning I have breakfast. I eat porridge or an egg and drink milk. For lunch I eat potatoes with meat. For dessert I eat an apple or a banana. For dinner I eat fish with rice. Before bed I eat bread with butter and cheese and drink a glass of milk. I like healthy food.",
      sound_path: "/sounds/food/text/en_food.mp3",
      title: "Food"
    },
    {
      content_id: contentMap[`${categoryMap.food}_text_food`],
      language_id: languageMap.fi,
      value: "Hei! Minun nimi on Emma. Syön terveellistä ruokaa joka päivä. Aamulla syön aamiaisen. Syön puuroa tai kananmunan ja juon maitoa. Lounaaksi syön perunoita ja lihaa. Jälkiruoaksi syön omenan tai banaanin. Päivälliseksi syön kalaa ja riisiä. Ennen nukkumaanmenoa syön voijuustoleipää ja juon lasillisen maitoa. Pidän terveellisestä ruoasta.",
      sound_path: "/sounds/food/text/fi_food.mp3",
      title: "Ruoka"
    },
    {
      content_id: contentMap[`${categoryMap.food}_text_food`],
      language_id: languageMap.uk,
      value: "Привіт! Мене звати Емма. Щодня я їм здорову їжу. Вранці я снідаю. Я їм кашу або яйце і п’ю молоко. На обід я їм картоплю з м’ясом. На десерт я їм яблуко або банан. На вечерю я їм рибу з рисом. Перед сном я їм хліб із маслом і сиром та п’ю склянку молока. Я люблю здорову їжу.",
      sound_path: "/sounds/food/text/uk_food.mp3",
      title: "Їжа"
    },
    {
      content_id: contentMap[`${categoryMap.food}_text_food`],
      language_id: languageMap.ru,
      value: "Привет! Меня зовут Эмма. Каждый день я ем здоровую пищу. Утром я завтракаю. Я ем кашу или яйцо и пью молоко. На обед я ем картофель с мясом. На десерт я ем яблоко или банан. На ужин я ем рыбу с рисом. Перед сном я ем хлеб с маслом и сыром и пью стакан молока. Я люблю здоровую пищу.",
      sound_path: "/sounds/food/text/ru_food.mp3",
      title: "Еда"
    },
])
  .onConflict(["content_id", "language_id"])
  .merge([ "value", "answer_value", "sound_path", "title" ]);
};