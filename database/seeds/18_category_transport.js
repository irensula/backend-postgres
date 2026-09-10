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
    { type: "word", slug: "transport", image_path: "/images/transport/transport.png", category_id: categoryMap.transport },
    { type: "word", slug: "bicycle", image_path: "/images/transport/bicycle.png", category_id: categoryMap.transport },
    { type: "word", slug: "car", image_path: "/images/transport/car.png", category_id: categoryMap.transport },
    { type: "word", slug: "bus", image_path: "/images/transport/bus.png", category_id: categoryMap.transport },
    { type: "word", slug: "trolleybus", image_path: "/images/transport/trolleybus.png", category_id: categoryMap.transport },
    { type: "word", slug: "metro", image_path: "/images/transport/metro.png", category_id: categoryMap.transport },
    { type: "word", slug: "train", image_path: "/images/transport/train.png", category_id: categoryMap.transport },
    { type: "word", slug: "airplane", image_path: "/images/transport/airplane.png", category_id: categoryMap.transport },
    { type: "word", slug: "ship", image_path: "/images/transport/ship.png", category_id: categoryMap.transport },
    { type: "word", slug: "motorcycle", image_path: "/images/transport/motorcycle.png", category_id: categoryMap.transport },
    { type: "word", slug: "road", image_path: "/images/transport/road.png", category_id: categoryMap.transport },
    { type: "word", slug: "sidewalk", image_path: "/images/transport/sidewalk.png", category_id: categoryMap.transport },
    { type: "word", slug: "crosswalk", image_path: "/images/transport/crosswalk.png", category_id: categoryMap.transport },
    { type: "word", slug: "traffic light", image_path: "/images/transport/traffic_light.png", category_id: categoryMap.transport },

    // SENTENCES
    { type: "sentence", slug: "transport", image_path: "/images/transport/transport.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "bicycle", image_path: "/images/transport/bicycle.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "car", image_path: "/images/transport/car.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "bus", image_path: "/images/transport/bus.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "trolleybus", image_path: "/images/transport/trolleybus.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "metro", image_path: "/images/transport/metro.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "train", image_path: "/images/transport/train.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "airplane", image_path: "/images/transport/airplane.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "ship", image_path: "/images/transport/ship.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "motorcycle", image_path: "/images/transport/motorcycle.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "road", image_path: "/images/transport/road.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "sidewalk", image_path: "/images/transport/sidewalk.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "crosswalk", image_path: "/images/transport/crosswalk.png", category_id: categoryMap.transport },
    { type: "sentence", slug: "traffic light", image_path: "/images/transport/traffic light.png", category_id: categoryMap.transport },

    // TEXT
    { type: "text", slug: "transport", image_path: "/images/texts/transport_image.png", category_id: categoryMap.transport },
])
  .onConflict(["category_id", "type", "slug"])
  .merge(["image_path"]);

  const content = await knex("content")
      .select("content_id", "category_id", "type", "slug")
      .where("category_id", categoryMap.transport);

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
      content_id: contentMap[`${categoryMap.transport}_word_transport`],
      language_id: languageMap.en,
      value: "transport",
      sound_path: "/sounds/transport/words/en/transport.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_transport`],
      language_id: languageMap.fi,
      value: "liikenne",
      sound_path: "/sounds/transport/words/fi/liikenne.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_transport`],
      language_id: languageMap.uk,
      value: "транспорт",
      sound_path: "/sounds/transport/words/uk/транспорт.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_transport`],
      language_id: languageMap.ru,
      value: "транспорт",
      sound_path: "/sounds/transport/words/ru/транспорт.mp3"
    },

    // word 2
    {
      content_id: contentMap[`${categoryMap.transport}_word_bicycle`],
      language_id: languageMap.en,
      value: "bicycle",
      sound_path: "/sounds/transport/words/en/bicycle.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_bicycle`],
      language_id: languageMap.fi,
      value: "polkupyörä",
      sound_path: "/sounds/transport/words/fi/polkupyörä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_bicycle`],
      language_id: languageMap.uk,
      value: "велосипед",
      sound_path: "/sounds/transport/words/uk/велосипед.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_bicycle`],
      language_id: languageMap.ru,
      value: "велосипед",
      sound_path: "/sounds/transport/words/ru/велосипед.mp3"
    },

    // word 3
    {
      content_id: contentMap[`${categoryMap.transport}_word_car`],
      language_id: languageMap.en,
      value: "car",
      sound_path: "/sounds/transport/words/en/car.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_car`],
      language_id: languageMap.fi,
      value: "auto",
      sound_path: "/sounds/transport/words/fi/auto.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_car`],
      language_id: languageMap.uk,
      value: "автомобіль",
      sound_path: "/sounds/transport/words/uk/автомобіль.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_car`],
      language_id: languageMap.ru,
      value: "машина",
      sound_path: "/sounds/transport/words/ru/машина.mp3"
    },

    // word 4
    {
      content_id: contentMap[`${categoryMap.transport}_word_bus`],
      language_id: languageMap.en,
      value: "bus",
      sound_path: "/sounds/transport/words/en/bus.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_bus`],
      language_id: languageMap.fi,
      value: "bussi",
      sound_path: "/sounds/transport/words/fi/bussi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_bus`],
      language_id: languageMap.uk,
      value: "автобус",
      sound_path: "/sounds/transport/words/uk/автобус.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_bus`],
      language_id: languageMap.ru,
      value: "автобус",
      sound_path: "/sounds/transport/words/ru/автобус.mp3"
    },

    // word 5
    {
      content_id: contentMap[`${categoryMap.transport}_word_trolleybus`],
      language_id: languageMap.en,
      value: "trolleybus",
      sound_path: "/sounds/transport/words/en/trolleybus.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_trolleybus`],
      language_id: languageMap.fi,
      value: "johdinauto",
      sound_path: "/sounds/transport/words/fi/johdinauto.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_trolleybus`],
      language_id: languageMap.uk,
      value: "тролейбус",
      sound_path: "/sounds/transport/words/uk/тролейбус.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_trolleybus`],
      language_id: languageMap.ru,
      value: "троллейбус",
      sound_path: "/sounds/transport/words/ru/троллейбус.mp3"
    },

    // word 6
    {
      content_id: contentMap[`${categoryMap.transport}_word_metro`],
      language_id: languageMap.en,
      value: "metro",
      sound_path: "/sounds/transport/words/en/metro.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_metro`],
      language_id: languageMap.fi,
      value: "metro",
      sound_path: "/sounds/transport/words/fi/metro.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_metro`],
      language_id: languageMap.uk,
      value: "метро",
      sound_path: "/sounds/transport/words/uk/метро.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_metro`],
      language_id: languageMap.ru,
      value: "метро",
      sound_path: "/sounds/transport/words/ru/метро.mp3"
    },

    // word 7
    {
      content_id: contentMap[`${categoryMap.transport}_word_train`],
      language_id: languageMap.en,
      value: "train",
      sound_path: "/sounds/transport/words/en/train.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_train`],
      language_id: languageMap.fi,
      value: "juna",
      sound_path: "/sounds/transport/words/fi/juna.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_train`],
      language_id: languageMap.uk,
      value: "потяг",
      sound_path: "/sounds/transport/words/uk/потяг.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_train`],
      language_id: languageMap.ru,
      value: "поезд",
      sound_path: "/sounds/transport/words/ru/поезд.mp3"
    },

    // word 8
    {
      content_id: contentMap[`${categoryMap.transport}_word_airplane`],
      language_id: languageMap.en,
      value: "airplane",
      sound_path: "/sounds/transport/words/en/airplane.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_airplane`],
      language_id: languageMap.fi,
      value: "lentokone",
      sound_path: "/sounds/transport/words/fi/lentokone.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_airplane`],
      language_id: languageMap.uk,
      value: "літак",
      sound_path: "/sounds/transport/words/uk/літак.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_airplane`],
      language_id: languageMap.ru,
      value: "самолёт",
      sound_path: "/sounds/transport/words/ru/самолёт.mp3"
    },

    // word 9
    {
      content_id: contentMap[`${categoryMap.transport}_word_ship`],
      language_id: languageMap.en,
      value: "ship",
      sound_path: "/sounds/transport/words/en/ship.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_ship`],
      language_id: languageMap.fi,
      value: "laiva",
      sound_path: "/sounds/transport/words/fi/laiva.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_ship`],
      language_id: languageMap.uk,
      value: "корабель",
      sound_path: "/sounds/transport/words/uk/корабель.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_ship`],
      language_id: languageMap.ru,
      value: "корабль",
      sound_path: "/sounds/transport/words/ru/корабль.mp3"
    },

    // word 10
    {
      content_id: contentMap[`${categoryMap.transport}_word_motorcycle`],
      language_id: languageMap.en,
      value: "motorcycle",
      sound_path: "/sounds/transport/words/en/motorcycle.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_motorcycle`],
      language_id: languageMap.fi,
      value: "moottoripyörä",
      sound_path: "/sounds/transport/words/fi/moottoripyörä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_motorcycle`],
      language_id: languageMap.uk,
      value: "мотоцикл",
      sound_path: "/sounds/transport/words/uk/мотоцикл.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_motorcycle`],
      language_id: languageMap.ru,
      value: "мотоцикл",
      sound_path: "/sounds/transport/words/ru/мотоцикл.mp3"
    },

    // word 11
    {
      content_id: contentMap[`${categoryMap.transport}_word_road`],
      language_id: languageMap.en,
      value: "road",
      sound_path: "/sounds/transport/words/en/road.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_road`],
      language_id: languageMap.fi,
      value: "tie",
      sound_path: "/sounds/transport/words/fi/tie.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_road`],
      language_id: languageMap.uk,
      value: "дорога",
      sound_path: "/sounds/transport/words/uk/дорога.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_road`],
      language_id: languageMap.ru,
      value: "дорога",
      sound_path: "/sounds/transport/words/ru/дорога.mp3"
    },

    // word 12
    {
      content_id: contentMap[`${categoryMap.transport}_word_sidewalk`],
      language_id: languageMap.en,
      value: "sidewalk",
      sound_path: "/sounds/transport/words/en/sidewalk.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_sidewalk`],
      language_id: languageMap.fi,
      value: "jalkakäytävä",
      sound_path: "/sounds/transport/words/fi/jalkakäytävä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_sidewalk`],
      language_id: languageMap.uk,
      value: "тротуар",
      sound_path: "/sounds/transport/words/uk/тротуар.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_sidewalk`],
      language_id: languageMap.ru,
      value: "тротуар",
      sound_path: "/sounds/transport/words/ru/тротуар.mp3"
    },

    // word 13
    {
      content_id: contentMap[`${categoryMap.transport}_word_crosswalk`],
      language_id: languageMap.en,
      value: "crosswalk",
      sound_path: "/sounds/transport/words/en/crosswalk.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_crosswalk`],
      language_id: languageMap.fi,
      value: "suojatie",
      sound_path: "/sounds/transport/words/fi/suojatie.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_crosswalk`],
      language_id: languageMap.uk,
      value: "пішохідний перехід",
      sound_path: "/sounds/transport/words/uk/пішохідний перехід.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_crosswalk`],
      language_id: languageMap.ru,
      value: "пешеходный переход",
      sound_path: "/sounds/transport/words/ru/пешеходный переход.mp3"
    },

    // word 14
    {
      content_id: contentMap[`${categoryMap.transport}_word_traffic light`],
      language_id: languageMap.en,
      value: "traffic light",
      sound_path: "/sounds/transport/words/en/traffic light.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_traffic light`],
      language_id: languageMap.fi,
      value: "liikennevalo",
      sound_path: "/sounds/transport/words/fi/liikennevalo.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_traffic light`],
      language_id: languageMap.uk,
      value: "світлофор",
      sound_path: "/sounds/transport/words/uk/світлофор.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_word_traffic light`],
      language_id: languageMap.ru,
      value: "светофор",
      sound_path: "/sounds/transport/words/ru/светофор.mp3"
    },

    // SENTENCES

    // sentence 1
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_transport`],
      language_id: languageMap.en,
      value: "We use {{answer}} every day.",
      answer_value: "transport",
      sound_path: "/sounds/transport/sentences/en/transport.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_transport`],
      language_id: languageMap.fi,
      value: "Käytämme {{answer}} joka päivä.",
      answer_value: "liikennettä",
      sound_path: "/sounds/transport/sentences/fi/liikenne.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_transport`],
      language_id: languageMap.uk,
      value: "Ми користуємося {{answer}} щодня.",
      answer_value: "транспортом",
      sound_path: "/sounds/transport/sentences/uk/транспорт.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_transport`],
      language_id: languageMap.ru,
      value: "Мы пользуемся {{answer}} каждый день.",
      answer_value: "транспортом",
      sound_path: "/sounds/transport/sentences/ru/транспорт.mp3"
    },

    // sentence 2
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_bicycle`],
      language_id: languageMap.en,
      value: "I ride my {{answer}} to school.",
      answer_value: "bicycle",
      sound_path: "/sounds/transport/sentences/en/bicycle.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_bicycle`],
      language_id: languageMap.fi,
      value: "Menen kouluun {{answer}}.",
      answer_value: "polkupyörällä",
      sound_path: "/sounds/transport/sentences/fi/polkupyörä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_bicycle`],
      language_id: languageMap.uk,
      value: "Я їду до школи на {{answer}}.",
      answer_value: "велосипеді",
      sound_path: "/sounds/transport/sentences/uk/велосипед.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_bicycle`],
      language_id: languageMap.ru,
      value: "Я езжу в школу на {{answer}}.",
      answer_value: "велосипеде",
      sound_path: "/sounds/transport/sentences/ru/велосипед.mp3"
    },

    // sentence 3
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_car`],
      language_id: languageMap.en,
      value: "My father goes by {{answer}}.",
      answer_value: "car",
      sound_path: "/sounds/transport/sentences/en/car.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_car`],
      language_id: languageMap.fi,
      value: "Minun isä menee {{answer}}.",
      answer_value: "autolla",
      sound_path: "/sounds/transport/sentences/fi/auto.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_car`],
      language_id: languageMap.uk,
      value: "Мій тато їде на {{answer}}.",
      answer_value: "машині",
      sound_path: "/sounds/transport/sentences/uk/автомобіль.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_car`],
      language_id: languageMap.ru,
      value: "Мой папа ездит на {{answer}}.",
      answer_value: "машине",
      sound_path: "/sounds/transport/sentences/ru/машина.mp3"
    },

    // sentence 4
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_bus`],
      language_id: languageMap.en,
      value: "My mother goes by {{answer}}.",
      answer_value: "bus",
      sound_path: "/sounds/transport/sentences/en/bus.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_bus`],
      language_id: languageMap.fi,
      value: "Minun äiti menee {{answer}}.",
      answer_value: "bussilla",
      sound_path: "/sounds/transport/sentences/fi/bussi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_bus`],
      language_id: languageMap.uk,
      value: "Моя мама їде {{answer}}.",
      answer_value: "автобусом",
      sound_path: "/sounds/transport/sentences/uk/автобус.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_bus`],
      language_id: languageMap.ru,
      value: "Моя мама ездит на {{answer}}.",
      answer_value: "автобусе",
      sound_path: "/sounds/transport/sentences/ru/автобус.mp3"
    },

    // sentence 5
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_trolleybus`],
      language_id: languageMap.en,
      value: "My sister goes by {{answer}}.",
      answer_value: "trolleybus",
      sound_path: "/sounds/transport/sentences/en/trolleybus.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_trolleybus`],
      language_id: languageMap.fi,
      value: "Minun sisko menee {{answer}}.",
      answer_value: "johdinautolla",
      sound_path: "/sounds/transport/sentences/fi/johdinauto.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_trolleybus`],
      language_id: languageMap.uk,
      value: "Моя сестра їде {{answer}}.",
      answer_value: "тролейбусом",
      sound_path: "/sounds/transport/sentences/uk/тролейбус.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_trolleybus`],
      language_id: languageMap.ru,
      value: "Моя сестра ездит на {{answer}}.",
      answer_value: "троллейбусе",
      sound_path: "/sounds/transport/sentences/ru/троллейбус.mp3"
    },

    // sentence 6
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_metro`],
      language_id: languageMap.en,
      value: "My brother goes by {{answer}}.",
      answer_value: "metro",
      sound_path: "/sounds/transport/sentences/en/metro.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_metro`],
      language_id: languageMap.fi,
      value: "Minun veli menee {{answer}}.",
      answer_value: "metrolla",
      sound_path: "/sounds/transport/sentences/fi/metro.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_metro`],
      language_id: languageMap.uk,
      value: "Мій брат їде на {{answer}}.",
      answer_value: "метро",
      sound_path: "/sounds/transport/sentences/uk/метро.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_metro`],
      language_id: languageMap.ru,
      value: "Мой брат ездит на {{answer}}.",
      answer_value: "метро",
      sound_path: "/sounds/transport/sentences/ru/метро.mp3"
    },

    // sentence 7
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_train`],
      language_id: languageMap.en,
      value: "My family travels by {{answer}}.",
      answer_value: "train",
      sound_path: "/sounds/transport/sentences/en/train.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_train`],
      language_id: languageMap.fi,
      value: "Minun perhe matkustaa {{answer}}.",
      answer_value: "junalla",
      sound_path: "/sounds/transport/sentences/fi/juna.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_train`],
      language_id: languageMap.uk,
      value: "Моя сім'я подорожує {{answer}}.",
      answer_value: "потягом",
      sound_path: "/sounds/transport/sentences/uk/потяг.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_train`],
      language_id: languageMap.ru,
      value: "Моя семья путешествует на {{answer}}.",
      answer_value: "поезде",
      sound_path: "/sounds/transport/sentences/ru/поезд.mp3"
    },

    // sentence 8
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_airplane`],
      language_id: languageMap.en,
      value: "We travel by {{answer}}.",
      answer_value: "airplane",
      sound_path: "/sounds/transport/sentences/en/airplane.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_airplane`],
      language_id: languageMap.fi,
      value: "Me matkustamme {{answer}}.",
      answer_value: "lentokoneella",
      sound_path: "/sounds/transport/sentences/fi/lentokone.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_airplane`],
      language_id: languageMap.uk,
      value: "Ми подорожуємо {{answer}}.",
      answer_value: "літаком",
      sound_path: "/sounds/transport/sentences/uk/літак.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_airplane`],
      language_id: languageMap.ru,
      value: "Мы путешествуем на {{answer}}.",
      answer_value: "самолёте",
      sound_path: "/sounds/transport/sentences/ru/самолёт.mp3"
    },

    // sentence 9
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_ship`],
      language_id: languageMap.en,
      value: "My grandmother and grandfather travel by {{answer}}.",
      answer_value: "ship",
      sound_path: "/sounds/transport/sentences/en/ship.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_ship`],
      language_id: languageMap.fi,
      value: "Minun isoäiti ja isoisä matkustavat {{answer}}.",
      answer_value: "laivalla",
      sound_path: "/sounds/transport/sentences/fi/laiva.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_ship`],
      language_id: languageMap.uk,
      value: "Мої бабуся та дідусь подорожують {{answer}}.",
      answer_value: "кораблем",
      sound_path: "/sounds/transport/sentences/uk/корабель.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_ship`],
      language_id: languageMap.ru,
      value: "Мои бабушка и дедушка путешествуют на {{answer}}.",
      answer_value: "корабле",
      sound_path: "/sounds/transport/sentences/ru/корабль.mp3"
    },

    // sentence 10
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_motorcycle`],
      language_id: languageMap.en,
      value: "My brother rides a {{answer}}.",
      answer_value: "motorcycle",
      sound_path: "/sounds/transport/sentences/en/motorcycle.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_motorcycle`],
      language_id: languageMap.fi,
      value: "Minun veli ajaa {{answer}}.",
      answer_value: "moottoripyörällä",
      sound_path: "/sounds/transport/sentences/fi/moottoripyörä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_motorcycle`],
      language_id: languageMap.uk,
      value: "Мій брат їздить на {{answer}}.",
      answer_value: "мотоциклі",
      sound_path: "/sounds/transport/sentences/uk/мотоцикл.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_motorcycle`],
      language_id: languageMap.ru,
      value: "Мой брат ездит на {{answer}}.",
      answer_value: "мотоцикле",
      sound_path: "/sounds/transport/sentences/ru/мотоцикл.mp3"
    },

    // sentence 11
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_road`],
      language_id: languageMap.en,
      value: "The car is on the {{answer}}.",
      answer_value: "road",
      sound_path: "/sounds/transport/sentences/en/road.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_road`],
      language_id: languageMap.fi,
      value: "Auto on {{answer}}.",
      answer_value: "tiellä",
      sound_path: "/sounds/transport/sentences/fi/tie.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_road`],
      language_id: languageMap.uk,
      value: "Машина на {{answer}}.",
      answer_value: "дорозі",
      sound_path: "/sounds/transport/sentences/uk/дорога.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_road`],
      language_id: languageMap.ru,
      value: "Машина на {{answer}}.",
      answer_value: "дороге",
      sound_path: "/sounds/transport/sentences/ru/дорога.mp3"
    },

    // sentence 12
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_sidewalk`],
      language_id: languageMap.en,
      value: "I walk on the {{answer}}.",
      answer_value: "sidewalk",
      sound_path: "/sounds/transport/sentences/en/sidewalk.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_sidewalk`],
      language_id: languageMap.fi,
      value: "Kävelen {{answer}}.",
      answer_value: "jalkakäytävällä",
      sound_path: "/sounds/transport/sentences/fi/jalkakäytävä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_sidewalk`],
      language_id: languageMap.uk,
      value: "Я йду {{answer}}.",
      answer_value: "тротуаром",
      sound_path: "/sounds/transport/sentences/uk/тротуар.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_sidewalk`],
      language_id: languageMap.ru,
      value: "Я иду по {{answer}}.",
      answer_value: "тротуару",
      sound_path: "/sounds/transport/sentences/ru/тротуар.mp3"
    },

    // sentence 13
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_crosswalk`],
      language_id: languageMap.en,
      value: "We cross the road at the {{answer}}.",
      answer_value: "crosswalk",
      sound_path: "/sounds/transport/sentences/en/crosswalk.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_crosswalk`],
      language_id: languageMap.fi,
      value: "Ylitämme tien {{answer}} pitkin.",
      answer_value: "suojatietä",
      sound_path: "/sounds/transport/sentences/fi/suojatie.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_crosswalk`],
      language_id: languageMap.uk,
      value: "Ми переходимо дорогу на {{answer}}.",
      answer_value: "пішохідному переході",
      sound_path: "/sounds/transport/sentences/uk/пішохідний перехід.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_crosswalk`],
      language_id: languageMap.ru,
      value: "Мы переходим дорогу по {{answer}}.",
      answer_value: "пешеходному переходу",
      sound_path: "/sounds/transport/sentences/ru/пешеходный переход.mp3"
    },

    // sentence 14
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_traffic light`],
      language_id: languageMap.en,
      value: "The {{answer}} is red.",
      answer_value: "traffic light",
      sound_path: "/sounds/transport/sentences/en/traffic light.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_traffic light`],
      language_id: languageMap.fi,
      value: "{{answer}} on punainen.",
      answer_value: "Liikennevalo",
      sound_path: "/sounds/transport/sentences/fi/liikennevalo.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_traffic light`],
      language_id: languageMap.uk,
      value: "{{answer}} червоний.",
      answer_value: "Світлофор",
      sound_path: "/sounds/transport/sentences/uk/світлофор.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_sentence_traffic light`],
      language_id: languageMap.ru,
      value: "{{answer}} красный.",
      answer_value: "Светофор",
      sound_path: "/sounds/transport/sentences/ru/светофор.mp3"
    },

    // TEXT
    {
      content_id: contentMap[`${categoryMap.transport}_text_transport`],
      language_id: languageMap.en,
      value: "We use transport every day. I go to school by bicycle. My father goes to work by car, and my mother goes to work by bus. My aunt goes to work by trolleybus. My uncle goes to work by metro. Sometimes my family travels by train or airplane. My grandmother and grandfather travel by ship. My brother rides a motorcycle. We walk on the sidewalk and cross the road at the crosswalk. We stop when the traffic light is red. I like travelling with my family.",
      sound_path: "/sounds/transport/text/en_transport.mp3",
      title: "Transport"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_text_transport`],
      language_id: languageMap.fi,
      value: "Käytämme kulkuvälineitä joka päivä. Menen kouluun polkupyörällä. Minun isä menee töihin autolla, ja minun äiti menee töihin bussilla. Täti menee töihin raitiovaunulla. Setä menee töihin metrolla. Joskus meidän perhee matkustaa junalla tai lentokoneella. Minun isoäiti ja isoisä matkustavat laivalla. Veli ajaa moottoripyörällä. Kävelemme jalkakäytävällä ja ylitämme tien suojatiellä. Pysähdymme, kun liikennevalo on punainen. Pidän matkustamisesta minun perheen kanssa.",
      sound_path: "/sounds/transport/text/fi_transport.mp3",
      title: "Liikenne"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_text_transport`],
      language_id: languageMap.uk,
      value: "Ми користуємося транспортом щодня. Я їду до школи на велосипеді. Мій тато їде на роботу машиною, а моя мама їде на роботу автобусом. Моя тітка їде на роботу тролейбусом. Мій дядько їде на роботу на метро. Іноді моя сім'я подорожує потягом або літаком. Мої бабуся та дідусь подорожують кораблем. Мій брат їздить на мотоциклі. Ми ходимо тротуаром і переходимо дорогу на пішохідному переході. Ми зупиняємося, коли світлофор червоний. Я люблю подорожувати зі своєю сім'єю.",
      sound_path: "/sounds/transport/text/uk_transport.mp3",
      title: "Транспорт"
    },
    {
      content_id: contentMap[`${categoryMap.transport}_text_transport`],
      language_id: languageMap.ru,
      value: "Мы пользуемся транспортом каждый день. Я езжу в школу на велосипеде. Мой папа ездит на работу на машине, а моя мама ездит на работу на автобусе. Моя тётя ездит на работу на троллейбусе. Мой дядя ездит на работу на метро. Иногда моя семья путешествует на поезде или самолёте. Мои бабушка и дедушка путешествуют на корабле. Мой брат ездит на мотоцикле. Мы ходим по тротуару и переходим дорогу по пешеходному переходу. Мы останавливаемся, когда светофор красный. Я люблю путешествовать со своей семьёй.",
      sound_path: "/sounds/transport/text/ru_transport.mp3",
      title: "Транспорт"
    },
])
  .onConflict(["content_id", "language_id"])
  .merge([ "value", "answer_value", "sound_path", "title" ]);
};