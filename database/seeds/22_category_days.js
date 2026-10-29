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
    { type: "word", slug: "day", image_path: "/images/days/day.png", category_id: categoryMap.days },
    { type: "word", slug: "Monday", image_path: "/images/days/Monday.png", category_id: categoryMap.days },
    { type: "word", slug: "Tuesday", image_path: "/images/days/Tuesday.png", category_id: categoryMap.days },
    { type: "word", slug: "Wednesday", image_path: "/images/days/Wednesday.png", category_id: categoryMap.days },
    { type: "word", slug: "Thursday", image_path: "/images/days/Thursday.png", category_id: categoryMap.days },
    { type: "word", slug: "Friday", image_path: "/images/days/Friday.png", category_id: categoryMap.days },
    { type: "word", slug: "Saturday", image_path: "/images/days/Saturday.png", category_id: categoryMap.days },
    { type: "word", slug: "Sunday", image_path: "/images/days/Sunday.png", category_id: categoryMap.days },
    { type: "word", slug: "week", image_path: "/images/days/week.png", category_id: categoryMap.days },
    { type: "word", slug: "weekday", image_path: "/images/days/weekday.png", category_id: categoryMap.days },
    { type: "word", slug: "weekend", image_path: "/images/days/weekend.png", category_id: categoryMap.days },

    // SENTENCES
    { type: "sentence", slug: "day", image_path: "/images/days/day.png", category_id: categoryMap.days },
    { type: "sentence", slug: "Monday", image_path: "/images/days/Monday.png", category_id: categoryMap.days },
    { type: "sentence", slug: "Tuesday", image_path: "/images/days/Tuesday.png", category_id: categoryMap.days },
    { type: "sentence", slug: "Wednesday", image_path: "/images/days/Wednesday.png", category_id: categoryMap.days },
    { type: "sentence", slug: "Thursday", image_path: "/images/days/Thursday.png", category_id: categoryMap.days },
    { type: "sentence", slug: "Friday", image_path: "/images/days/Friday.png", category_id: categoryMap.days },
    { type: "sentence", slug: "Saturday", image_path: "/images/days/Saturday.png", category_id: categoryMap.days },
    { type: "sentence", slug: "Sunday", image_path: "/images/days/Sunday.png", category_id: categoryMap.days },
    { type: "sentence", slug: "week", image_path: "/images/days/week.png", category_id: categoryMap.days },
    { type: "sentence", slug: "weekday", image_path: "/images/days/weekday.png", category_id: categoryMap.days },
    { type: "sentence", slug: "weekend", image_path: "/images/days/weekend.png", category_id: categoryMap.days },

    // TEXT
    { type: "text", slug: "days", image_path: "/images/texts/days_image.png", category_id: categoryMap.days },
])
  .onConflict(["category_id", "type", "slug"])
  .merge(["image_path"]);

  const content = await knex("content")
      .select("content_id", "category_id", "type", "slug")
      .where("category_id", categoryMap.days);

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
      content_id: contentMap[`${categoryMap.days}_word_day`],
      language_id: languageMap.en,
      value: "day",
      sound_path: "/sounds/days/words/en/day.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_day`],
      language_id: languageMap.fi,
      value: "päivä",
      sound_path: "/sounds/days/words/fi/päivä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_day`],
      language_id: languageMap.uk,
      value: "день",
      sound_path: "/sounds/days/words/uk/день.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_day`],
      language_id: languageMap.ru,
      value: "день",
      sound_path: "/sounds/days/words/ru/день.mp3"
    },

    // word 2
    {
      content_id: contentMap[`${categoryMap.days}_word_Monday`],
      language_id: languageMap.en,
      value: "Monday",
      sound_path: "/sounds/days/words/en/Monday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Monday`],
      language_id: languageMap.fi,
      value: "maanantai",
      sound_path: "/sounds/days/words/fi/maanantai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Monday`],
      language_id: languageMap.uk,
      value: "понеділок",
      sound_path: "/sounds/days/words/uk/понеділок.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Monday`],
      language_id: languageMap.ru,
      value: "понедельник",
      sound_path: "/sounds/days/words/ru/понедельник.mp3"
    },

    // word 3
    {
      content_id: contentMap[`${categoryMap.days}_word_Tuesday`],
      language_id: languageMap.en,
      value: "Tuesday",
      sound_path: "/sounds/days/words/en/Tuesday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Tuesday`],
      language_id: languageMap.fi,
      value: "tiistai",
      sound_path: "/sounds/days/words/fi/tiistai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Tuesday`],
      language_id: languageMap.uk,
      value: "вівторок",
      sound_path: "/sounds/days/words/uk/вівторок.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Tuesday`],
      language_id: languageMap.ru,
      value: "вторник",
      sound_path: "/sounds/days/words/ru/вторник.mp3"
    },

    // word 4
    {
      content_id: contentMap[`${categoryMap.days}_word_Wednesday`],
      language_id: languageMap.en,
      value: "Wednesday",
      sound_path: "/sounds/days/words/en/Wednesday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Wednesday`],
      language_id: languageMap.fi,
      value: "keskiviikko",
      sound_path: "/sounds/days/words/fi/keskiviikko.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Wednesday`],
      language_id: languageMap.uk,
      value: "середа",
      sound_path: "/sounds/days/words/uk/середа.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Wednesday`],
      language_id: languageMap.ru,
      value: "среда",
      sound_path: "/sounds/days/words/ru/среда.mp3"
    },

    // word 5
    {
      content_id: contentMap[`${categoryMap.days}_word_Thursday`],
      language_id: languageMap.en,
      value: "Thursday",
      sound_path: "/sounds/days/words/en/Thursday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Thursday`],
      language_id: languageMap.fi,
      value: "torstai",
      sound_path: "/sounds/days/words/fi/torstai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Thursday`],
      language_id: languageMap.uk,
      value: "четвер",
      sound_path: "/sounds/days/words/uk/четвер.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Thursday`],
      language_id: languageMap.ru,
      value: "четверг",
      sound_path: "/sounds/days/words/ru/четверг.mp3"
    },

    // word 6
    {
      content_id: contentMap[`${categoryMap.days}_word_Friday`],
      language_id: languageMap.en,
      value: "Friday",
      sound_path: "/sounds/days/words/en/Friday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Friday`],
      language_id: languageMap.fi,
      value: "perjantai",
      sound_path: "/sounds/days/words/fi/perjantai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Friday`],
      language_id: languageMap.uk,
      value: "п’ятниця",
      sound_path: "/sounds/days/words/uk/п’ятниця.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Friday`],
      language_id: languageMap.ru,
      value: "пятница",
      sound_path: "/sounds/days/words/ru/пятница.mp3"
    },

    // word 7
    {
      content_id: contentMap[`${categoryMap.days}_word_Saturday`],
      language_id: languageMap.en,
      value: "Saturday",
      sound_path: "/sounds/days/words/en/Saturday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Saturday`],
      language_id: languageMap.fi,
      value: "lauantai",
      sound_path: "/sounds/days/words/fi/lauantai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Saturday`],
      language_id: languageMap.uk,
      value: "субота",
      sound_path: "/sounds/days/words/uk/субота.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Saturday`],
      language_id: languageMap.ru,
      value: "суббота",
      sound_path: "/sounds/days/words/ru/суббота.mp3"
    },

    // word 8
    {
      content_id: contentMap[`${categoryMap.days}_word_Sunday`],
      language_id: languageMap.en,
      value: "Sunday",
      sound_path: "/sounds/days/words/en/Sunday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Sunday`],
      language_id: languageMap.fi,
      value: "sunnuntai",
      sound_path: "/sounds/days/words/fi/sunnuntai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Sunday`],
      language_id: languageMap.uk,
      value: "неділя",
      sound_path: "/sounds/days/words/uk/неділя.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_Sunday`],
      language_id: languageMap.ru,
      value: "воскресенье",
      sound_path: "/sounds/days/words/ru/воскресенье.mp3"
    },

    // word 9
    {
      content_id: contentMap[`${categoryMap.days}_word_week`],
      language_id: languageMap.en,
      value: "week",
      sound_path: "/sounds/days/words/en/week.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_week`],
      language_id: languageMap.fi,
      value: "viikko",
      sound_path: "/sounds/days/words/fi/viikko.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_week`],
      language_id: languageMap.uk,
      value: "тиждень",
      sound_path: "/sounds/days/words/uk/тиждень.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_week`],
      language_id: languageMap.ru,
      value: "неделя",
      sound_path: "/sounds/days/words/ru/неделя.mp3"
    },

    // word 10
    {
      content_id: contentMap[`${categoryMap.days}_word_weekday`],
      language_id: languageMap.en,
      value: "weekday",
      sound_path: "/sounds/days/words/en/weekday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_weekday`],
      language_id: languageMap.fi,
      value: "arkipäivä",
      sound_path: "/sounds/days/words/fi/arkipäivä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_weekday`],
      language_id: languageMap.uk,
      value: "будній день",
      sound_path: "/sounds/days/words/uk/будній день.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_weekday`],
      language_id: languageMap.ru,
      value: "будний день",
      sound_path: "/sounds/days/words/ru/будний день.mp3"
    },

    // word 11
    {
      content_id: contentMap[`${categoryMap.days}_word_weekend`],
      language_id: languageMap.en,
      value: "weekend",
      sound_path: "/sounds/days/words/en/weekend.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_weekend`],
      language_id: languageMap.fi,
      value: "viikonloppu",
      sound_path: "/sounds/days/words/fi/viikonloppu.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_weekend`],
      language_id: languageMap.uk,
      value: "вихідні",
      sound_path: "/sounds/days/words/uk/вихідні.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_word_weekend`],
      language_id: languageMap.ru,
      value: "выходные",
      sound_path: "/sounds/days/words/ru/выходные.mp3"
    },

    // SENTENCES

    // sentence 1
    {
      content_id: contentMap[`${categoryMap.days}_sentence_day`],
      language_id: languageMap.en,
      value: "A week has seven {{answer}}.",
      answer_value: "days",
      sound_path: "/sounds/days/sentences/en/day.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_day`],
      language_id: languageMap.fi,
      value: "Viikossa on seitsemän {{answer}}.",
      answer_value: "päivää",
      sound_path: "/sounds/days/sentences/fi/päivä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_day`],
      language_id: languageMap.uk,
      value: "У тижні сім {{answer}}.",
      answer_value: "днів",
      sound_path: "/sounds/days/sentences/uk/день.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_day`],
      language_id: languageMap.ru,
      value: "В неделе семь {{answer}}.",
      answer_value: "дней",
      sound_path: "/sounds/days/sentences/ru/день.mp3"
    },

    // sentence 2
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Monday`],
      language_id: languageMap.en,
      value: "The first day is {{answer}}.",
      answer_value: "Monday",
      sound_path: "/sounds/days/sentences/en/Monday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Monday`],
      language_id: languageMap.fi,
      value: "Ensimmäinen päivä on {{answer}}.",
      answer_value: "maanantai",
      sound_path: "/sounds/days/sentences/fi/maanantai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Monday`],
      language_id: languageMap.uk,
      value: "Перший день — {{answer}}.",
      answer_value: "понеділок",
      sound_path: "/sounds/days/sentences/uk/понеділок.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Monday`],
      language_id: languageMap.ru,
      value: "Первый день — {{answer}}.",
      answer_value: "понедельник",
      sound_path: "/sounds/days/sentences/ru/понедельник.mp3"
    },

    // sentence 3
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Tuesday`],
      language_id: languageMap.en,
      value: "The second day is {{answer}}.",
      answer_value: "Tuesday",
      sound_path: "/sounds/days/sentences/en/Tuesday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Tuesday`],
      language_id: languageMap.fi,
      value: "Toinen päivä on {{answer}}.",
      answer_value: "tiistai",
      sound_path: "/sounds/days/sentences/fi/tiistai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Tuesday`],
      language_id: languageMap.uk,
      value: "Другий день — {{answer}}.",
      answer_value: "вівторок",
      sound_path: "/sounds/days/sentences/uk/вівторок.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Tuesday`],
      language_id: languageMap.ru,
      value: "Второй день — {{answer}}.",
      answer_value: "вторник",
      sound_path: "/sounds/days/sentences/ru/вторник.mp3"
    },

    // sentence 4
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Wednesday`],
      language_id: languageMap.en,
      value: "The third day is {{answer}}.",
      answer_value: "Wednesday",
      sound_path: "/sounds/days/sentences/en/Wednesday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Wednesday`],
      language_id: languageMap.fi,
      value: "Kolmas päivä on {{answer}}.",
      answer_value: "keskiviikko",
      sound_path: "/sounds/days/sentences/fi/keskiviikko.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Wednesday`],
      language_id: languageMap.uk,
      value: "Третій день — {{answer}}.",
      answer_value: "середа",
      sound_path: "/sounds/days/sentences/uk/середа.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Wednesday`],
      language_id: languageMap.ru,
      value: "Третий день — {{answer}}.",
      answer_value: "среда",
      sound_path: "/sounds/days/sentences/ru/среда.mp3"
    },

    // sentence 5
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Thursday`],
      language_id: languageMap.en,
      value: "The fourth day is {{answer}}.",
      answer_value: "Thursday",
      sound_path: "/sounds/days/sentences/en/Thursday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Thursday`],
      language_id: languageMap.fi,
      value: "Neljäs päivä on {{answer}}.",
      answer_value: "torstai",
      sound_path: "/sounds/days/sentences/fi/torstai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Thursday`],
      language_id: languageMap.uk,
      value: "Четвертий день — {{answer}}.",
      answer_value: "четвер",
      sound_path: "/sounds/days/sentences/uk/четвер.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Thursday`],
      language_id: languageMap.ru,
      value: "Четвёртый день — {{answer}}.",
      answer_value: "четверг",
      sound_path: "/sounds/days/sentences/ru/четверг.mp3"
    },

    // sentence 6
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Friday`],
      language_id: languageMap.en,
      value: "The fifth day is {{answer}}.",
      answer_value: "Friday",
      sound_path: "/sounds/days/sentences/en/Friday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Friday`],
      language_id: languageMap.fi,
      value: "Viides päivä on {{answer}}.",
      answer_value: "perjantai",
      sound_path: "/sounds/days/sentences/fi/perjantai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Friday`],
      language_id: languageMap.uk,
      value: "П’ятий день — {{answer}}.",
      answer_value: "п’ятниця",
      sound_path: "/sounds/days/sentences/uk/п’ятниця.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Friday`],
      language_id: languageMap.ru,
      value: "Пятый день — {{answer}}.",
      answer_value: "пятница",
      sound_path: "/sounds/days/sentences/ru/пятница.mp3"
    },

    // sentence 7
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Saturday`],
      language_id: languageMap.en,
      value: "The sixth day is {{answer}}.",
      answer_value: "Saturday",
      sound_path: "/sounds/days/sentences/en/Saturday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Saturday`],
      language_id: languageMap.fi,
      value: "Kuudes päivä on {{answer}}.",
      answer_value: "lauantai",
      sound_path: "/sounds/days/sentences/fi/lauantai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Saturday`],
      language_id: languageMap.uk,
      value: "Шостий день — {{answer}}.",
      answer_value: "субота",
      sound_path: "/sounds/days/sentences/uk/субота.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Saturday`],
      language_id: languageMap.ru,
      value: "Шестой день — {{answer}}.",
      answer_value: "суббота",
      sound_path: "/sounds/days/sentences/ru/суббота.mp3"
    },

    // sentence 8
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Sunday`],
      language_id: languageMap.en,
      value: "The seventh day is {{answer}}.",
      answer_value: "Sunday",
      sound_path: "/sounds/days/sentences/en/Sunday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Sunday`],
      language_id: languageMap.fi,
      value: "Seitsemäs päivä on {{answer}}.",
      answer_value: "sunnuntai",
      sound_path: "/sounds/days/sentences/fi/sunnuntai.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Sunday`],
      language_id: languageMap.uk,
      value: "Сьомий день — {{answer}}.",
      answer_value: "неділя",
      sound_path: "/sounds/days/sentences/uk/неділя.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_Sunday`],
      language_id: languageMap.ru,
      value: "Седьмой день — {{answer}}.",
      answer_value: "воскресенье",
      sound_path: "/sounds/days/sentences/ru/воскресенье.mp3"
    },

    // sentence 9
    {
      content_id: contentMap[`${categoryMap.days}_sentence_week`],
      language_id: languageMap.en,
      value: "A {{answer}} has seven days.",
      answer_value: "week",
      sound_path: "/sounds/days/sentences/en/week.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_week`],
      language_id: languageMap.fi,
      value: "{{answer}} on seitsemän päivää.",
      answer_value: "Viikossa",
      sound_path: "/sounds/days/sentences/fi/viikko.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_week`],
      language_id: languageMap.uk,
      value: "У тижні сім {{answer}}.",
      answer_value: "днів",
      sound_path: "/sounds/days/sentences/uk/тиждень.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_week`],
      language_id: languageMap.ru,
      value: "В {{answer}} семь дней.",
      answer_value: "неделе",
      sound_path: "/sounds/days/sentences/ru/неделя.mp3"
    },

    // sentence 10
    {
      content_id: contentMap[`${categoryMap.days}_sentence_weekday`],
      language_id: languageMap.en,
      value: "Monday, Tuesday, Wednesday, Thursday and Friday are {{answer}}.",
      answer_value: "weekdays",
      sound_path: "/sounds/days/sentences/en/weekday.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_weekday`],
      language_id: languageMap.fi,
      value: "Maanantai, tiistai, keskiviikko, torstai ja perjantai ovat {{answer}}.",
      answer_value: "arkipäiviä",
      sound_path: "/sounds/days/sentences/fi/arkipäivä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_weekday`],
      language_id: languageMap.uk,
      value: "Понеділок, вівторок, середа, четвер і п’ятниця — {{answer}}.",
      answer_value: "будні",
      sound_path: "/sounds/days/sentences/uk/будній день.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_weekday`],
      language_id: languageMap.ru,
      value: "Понедельник, вторник, среда, четверг и пятница — {{answer}}.",
      answer_value: "будни",
      sound_path: "/sounds/days/sentences/ru/будний день.mp3"
    },

    // sentence 11
    {
      content_id: contentMap[`${categoryMap.days}_sentence_weekend`],
      language_id: languageMap.en,
      value: "Saturday and Sunday are the {{answer}}.",
      answer_value: "weekend",
      sound_path: "/sounds/days/sentences/en/weekend.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_weekend`],
      language_id: languageMap.fi,
      value: "Lauantai ja sunnuntai ovat {{answer}}.",
      answer_value: "viikonloppu",
      sound_path: "/sounds/days/sentences/fi/viikonloppu.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_weekend`],
      language_id: languageMap.uk,
      value: "Субота й неділя — це {{answer}}.",
      answer_value: "вихідні",
      sound_path: "/sounds/days/sentences/uk/вихідні.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.days}_sentence_weekend`],
      language_id: languageMap.ru,
      value: "Суббота и воскресенье — это {{answer}}.",
      answer_value: "выходные",
      sound_path: "/sounds/days/sentences/ru/выходные.mp3"
    },

    // TEXT
    {
      content_id: contentMap[`${categoryMap.days}_text_days`],
      language_id: languageMap.en,
      value: "A week has seven days. Monday is the first day. Tuesday is the second day. Wednesday is the third day. Thursday is the fourth day. Friday is the fifth day. Saturday is the sixth day, and Sunday is the seventh day. Monday, Tuesday, Wednesday, Thursday and Friday are weekdays. Children go to school on weekdays. Saturday and Sunday are the weekend. We rest and have fun at the weekend.",
      sound_path: "/sounds/days/text/en_days.mp3",
      title: "Days"
    },
    {
      content_id: contentMap[`${categoryMap.days}_text_days`],
      language_id: languageMap.fi,
      value: "Viikossa on seitsemän päivää. Maanantai on ensimmäinen päivä. Tiistai on toinen päivä. Keskiviikko on kolmas päivä. Torstai on neljäs päivä. Perjantai on viides päivä. Lauantai on kuudes päivä ja sunnuntai on seitsemäs päivä. Maanantai, tiistai, keskiviikko, torstai ja perjantai ovat arkipäiviä. Lapset käyvät koulua arkipäivisin. Lauantai ja sunnuntai ovat viikonlopun päivät. Viikonloppuna lepäämme ja pidämme hauskaa.",
      sound_path: "/sounds/days/text/fi_days.mp3",
      title: "Päivät"
    },
    {
      content_id: contentMap[`${categoryMap.days}_text_days`],
      language_id: languageMap.uk,
      value: "У тижні сім днів. Понеділок — перший день. Вівторок — другий день. Середа — третій день. Четвер — четвертий день. П’ятниця — п’ятий день. Субота — шостий день, а неділя — сьомий день. Понеділок, вівторок, середа, четвер і п’ятниця — будні. У будні діти ходять до школи. Субота й неділя — вихідні. На вихідних ми відпочиваємо та весело проводимо час.",
      sound_path: "/sounds/days/text/uk_days.mp3",
      title: "Днi"
    },
    {
      content_id: contentMap[`${categoryMap.days}_text_days`],
      language_id: languageMap.ru,
      value: "В неделе семь дней. Понедельник — первый день. Вторник — второй день. Среда — третий день. Четверг — четвёртый день. Пятница — пятый день. Суббота — шестой день, а воскресенье — седьмой день. Понедельник, вторник, среда, четверг и пятница — будни. В будни дети ходят в школу. Суббота и воскресенье — выходные. На выходных мы отдыхаем и весело проводим время.",
      sound_path: "/sounds/days/text/ru_days.mp3",
      title: "Дни"
    },
])
  .onConflict(["content_id", "language_id"])
  .merge([ "value", "answer_value", "sound_path", "title" ]);
};