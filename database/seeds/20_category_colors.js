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
    { type: "word", slug: "color", image_path: "/images/colors/color.png", category_id: categoryMap.colors },
    { type: "word", slug: "red", image_path: "/images/colors/red.png", category_id: categoryMap.colors },
    { type: "word", slug: "orange", image_path: "/images/colors/orange.png", category_id: categoryMap.colors },
    { type: "word", slug: "yellow", image_path: "/images/colors/yellow.png", category_id: categoryMap.colors },
    { type: "word", slug: "green", image_path: "/images/colors/green.png", category_id: categoryMap.colors },
    { type: "word", slug: "blue", image_path: "/images/colors/blue.png", category_id: categoryMap.colors },
    { type: "word", slug: "purple", image_path: "/images/colors/purple.png", category_id: categoryMap.colors },
    { type: "word", slug: "pink", image_path: "/images/colors/pink.png", category_id: categoryMap.colors },
    { type: "word", slug: "white", image_path: "/images/colors/white.png", category_id: categoryMap.colors },
    { type: "word", slug: "grey", image_path: "/images/colors/grey.png", category_id: categoryMap.colors },
    { type: "word", slug: "brown", image_path: "/images/colors/brown.png", category_id: categoryMap.colors },
    { type: "word", slug: "black", image_path: "/images/colors/black.png", category_id: categoryMap.colors },

    // SENTENCES
    { type: "sentence", slug: "color", image_path: "/images/colors/color.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "red", image_path: "/images/colors/red.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "orange", image_path: "/images/colors/orange.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "yellow", image_path: "/images/colors/yellow.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "green", image_path: "/images/colors/green.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "blue", image_path: "/images/colors/blue.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "purple", image_path: "/images/colors/purple.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "pink", image_path: "/images/colors/pink.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "white", image_path: "/images/colors/white.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "grey", image_path: "/images/colors/grey.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "brown", image_path: "/images/colors/brown.png", category_id: categoryMap.colors },
    { type: "sentence", slug: "black", image_path: "/images/colors/black.png", category_id: categoryMap.colors },

    // TEXT
    { type: "text", slug: "colors", image_path: "/images/texts/colors_image.png", category_id: categoryMap.colors },
])
  .onConflict(["category_id", "type", "slug"])
  .merge(["image_path"]);

  const content = await knex("content")
      .select("content_id", "category_id", "type", "slug")
      .where("category_id", categoryMap.colors);

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
      content_id: contentMap[`${categoryMap.colors}_word_color`],
      language_id: languageMap.en,
      value: "color",
      sound_path: "/sounds/colors/words/en/color.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_color`],
      language_id: languageMap.fi,
      value: "väri",
      sound_path: "/sounds/colors/words/fi/väri.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_color`],
      language_id: languageMap.uk,
      value: "колір",
      sound_path: "/sounds/colors/words/uk/колір.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_color`],
      language_id: languageMap.ru,
      value: "цвет",
      sound_path: "/sounds/colors/words/ru/цвет.mp3"
    },

    // word 2
    {
      content_id: contentMap[`${categoryMap.colors}_word_red`],
      language_id: languageMap.en,
      value: "red",
      sound_path: "/sounds/colors/words/en/red.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_red`],
      language_id: languageMap.fi,
      value: "punainen",
      sound_path: "/sounds/colors/words/fi/punainen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_red`],
      language_id: languageMap.uk,
      value: "червоний",
      sound_path: "/sounds/colors/words/uk/червоний.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_red`],
      language_id: languageMap.ru,
      value: "красный",
      sound_path: "/sounds/colors/words/ru/красный.mp3"
    },

    // word 3
    {
      content_id: contentMap[`${categoryMap.colors}_word_orange`],
      language_id: languageMap.en,
      value: "orange",
      sound_path: "/sounds/colors/words/en/orange.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_orange`],
      language_id: languageMap.fi,
      value: "oranssi",
      sound_path: "/sounds/colors/words/fi/oranssi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_orange`],
      language_id: languageMap.uk,
      value: "помаранчевий",
      sound_path: "/sounds/colors/words/uk/помаранчевий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_orange`],
      language_id: languageMap.ru,
      value: "оранжевый",
      sound_path: "/sounds/colors/words/ru/оранжевый.mp3"
    },

    // word 4
    {
      content_id: contentMap[`${categoryMap.colors}_word_yellow`],
      language_id: languageMap.en,
      value: "yellow",
      sound_path: "/sounds/colors/words/en/yellow.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_yellow`],
      language_id: languageMap.fi,
      value: "keltainen",
      sound_path: "/sounds/colors/words/fi/keltainen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_yellow`],
      language_id: languageMap.uk,
      value: "жовтий",
      sound_path: "/sounds/colors/words/uk/жовтий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_yellow`],
      language_id: languageMap.ru,
      value: "жёлтый",
      sound_path: "/sounds/colors/words/ru/жёлтый.mp3"
    },

    // word 5
    {
      content_id: contentMap[`${categoryMap.colors}_word_green`],
      language_id: languageMap.en,
      value: "green",
      sound_path: "/sounds/colors/words/en/green.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_green`],
      language_id: languageMap.fi,
      value: "vihreä",
      sound_path: "/sounds/colors/words/fi/vihreä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_green`],
      language_id: languageMap.uk,
      value: "зелений",
      sound_path: "/sounds/colors/words/uk/зелений.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_green`],
      language_id: languageMap.ru,
      value: "зелёный",
      sound_path: "/sounds/colors/words/ru/зелёный.mp3"
    },

    // word 6
    {
      content_id: contentMap[`${categoryMap.colors}_word_blue`],
      language_id: languageMap.en,
      value: "blue",
      sound_path: "/sounds/colors/words/en/blue.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_blue`],
      language_id: languageMap.fi,
      value: "sininen",
      sound_path: "/sounds/colors/words/fi/sininen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_blue`],
      language_id: languageMap.uk,
      value: "синій",
      sound_path: "/sounds/colors/words/uk/синій.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_blue`],
      language_id: languageMap.ru,
      value: "синий",
      sound_path: "/sounds/colors/words/ru/синий.mp3"
    },

    // word 7
    {
      content_id: contentMap[`${categoryMap.colors}_word_purple`],
      language_id: languageMap.en,
      value: "purple",
      sound_path: "/sounds/colors/words/en/purple.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_purple`],
      language_id: languageMap.fi,
      value: "violetti",
      sound_path: "/sounds/colors/words/fi/violetti.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_purple`],
      language_id: languageMap.uk,
      value: "фіолетовий",
      sound_path: "/sounds/colors/words/uk/фіолетовий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_purple`],
      language_id: languageMap.ru,
      value: "фиолетовый",
      sound_path: "/sounds/colors/words/ru/фиолетовый.mp3"
    },

    // word 8
    {
      content_id: contentMap[`${categoryMap.colors}_word_pink`],
      language_id: languageMap.en,
      value: "pink",
      sound_path: "/sounds/colors/words/en/pink.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_pink`],
      language_id: languageMap.fi,
      value: "vaaleanpunainen",
      sound_path: "/sounds/colors/words/fi/vaaleanpunainen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_pink`],
      language_id: languageMap.uk,
      value: "рожевий",
      sound_path: "/sounds/colors/words/uk/рожевий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_pink`],
      language_id: languageMap.ru,
      value: "розовый",
      sound_path: "/sounds/colors/words/ru/розовый.mp3"
    },

    // word 9
    {
      content_id: contentMap[`${categoryMap.colors}_word_white`],
      language_id: languageMap.en,
      value: "white",
      sound_path: "/sounds/colors/words/en/white.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_white`],
      language_id: languageMap.fi,
      value: "valkoinen",
      sound_path: "/sounds/colors/words/fi/valkoinen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_white`],
      language_id: languageMap.uk,
      value: "білий",
      sound_path: "/sounds/colors/words/uk/білий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_white`],
      language_id: languageMap.ru,
      value: "белый",
      sound_path: "/sounds/colors/words/ru/белый.mp3"
    },

    // word 10
    {
      content_id: contentMap[`${categoryMap.colors}_word_grey`],
      language_id: languageMap.en,
      value: "grey",
      sound_path: "/sounds/colors/words/en/grey.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_grey`],
      language_id: languageMap.fi,
      value: "harmaa",
      sound_path: "/sounds/colors/words/fi/harmaa.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_grey`],
      language_id: languageMap.uk,
      value: "сірий",
      sound_path: "/sounds/colors/words/uk/сірий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_grey`],
      language_id: languageMap.ru,
      value: "серый",
      sound_path: "/sounds/colors/words/ru/серый.mp3"
    },

    // word 11
    {
      content_id: contentMap[`${categoryMap.colors}_word_brown`],
      language_id: languageMap.en,
      value: "brown",
      sound_path: "/sounds/colors/words/en/brown.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_brown`],
      language_id: languageMap.fi,
      value: "ruskea",
      sound_path: "/sounds/colors/words/fi/ruskea.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_brown`],
      language_id: languageMap.uk,
      value: "коричневий",
      sound_path: "/sounds/colors/words/uk/коричневий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_brown`],
      language_id: languageMap.ru,
      value: "коричневый",
      sound_path: "/sounds/colors/words/ru/коричневый.mp3"
    },

    // word 12
    {
      content_id: contentMap[`${categoryMap.colors}_word_black`],
      language_id: languageMap.en,
      value: "black",
      sound_path: "/sounds/colors/words/en/black.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_black`],
      language_id: languageMap.fi,
      value: "musta",
      sound_path: "/sounds/colors/words/fi/musta.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_black`],
      language_id: languageMap.uk,
      value: "чорний",
      sound_path: "/sounds/colors/words/uk/чорний.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_word_black`],
      language_id: languageMap.ru,
      value: "чёрный",
      sound_path: "/sounds/colors/words/ru/чёрный.mp3"
    },

    // SENTENCES

    // sentence 1
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_color`],
      language_id: languageMap.en,
      value: "My favourite {{answer}} is green.",
      answer_value: "color",
      sound_path: "/sounds/colors/sentences/en/color.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_color`],
      language_id: languageMap.fi,
      value: "Minun lempi{{answer}} on vihreä.",
      answer_value: "väri",
      sound_path: "/sounds/colors/sentences/fi/väri.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_color`],
      language_id: languageMap.uk,
      value: "Мій улюблений {{answer}} — зелений.",
      answer_value: "колір",
      sound_path: "/sounds/colors/sentences/uk/колір.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_color`],
      language_id: languageMap.ru,
      value: "Мой любимый {{answer}} — зелёный.",
      answer_value: "цвет",
      sound_path: "/sounds/colors/sentences/ru/цвет.mp3"
    },

    // sentence 2
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_red`],
      language_id: languageMap.en,
      value: "This apple is {{answer}}.",
      answer_value: "red",
      sound_path: "/sounds/colors/sentences/en/red.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_red`],
      language_id: languageMap.fi,
      value: "Tämä omena on {{answer}}.",
      answer_value: "punainen",
      sound_path: "/sounds/colors/sentences/fi/punainen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_red`],
      language_id: languageMap.uk,
      value: "Це яблуко {{answer}}.",
      answer_value: "червоне",
      sound_path: "/sounds/colors/sentences/uk/червоний.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_red`],
      language_id: languageMap.ru,
      value: "Это яблоко {{answer}}.",
      answer_value: "красное",
      sound_path: "/sounds/colors/sentences/ru/красный.mp3"
    },

    // sentence 3
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_orange`],
      language_id: languageMap.en,
      value: "This car is {{answer}}.",
      answer_value: "orange",
      sound_path: "/sounds/colors/sentences/en/orange.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_orange`],
      language_id: languageMap.fi,
      value: "Tämä auto on {{answer}}.",
      answer_value: "oranssi",
      sound_path: "/sounds/colors/sentences/fi/oranssi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_orange`],
      language_id: languageMap.uk,
      value: "Ця машина {{answer}}.",
      answer_value: "помаранчева",
      sound_path: "/sounds/colors/sentences/uk/помаранчевий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_orange`],
      language_id: languageMap.ru,
      value: "Эта машина {{answer}}.",
      answer_value: "оранжевая",
      sound_path: "/sounds/colors/sentences/ru/оранжевый.mp3"
    },

    // sentence 4
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_yellow`],
      language_id: languageMap.en,
      value: "Bananas are {{answer}}.",
      answer_value: "yellow",
      sound_path: "/sounds/colors/sentences/en/yellow.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_yellow`],
      language_id: languageMap.fi,
      value: "Banaanit ovat {{answer}}.",
      answer_value: "keltaisia",
      sound_path: "/sounds/colors/sentences/fi/keltainen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_yellow`],
      language_id: languageMap.uk,
      value: "Банани {{answer}}.",
      answer_value: "жовті",
      sound_path: "/sounds/colors/sentences/uk/жовтий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_yellow`],
      language_id: languageMap.ru,
      value: "Бананы {{answer}}.",
      answer_value: "жёлтые",
      sound_path: "/sounds/colors/sentences/ru/жёлтый.mp3"
    },

    // sentence 5
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_green`],
      language_id: languageMap.en,
      value: "This train is {{answer}}.",
      answer_value: "green",
      sound_path: "/sounds/colors/sentences/en/green.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_green`],
      language_id: languageMap.fi,
      value: "Tämä juna on {{answer}}.",
      answer_value: "vihreä",
      sound_path: "/sounds/colors/sentences/fi/vihreä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_green`],
      language_id: languageMap.uk,
      value: "Цей потяг {{answer}}.",
      answer_value: "зелений",
      sound_path: "/sounds/colors/sentences/uk/зелений.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_green`],
      language_id: languageMap.ru,
      value: "Этот поезд {{answer}}.",
      answer_value: "зелёный",
      sound_path: "/sounds/colors/sentences/ru/зелёный.mp3"
    },

    // sentence 6
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_blue`],
      language_id: languageMap.en,
      value: "This pen is {{answer}}.",
      answer_value: "blue",
      sound_path: "/sounds/colors/sentences/en/blue.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_blue`],
      language_id: languageMap.fi,
      value: "Tämä kynä on {{answer}}.",
      answer_value: "sininen",
      sound_path: "/sounds/colors/sentences/fi/sininen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_blue`],
      language_id: languageMap.uk,
      value: "Ця ручка {{answer}}.",
      answer_value: "синя",
      sound_path: "/sounds/colors/sentences/uk/синій.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_blue`],
      language_id: languageMap.ru,
      value: "Эта ручка {{answer}}.",
      answer_value: "синяя",
      sound_path: "/sounds/colors/sentences/ru/синий.mp3"
    },

    // sentence 7
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_purple`],
      language_id: languageMap.en,
      value: "This flower is {{answer}}.",
      answer_value: "purple",
      sound_path: "/sounds/colors/sentences/en/purple.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_purple`],
      language_id: languageMap.fi,
      value: "Tämä kukka on {{answer}}.",
      answer_value: "violetti",
      sound_path: "/sounds/colors/sentences/fi/violetti.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_purple`],
      language_id: languageMap.uk,
      value: "Ця квітка {{answer}}.",
      answer_value: "фіолетова",
      sound_path: "/sounds/colors/sentences/uk/фіолетовий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_purple`],
      language_id: languageMap.ru,
      value: "Этот цветок {{answer}}.",
      answer_value: "фиолетовый",
      sound_path: "/sounds/colors/sentences/ru/фиолетовый.mp3"
    },

    // sentence 8
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_pink`],
      language_id: languageMap.en,
      value: "This ice cream is {{answer}}.",
      answer_value: "pink",
      sound_path: "/sounds/colors/sentences/en/pink.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_pink`],
      language_id: languageMap.fi,
      value: "Tämä jäätelö on {{answer}}.",
      answer_value: "vaaleanpunainen",
      sound_path: "/sounds/colors/sentences/fi/vaaleanpunainen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_pink`],
      language_id: languageMap.uk,
      value: "Це морозиво {{answer}}.",
      answer_value: "рожеве",
      sound_path: "/sounds/colors/sentences/uk/рожевий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_pink`],
      language_id: languageMap.ru,
      value: "Это мороженое {{answer}}.",
      answer_value: "розовое",
      sound_path: "/sounds/colors/sentences/ru/розовый.mp3"
    },

    // sentence 9
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_white`],
      language_id: languageMap.en,
      value: "Milk is {{answer}}.",
      answer_value: "white",
      sound_path: "/sounds/colors/sentences/en/white.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_white`],
      language_id: languageMap.fi,
      value: "Maito on {{answer}}.",
      answer_value: "valkoista",
      sound_path: "/sounds/colors/sentences/fi/valkoinen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_white`],
      language_id: languageMap.uk,
      value: "Молоко {{answer}}.",
      answer_value: "біле",
      sound_path: "/sounds/colors/sentences/uk/білий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_white`],
      language_id: languageMap.ru,
      value: "Молоко {{answer}}.",
      answer_value: "белое",
      sound_path: "/sounds/colors/sentences/ru/белый.mp3"
    },

    // sentence 10
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_grey`],
      language_id: languageMap.en,
      value: "These notebooks are {{answer}}.",
      answer_value: "grey",
      sound_path: "/sounds/colors/sentences/en/grey.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_grey`],
      language_id: languageMap.fi,
      value: "Nämä vihkot ovat {{answer}}.",
      answer_value: "harmaita",
      sound_path: "/sounds/colors/sentences/fi/harmaa.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_grey`],
      language_id: languageMap.uk,
      value: "Ці зошити {{answer}}.",
      answer_value: "сірі",
      sound_path: "/sounds/colors/sentences/uk/сірий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_grey`],
      language_id: languageMap.ru,
      value: "Эти тетради {{answer}}.",
      answer_value: "серые",
      sound_path: "/sounds/colors/sentences/ru/серый.mp3"
    },

    // sentence 11
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_brown`],
      language_id: languageMap.en,
      value: "These pencils are {{answer}}.",
      answer_value: "brown",
      sound_path: "/sounds/colors/sentences/en/brown.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_brown`],
      language_id: languageMap.fi,
      value: "Nämä lyijykynät ovat {{answer}}.",
      answer_value: "ruskeita",
      sound_path: "/sounds/colors/sentences/fi/ruskea.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_brown`],
      language_id: languageMap.uk,
      value: "Ці олівці {{answer}}.",
      answer_value: "коричневі",
      sound_path: "/sounds/colors/sentences/uk/коричневий.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_brown`],
      language_id: languageMap.ru,
      value: "Эти карандаши {{answer}}.",
      answer_value: "коричневые",
      sound_path: "/sounds/colors/sentences/ru/коричневый.mp3"
    },

    // sentence 12
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_black`],
      language_id: languageMap.en,
      value: "My backpack is {{answer}}.",
      answer_value: "black",
      sound_path: "/sounds/colors/sentences/en/black.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_black`],
      language_id: languageMap.fi,
      value: "Minun reppu on {{answer}}.",
      answer_value: "musta",
      sound_path: "/sounds/colors/sentences/fi/musta.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_black`],
      language_id: languageMap.uk,
      value: "Мій рюкзак {{answer}}.",
      answer_value: "чорний",
      sound_path: "/sounds/colors/sentences/uk/чорний.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_sentence_black`],
      language_id: languageMap.ru,
      value: "Мой рюкзак {{answer}}.",
      answer_value: "чёрный",
      sound_path: "/sounds/colors/sentences/ru/чёрный.mp3"
    },

    // TEXT
    {
      content_id: contentMap[`${categoryMap.colors}_text_colors`],
      language_id: languageMap.en,
      value: "Hi! My name is Emma! My favourite color is green. I have a green backpack and a green bicycle. My sister likes pink. She has a pink notebook. My brother's favourite color is blue. He has a blue motorbike. My mother likes red, and my father likes black. My grandmother likes orange, and my grandfather likes grey. My uncle's favourite color is brown, and my aunt's favourite color is purple. Our family has a yellow car. Our world is full of different colors!",
      sound_path: "/sounds/colors/text/en_colors.mp3",
      title: "Colors"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_text_colors`],
      language_id: languageMap.fi,
      value: "Hei! Minun nimi on Emma! Minun lempiväri on vihreä. Minulla on vihreä reppu ja vihreä polkupyörä. Minun sisko pitää vaaleanpunaisesta. Hänellä on vaaleanpunainen vihko. Minun veljen lempiväri on sininen. Hänellä on sininen moottoripyörä. Minun äiti pitää punaisesta, ja minun isä pitää mustasta. Minun isoäiti pitää oranssista, ja minun isoisä pitää harmaasta. Minun sedän lempiväri on ruskea, ja minun tädin lempiväri on violetti. Meidän perheellä on keltainen auto. Meidän maailma on täynnä erilaisia värejä!",
      sound_path: "/sounds/colors/text/fi_colors.mp3",
      title: "Värit"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_text_colors`],
      language_id: languageMap.uk,
      value: "Привіт! Мене звати Емма! Мій улюблений колір — зелений. У мене є зелений рюкзак і зелений велосипед. Моя сестра любить рожевий колір. У неї є рожевий зошит. Улюблений колір мого брата — синій. У нього є синій мотоцикл. Моя мама любить червоний колір, а мій тато — чорний. Моя бабуся любить помаранчевий колір, а мій дідусь — сірий. Улюблений колір мого дядька — коричневий, а улюблений колір моєї тітки — фіолетовий. У нашої сім'ї є жовта машина. Наш світ сповнений різних кольорів!",
      sound_path: "/sounds/colors/text/uk_colors.mp3",
      title: "Кольори"
    },
    {
      content_id: contentMap[`${categoryMap.colors}_text_colors`],
      language_id: languageMap.ru,
      value: "Привет! Меня зовут Эмма! Мой любимый цвет — зелёный. У меня есть зелёный рюкзак и зелёный велосипед. Моя сестра любит розовый цвет. У неё есть розовая тетрадь. Любимый цвет моего брата — синий. У него есть синий мотоцикл. Моя мама любит красный цвет, а мой папа — чёрный. Моя бабушка любит оранжевый цвет, а мой дедушка — серый. Любимый цвет моего дяди — коричневый, а любимый цвет моей тёти — фиолетовый. У нашей семьи есть жёлтая машина. Наш мир полон разных цветов!",
      sound_path: "/sounds/colors/text/ru_colors.mp3",
      title: "Цвета"
    },
])
  .onConflict(["content_id", "language_id"])
  .merge([ "value", "answer_value", "sound_path", "title" ]);
};