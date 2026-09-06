/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {

  const categories = await knex('categories').select('*');

  const languages = await knex("languages").select("*");

  const languageMap = Object.fromEntries(
    languages.map(lang => [lang.code, lang])
  );

  // 10. CONTENT

  const content = await knex('content').insert([

    // WORDS
    { type: "word", image_path: "/images/colors/color.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/red.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/orange.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/yellow.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/green.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/blue.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/purple.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/pink.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/white.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/grey.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/brown.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/colors/black.png", category_id: categories[4].category_id },

    // SENTENCES
    { type: "sentence", image_path: "/images/colors/color.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/red.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/orange.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/yellow.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/green.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/blue.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/purple.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/pink.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/white.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/grey.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/brown.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/colors/black.png", category_id: categories[4].category_id },

    // TEXT
    { type: "text", image_path: "/images/texts/colors_image.png", category_id: categories[4].category_id },

  ]).returning("*");

  // 11. CONTENT TRANSLATIONS

  const content_translations = await knex('content_translations').insert([

    // WORDS

    // word 1
    {
      content_id: content[0].content_id,
      language_id: languageMap.en.language_id,
      value: "color",
      sound_path: "/sounds/colors/words/en/color.mp3"
    },
    {
      content_id: content[0].content_id,
      language_id: languageMap.fi.language_id,
      value: "väri",
      sound_path: "/sounds/colors/words/fi/väri.mp3"
    },
    {
      content_id: content[0].content_id,
      language_id: languageMap.uk.language_id,
      value: "колір",
      sound_path: "/sounds/colors/words/uk/колір.mp3"
    },
    {
      content_id: content[0].content_id,
      language_id: languageMap.ru.language_id,
      value: "цвет",
      sound_path: "/sounds/colors/words/ru/цвет.mp3"
    },

    // word 2
    {
      content_id: content[1].content_id,
      language_id: languageMap.en.language_id,
      value: "red",
      sound_path: "/sounds/colors/words/en/red.mp3"
    },
    {
      content_id: content[1].content_id,
      language_id: languageMap.fi.language_id,
      value: "punainen",
      sound_path: "/sounds/colors/words/fi/punainen.mp3"
    },
    {
      content_id: content[1].content_id,
      language_id: languageMap.uk.language_id,
      value: "червоний",
      sound_path: "/sounds/colors/words/uk/червоний.mp3"
    },
    {
      content_id: content[1].content_id,
      language_id: languageMap.ru.language_id,
      value: "красный",
      sound_path: "/sounds/colors/words/ru/красный.mp3"
    },

    // word 3
    {
      content_id: content[2].content_id,
      language_id: languageMap.en.language_id,
      value: "orange",
      sound_path: "/sounds/colors/words/en/orange.mp3"
    },
    {
      content_id: content[2].content_id,
      language_id: languageMap.fi.language_id,
      value: "oranssi",
      sound_path: "/sounds/colors/words/fi/oranssi.mp3"
    },
    {
      content_id: content[2].content_id,
      language_id: languageMap.uk.language_id,
      value: "помаранчевий",
      sound_path: "/sounds/colors/words/uk/помаранчевий.mp3"
    },
    {
      content_id: content[2].content_id,
      language_id: languageMap.ru.language_id,
      value: "оранжевый",
      sound_path: "/sounds/colors/words/ru/оранжевый.mp3"
    },

    // word 4
    {
      content_id: content[3].content_id,
      language_id: languageMap.en.language_id,
      value: "yellow",
      sound_path: "/sounds/colors/words/en/yellow.mp3"
    },
    {
      content_id: content[3].content_id,
      language_id: languageMap.fi.language_id,
      value: "keltainen",
      sound_path: "/sounds/colors/words/fi/keltainen.mp3"
    },
    {
      content_id: content[3].content_id,
      language_id: languageMap.uk.language_id,
      value: "жовтий",
      sound_path: "/sounds/colors/words/uk/жовтий.mp3"
    },
    {
      content_id: content[3].content_id,
      language_id: languageMap.ru.language_id,
      value: "жёлтый",
      sound_path: "/sounds/colors/words/ru/жёлтый.mp3"
    },

    // word 5
    {
      content_id: content[4].content_id,
      language_id: languageMap.en.language_id,
      value: "green",
      sound_path: "/sounds/colors/words/en/green.mp3"
    },
    {
      content_id: content[4].content_id,
      language_id: languageMap.fi.language_id,
      value: "vihreä",
      sound_path: "/sounds/colors/words/fi/vihreä.mp3"
    },
    {
      content_id: content[4].content_id,
      language_id: languageMap.uk.language_id,
      value: "зелений",
      sound_path: "/sounds/colors/words/uk/зелений.mp3"
    },
    {
      content_id: content[4].content_id,
      language_id: languageMap.ru.language_id,
      value: "зелёный",
      sound_path: "/sounds/colors/words/ru/зелёный.mp3"
    },

    // word 6
    {
      content_id: content[5].content_id,
      language_id: languageMap.en.language_id,
      value: "blue",
      sound_path: "/sounds/colors/words/en/blue.mp3"
    },
    {
      content_id: content[5].content_id,
      language_id: languageMap.fi.language_id,
      value: "sininen",
      sound_path: "/sounds/colors/words/fi/sininen.mp3"
    },
    {
      content_id: content[5].content_id,
      language_id: languageMap.uk.language_id,
      value: "синій",
      sound_path: "/sounds/colors/words/uk/синій.mp3"
    },
    {
      content_id: content[5].content_id,
      language_id: languageMap.ru.language_id,
      value: "синий",
      sound_path: "/sounds/colors/words/ru/синий.mp3"
    },

    // word 7
    {
      content_id: content[6].content_id,
      language_id: languageMap.en.language_id,
      value: "purple",
      sound_path: "/sounds/colors/words/en/purple.mp3"
    },
    {
      content_id: content[6].content_id,
      language_id: languageMap.fi.language_id,
      value: "violetti",
      sound_path: "/sounds/colors/words/fi/violetti.mp3"
    },
    {
      content_id: content[6].content_id,
      language_id: languageMap.uk.language_id,
      value: "фіолетовий",
      sound_path: "/sounds/colors/words/uk/фіолетовий.mp3"
    },
    {
      content_id: content[6].content_id,
      language_id: languageMap.ru.language_id,
      value: "фиолетовый",
      sound_path: "/sounds/colors/words/ru/фиолетовый.mp3"
    },

    // word 8
    {
      content_id: content[7].content_id,
      language_id: languageMap.en.language_id,
      value: "pink",
      sound_path: "/sounds/colors/words/en/pink.mp3"
    },
    {
      content_id: content[7].content_id,
      language_id: languageMap.fi.language_id,
      value: "vaaleanpunainen",
      sound_path: "/sounds/colors/words/fi/vaaleanpunainen.mp3"
    },
    {
      content_id: content[7].content_id,
      language_id: languageMap.uk.language_id,
      value: "рожевий",
      sound_path: "/sounds/colors/words/uk/рожевий.mp3"
    },
    {
      content_id: content[7].content_id,
      language_id: languageMap.ru.language_id,
      value: "розовый",
      sound_path: "/sounds/colors/words/ru/розовый.mp3"
    },

    // word 9
    {
      content_id: content[8].content_id,
      language_id: languageMap.en.language_id,
      value: "white",
      sound_path: "/sounds/colors/words/en/white.mp3"
    },
    {
      content_id: content[8].content_id,
      language_id: languageMap.fi.language_id,
      value: "valkoinen",
      sound_path: "/sounds/colors/words/fi/valkoinen.mp3"
    },
    {
      content_id: content[8].content_id,
      language_id: languageMap.uk.language_id,
      value: "білий",
      sound_path: "/sounds/colors/words/uk/білий.mp3"
    },
    {
      content_id: content[8].content_id,
      language_id: languageMap.ru.language_id,
      value: "белый",
      sound_path: "/sounds/colors/words/ru/белый.mp3"
    },

    // word 10
    {
      content_id: content[9].content_id,
      language_id: languageMap.en.language_id,
      value: "grey",
      sound_path: "/sounds/colors/words/en/grey.mp3"
    },
    {
      content_id: content[9].content_id,
      language_id: languageMap.fi.language_id,
      value: "harmaa",
      sound_path: "/sounds/colors/words/fi/harmaa.mp3"
    },
    {
      content_id: content[9].content_id,
      language_id: languageMap.uk.language_id,
      value: "сірий",
      sound_path: "/sounds/colors/words/uk/сірий.mp3"
    },
    {
      content_id: content[9].content_id,
      language_id: languageMap.ru.language_id,
      value: "серый",
      sound_path: "/sounds/colors/words/ru/серый.mp3"
    },

    // word 11
    {
      content_id: content[10].content_id,
      language_id: languageMap.en.language_id,
      value: "brown",
      sound_path: "/sounds/colors/words/en/brown.mp3"
    },
    {
      content_id: content[10].content_id,
      language_id: languageMap.fi.language_id,
      value: "ruskea",
      sound_path: "/sounds/colors/words/fi/ruskea.mp3"
    },
    {
      content_id: content[10].content_id,
      language_id: languageMap.uk.language_id,
      value: "коричневий",
      sound_path: "/sounds/colors/words/uk/коричневий.mp3"
    },
    {
      content_id: content[10].content_id,
      language_id: languageMap.ru.language_id,
      value: "коричневый",
      sound_path: "/sounds/colors/words/ru/коричневый.mp3"
    },

    // word 12
    {
      content_id: content[11].content_id,
      language_id: languageMap.en.language_id,
      value: "black",
      sound_path: "/sounds/colors/words/en/black.mp3"
    },
    {
      content_id: content[11].content_id,
      language_id: languageMap.fi.language_id,
      value: "musta",
      sound_path: "/sounds/colors/words/fi/musta.mp3"
    },
    {
      content_id: content[11].content_id,
      language_id: languageMap.uk.language_id,
      value: "чорний",
      sound_path: "/sounds/colors/words/uk/чорний.mp3"
    },
    {
      content_id: content[11].content_id,
      language_id: languageMap.ru.language_id,
      value: "чёрный",
      sound_path: "/sounds/colors/words/ru/чёрный.mp3"
    },

    // SENTENCES

    // sentence 1
    {
      content_id: content[12].content_id,
      language_id: languageMap.en.language_id,
      value: "My favourite {{color}} is green.",
      answer_value: "color",
      sound_path: "/sounds/colors/sentences/en/color.mp3"
    },
    {
      content_id: content[12].content_id,
      language_id: languageMap.fi.language_id,
      value: "Minun lempiväri on {{vihreä}}.",
      answer_value: "vihreä",
      sound_path: "/sounds/colors/sentences/fi/väri.mp3"
    },
    {
      content_id: content[12].content_id,
      language_id: languageMap.uk.language_id,
      value: "Мій улюблений колір — {{зелений}}.",
      answer_value: "зелений",
      sound_path: "/sounds/colors/sentences/uk/зелений.mp3"
    },
    {
      content_id: content[12].content_id,
      language_id: languageMap.ru.language_id,
      value: "Мой любимый цвет — {{зелёный}}.",
      answer_value: "зелёный",
      sound_path: "/sounds/colors/sentences/ru/цвет.mp3"
    },

    // sentence 2
    {
      content_id: content[13].content_id,
      language_id: languageMap.en.language_id,
      value: "This apple is {{red}}.",
      answer_value: "red",
      sound_path: "/sounds/colors/sentences/en/red.mp3"
    },
    {
      content_id: content[13].content_id,
      language_id: languageMap.fi.language_id,
      value: "Tämä omena on {{punainen}}.",
      answer_value: "punainen",
      sound_path: "/sounds/colors/sentences/fi/punainen.mp3"
    },
    {
      content_id: content[13].content_id,
      language_id: languageMap.uk.language_id,
      value: "Це яблуко {{червоне}}.",
      answer_value: "червоне",
      sound_path: "/sounds/colors/sentences/uk/червоний.mp3"
    },
    {
      content_id: content[13].content_id,
      language_id: languageMap.ru.language_id,
      value: "Это яблоко {{красное}}.",
      answer_value: "красное",
      sound_path: "/sounds/colors/sentences/ru/красный.mp3"
    },

    // sentence 3
    {
      content_id: content[14].content_id,
      language_id: languageMap.en.language_id,
      value: "This car is {{orange}}.",
      answer_value: "orange",
      sound_path: "/sounds/colors/sentences/en/orange.mp3"
    },
    {
      content_id: content[14].content_id,
      language_id: languageMap.fi.language_id,
      value: "Tämä auto on {{oranssi}}.",
      answer_value: "oranssi",
      sound_path: "/sounds/colors/sentences/fi/oranssi.mp3"
    },
    {
      content_id: content[14].content_id,
      language_id: languageMap.uk.language_id,
      value: "Ця машина {{помаранчева}}.",
      answer_value: "помаранчева",
      sound_path: "/sounds/colors/sentences/uk/помаранчевий.mp3"
    },
    {
      content_id: content[14].content_id,
      language_id: languageMap.ru.language_id,
      value: "Эта машина {{оранжевая}}.",
      answer_value: "оранжевая",
      sound_path: "/sounds/colors/sentences/ru/оранжевый.mp3"
    },

    // sentence 4
    {
      content_id: content[15].content_id,
      language_id: languageMap.en.language_id,
      value: "Bananas are {{yellow}}.",
      answer_value: "yellow",
      sound_path: "/sounds/colors/sentences/en/yellow.mp3"
    },
    {
      content_id: content[15].content_id,
      language_id: languageMap.fi.language_id,
      value: "Banaanit ovat {{keltaisia}}.",
      answer_value: "keltaisia",
      sound_path: "/sounds/colors/sentences/fi/keltainen.mp3"
    },
    {
      content_id: content[15].content_id,
      language_id: languageMap.uk.language_id,
      value: "Банани {{жовті}}.",
      answer_value: "жовті",
      sound_path: "/sounds/colors/sentences/uk/жовтий.mp3"
    },
    {
      content_id: content[15].content_id,
      language_id: languageMap.ru.language_id,
      value: "Бананы {{жёлтые}}.",
      answer_value: "жёлтые",
      sound_path: "/sounds/colors/sentences/ru/жёлтый.mp3"
    },

    // sentence 5
    {
      content_id: content[16].content_id,
      language_id: languageMap.en.language_id,
      value: "This train is {{green}}.",
      answer_value: "green",
      sound_path: "/sounds/colors/sentences/en/green.mp3"
    },
    {
      content_id: content[16].content_id,
      language_id: languageMap.fi.language_id,
      value: "Tämä juna on {{vihreä}}.",
      answer_value: "vihreä",
      sound_path: "/sounds/colors/sentences/fi/vihreä.mp3"
    },
    {
      content_id: content[16].content_id,
      language_id: languageMap.uk.language_id,
      value: "Цей потяг {{зелений}}.",
      answer_value: "зелений",
      sound_path: "/sounds/colors/sentences/uk/зелений.mp3"
    },
    {
      content_id: content[16].content_id,
      language_id: languageMap.ru.language_id,
      value: "Этот поезд {{зелёный}}.",
      answer_value: "зелёный",
      sound_path: "/sounds/colors/sentences/ru/зелёный.mp3"
    },

    // sentence 6
    {
      content_id: content[17].content_id,
      language_id: languageMap.en.language_id,
      value: "This pen is {{blue}}.",
      answer_value: "blue",
      sound_path: "/sounds/colors/sentences/en/blue.mp3"
    },
    {
      content_id: content[17].content_id,
      language_id: languageMap.fi.language_id,
      value: "Tämä kynä on {{sininen}}.",
      answer_value: "sininen",
      sound_path: "/sounds/colors/sentences/fi/sininen.mp3"
    },
    {
      content_id: content[17].content_id,
      language_id: languageMap.uk.language_id,
      value: "Ця ручка {{синя}}.",
      answer_value: "синя",
      sound_path: "/sounds/colors/sentences/uk/синій.mp3"
    },
    {
      content_id: content[17].content_id,
      language_id: languageMap.ru.language_id,
      value: "Эта ручка {{синяя}}.",
      answer_value: "синяя",
      sound_path: "/sounds/colors/sentences/ru/синий.mp3"
    },

    // sentence 7
    {
      content_id: content[18].content_id,
      language_id: languageMap.en.language_id,
      value: "This flower is {{purple}}.",
      answer_value: "purple",
      sound_path: "/sounds/colors/sentences/en/purple.mp3"
    },
    {
      content_id: content[18].content_id,
      language_id: languageMap.fi.language_id,
      value: "Tämä kukka on {{violetti}}.",
      answer_value: "violetti",
      sound_path: "/sounds/colors/sentences/fi/violetti.mp3"
    },
    {
      content_id: content[18].content_id,
      language_id: languageMap.uk.language_id,
      value: "Ця квітка {{фіолетова}}.",
      answer_value: "фіолетова",
      sound_path: "/sounds/colors/sentences/uk/фіолетовий.mp3"
    },
    {
      content_id: content[18].content_id,
      language_id: languageMap.ru.language_id,
      value: "Этот цветок {{фиолетовый}}.",
      answer_value: "фиолетовый",
      sound_path: "/sounds/colors/sentences/ru/фиолетовый.mp3"
    },

    // sentence 8
    {
      content_id: content[19].content_id,
      language_id: languageMap.en.language_id,
      value: "This ice cream is {{pink}}.",
      answer_value: "pink",
      sound_path: "/sounds/colors/sentences/en/pink.mp3"
    },
    {
      content_id: content[19].content_id,
      language_id: languageMap.fi.language_id,
      value: "Tämä jäätelö on {{vaaleanpunainen}}.",
      answer_value: "vaaleanpunainen",
      sound_path: "/sounds/colors/sentences/fi/vaaleanpunainen.mp3"
    },
    {
      content_id: content[19].content_id,
      language_id: languageMap.uk.language_id,
      value: "Це морозиво {{рожеве}}.",
      answer_value: "рожеве",
      sound_path: "/sounds/colors/sentences/uk/рожевий.mp3"
    },
    {
      content_id: content[19].content_id,
      language_id: languageMap.ru.language_id,
      value: "Это мороженое {{розовое}}.",
      answer_value: "розовое",
      sound_path: "/sounds/colors/sentences/ru/розовый.mp3"
    },

    // sentence 9
    {
      content_id: content[20].content_id,
      language_id: languageMap.en.language_id,
      value: "Milk is {{white}}.",
      answer_value: "white",
      sound_path: "/sounds/colors/sentences/en/white.mp3"
    },
    {
      content_id: content[20].content_id,
      language_id: languageMap.fi.language_id,
      value: "Maito on {{valkoista}}.",
      answer_value: "valkoista",
      sound_path: "/sounds/colors/sentences/fi/valkoinen.mp3"
    },
    {
      content_id: content[20].content_id,
      language_id: languageMap.uk.language_id,
      value: "Молоко {{біле}}.",
      answer_value: "біле",
      sound_path: "/sounds/colors/sentences/uk/білий.mp3"
    },
    {
      content_id: content[20].content_id,
      language_id: languageMap.ru.language_id,
      value: "Молоко {{белое}}.",
      answer_value: "белое",
      sound_path: "/sounds/colors/sentences/ru/белый.mp3"
    },

    // sentence 10
    {
      content_id: content[21].content_id,
      language_id: languageMap.en.language_id,
      value: "These notebooks are {{grey}}.",
      answer_value: "grey",
      sound_path: "/sounds/colors/sentences/en/grey.mp3"
    },
    {
      content_id: content[21].content_id,
      language_id: languageMap.fi.language_id,
      value: "Nämä vihkot ovat {{harmaita}}.",
      answer_value: "harmaita",
      sound_path: "/sounds/colors/sentences/fi/harmaa.mp3"
    },
    {
      content_id: content[21].content_id,
      language_id: languageMap.uk.language_id,
      value: "Ці зошити {{сірі}}.",
      answer_value: "сірі",
      sound_path: "/sounds/colors/sentences/uk/сірий.mp3"
    },
    {
      content_id: content[21].content_id,
      language_id: languageMap.ru.language_id,
      value: "Эти тетради {{серые}}.",
      answer_value: "серые",
      sound_path: "/sounds/colors/sentences/ru/серый.mp3"
    },

    // sentence 11
    {
      content_id: content[22].content_id,
      language_id: languageMap.en.language_id,
      value: "These pencils are {{brown}}.",
      answer_value: "brown",
      sound_path: "/sounds/colors/sentences/en/brown.mp3"
    },
    {
      content_id: content[22].content_id,
      language_id: languageMap.fi.language_id,
      value: "Nämä lyijykynät ovat {{ruskeita}}.",
      answer_value: "ruskeita",
      sound_path: "/sounds/colors/sentences/fi/ruskea.mp3"
    },
    {
      content_id: content[22].content_id,
      language_id: languageMap.uk.language_id,
      value: "Ці олівці {{коричневі}}.",
      answer_value: "коричневі",
      sound_path: "/sounds/colors/sentences/uk/коричневий.mp3"
    },
    {
      content_id: content[22].content_id,
      language_id: languageMap.ru.language_id,
      value: "Эти карандаши {{коричневые}}.",
      answer_value: "коричневые",
      sound_path: "/sounds/colors/sentences/ru/коричневый.mp3"
    },

    // sentence 12
    {
      content_id: content[23].content_id,
      language_id: languageMap.en.language_id,
      value: "My backpack is {{black}}.",
      answer_value: "black",
      sound_path: "/sounds/colors/sentences/en/black.mp3"
    },
    {
      content_id: content[23].content_id,
      language_id: languageMap.fi.language_id,
      value: "Minun reppu on {{musta}}.",
      answer_value: "musta",
      sound_path: "/sounds/colors/sentences/fi/musta.mp3"
    },
    {
      content_id: content[23].content_id,
      language_id: languageMap.uk.language_id,
      value: "Мій рюкзак {{чорний}}.",
      answer_value: "чорний",
      sound_path: "/sounds/colors/sentences/uk/чорний.mp3"
    },
    {
      content_id: content[23].content_id,
      language_id: languageMap.ru.language_id,
      value: "Мой рюкзак {{чёрный}}.",
      answer_value: "чёрный",
      sound_path: "/sounds/colors/sentences/ru/чёрный.mp3"
    },

    // TEXT
    {
      content_id: content[24].content_id,
      language_id: languageMap.en.language_id,
      value: "Hi! My name is Emma! My favourite color is green. I have a green backpack and a green bicycle. My sister likes pink. She has a pink notebook. My brother's favourite color is blue. He has a blue motorbike. My mother likes red, and my father likes black. My grandmother likes orange, and my grandfather likes grey. My uncle's favourite color is brown, and my aunt's favourite color is purple. Our family has a yellow car. Our world is full of different colors!",
      sound_path: "/sounds/colors/text/en_colors.mp3",
      title: "Colors"
    },
    {
      content_id: content[24].content_id,
      language_id: languageMap.fi.language_id,
      value: "Hei! Minun nimi on Emma! Minun lempiväri on vihreä. Minulla on vihreä reppu ja vihreä polkupyörä. Minun sisko pitää vaaleanpunaisesta. Hänellä on vaaleanpunainen vihko. Minun veljen lempiväri on sininen. Hänellä on sininen moottoripyörä. Minun äiti pitää punaisesta, ja minun isä pitää mustasta. Minun isoäiti pitää oranssista, ja minun isoisä pitää harmaasta. Minun sedän lempiväri on ruskea, ja minun tädin lempiväri on violetti. Meidän perheellä on keltainen auto. Meidän maailma on täynnä erilaisia värejä!",
      sound_path: "/sounds/colors/text/fi_colors.mp3",
      title: "Värit"
    },
    {
      content_id: content[24].content_id,
      language_id: languageMap.uk.language_id,
      value: "Привіт! Мене звати Емма! Мій улюблений колір — зелений. У мене є зелений рюкзак і зелений велосипед. Моя сестра любить рожевий колір. У неї є рожевий зошит. Улюблений колір мого брата — синій. У нього є синій мотоцикл. Моя мама любить червоний колір, а мій тато — чорний. Моя бабуся любить помаранчевий колір, а мій дідусь — сірий. Улюблений колір мого дядька — коричневий, а улюблений колір моєї тітки — фіолетовий. У нашої сім'ї є жовта машина. Наш світ сповнений різних кольорів!",
      sound_path: "/sounds/colors/text/uk_colors.mp3",
      title: "Кольори"
    },
    {
      content_id: content[24].content_id,
      language_id: languageMap.ru.language_id,
      value: "Привет! Меня зовут Эмма! Мой любимый цвет — зелёный. У меня есть зелёный рюкзак и зелёный велосипед. Моя сестра любит розовый цвет. У неё есть розовая тетрадь. Любимый цвет моего брата — синий. У него есть синий мотоцикл. Моя мама любит красный цвет, а мой папа — чёрный. Моя бабушка любит оранжевый цвет, а мой дедушка — серый. Любимый цвет моего дяди — коричневый, а любимый цвет моей тёти — фиолетовый. У нашей семьи есть жёлтая машина. Наш мир полон разных цветов!",
      sound_path: "/sounds/colors/text/ru_colors.mp3",
      title: "Цвета"
    },
  ]).returning("*");

};