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
    { type: "word", slug: "numbers", image_path: "/images/numbers/numbers.png", category_id: categoryMap.numbers },
    { type: "word", slug: "one", image_path: "/images/numbers/one.png", category_id: categoryMap.numbers },
    { type: "word", slug: "two", image_path: "/images/numbers/two.png", category_id: categoryMap.numbers },
    { type: "word", slug: "three", image_path: "/images/numbers/three.png", category_id: categoryMap.numbers },
    { type: "word", slug: "four", image_path: "/images/numbers/four.png", category_id: categoryMap.numbers },
    { type: "word", slug: "five", image_path: "/images/numbers/five.png", category_id: categoryMap.numbers },
    { type: "word", slug: "six", image_path: "/images/numbers/six.png", category_id: categoryMap.numbers },
    { type: "word", slug: "seven", image_path: "/images/numbers/seven.png", category_id: categoryMap.numbers },
    { type: "word", slug: "eight", image_path: "/images/numbers/eight.png", category_id: categoryMap.numbers },
    { type: "word", slug: "nine", image_path: "/images/numbers/nine.png", category_id: categoryMap.numbers },
    { type: "word", slug: "ten", image_path: "/images/numbers/ten.png", category_id: categoryMap.numbers },

    // SENTENCES
    { type: "sentence", slug: "numbers", image_path: "/images/numbers/numbers.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "one", image_path: "/images/numbers/one.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "two", image_path: "/images/numbers/two.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "three", image_path: "/images/numbers/three.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "four", image_path: "/images/numbers/four.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "five", image_path: "/images/numbers/five.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "six", image_path: "/images/numbers/six.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "seven", image_path: "/images/numbers/seven.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "eight", image_path: "/images/numbers/eight.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "nine", image_path: "/images/numbers/nine.png", category_id: categoryMap.numbers },
    { type: "sentence", slug: "ten", image_path: "/images/numbers/ten.png", category_id: categoryMap.numbers },

    // TEXT
    { type: "text", slug: "numbers", image_path: "/images/texts/numbers_image.png", category_id: categoryMap.numbers },
])
  .onConflict(["category_id", "type", "slug"])
  .merge(["image_path"]);

  const content = await knex("content")
      .select("content_id", "category_id", "type", "slug")
      .where("category_id", categoryMap.numbers);

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
      content_id: contentMap[`${categoryMap.numbers}_word_numbers`],
      language_id: languageMap.en,
      value: "numbers",
      sound_path: "/sounds/numbers/words/en/numbers.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_numbers`],
      language_id: languageMap.fi,
      value: "numerot",
      sound_path: "/sounds/numbers/words/fi/numerot.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_numbers`],
      language_id: languageMap.uk,
      value: "числа",
      sound_path: "/sounds/numbers/words/uk/числа.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_numbers`],
      language_id: languageMap.ru,
      value: "числа",
      sound_path: "/sounds/numbers/words/ru/числа.mp3"
    },

    // word 2
    {
      content_id: contentMap[`${categoryMap.numbers}_word_one`],
      language_id: languageMap.en,
      value: "one",
      sound_path: "/sounds/numbers/words/en/one.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_one`],
      language_id: languageMap.fi,
      value: "yksi",
      sound_path: "/sounds/numbers/words/fi/yksi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_one`],
      language_id: languageMap.uk,
      value: "один",
      sound_path: "/sounds/numbers/words/uk/один.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_one`],
      language_id: languageMap.ru,
      value: "один",
      sound_path: "/sounds/numbers/words/ru/один.mp3"
    },

    // word 3
    {
      content_id: contentMap[`${categoryMap.numbers}_word_two`],
      language_id: languageMap.en,
      value: "two",
      sound_path: "/sounds/numbers/words/en/two.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_two`],
      language_id: languageMap.fi,
      value: "kaksi",
      sound_path: "/sounds/numbers/words/fi/kaksi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_two`],
      language_id: languageMap.uk,
      value: "два",
      sound_path: "/sounds/numbers/words/uk/два.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_two`],
      language_id: languageMap.ru,
      value: "два",
      sound_path: "/sounds/numbers/words/ru/два.mp3"
    },

    // word 4
    {
      content_id: contentMap[`${categoryMap.numbers}_word_three`],
      language_id: languageMap.en,
      value: "three",
      sound_path: "/sounds/numbers/words/en/three.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_three`],
      language_id: languageMap.fi,
      value: "kolme",
      sound_path: "/sounds/numbers/words/fi/kolme.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_three`],
      language_id: languageMap.uk,
      value: "три",
      sound_path: "/sounds/numbers/words/uk/три.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_three`],
      language_id: languageMap.ru,
      value: "три",
      sound_path: "/sounds/numbers/words/ru/три.mp3"
    },

    // word 5
    {
      content_id: contentMap[`${categoryMap.numbers}_word_four`],
      language_id: languageMap.en,
      value: "four",
      sound_path: "/sounds/numbers/words/en/four.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_four`],
      language_id: languageMap.fi,
      value: "neljä",
      sound_path: "/sounds/numbers/words/fi/neljä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_four`],
      language_id: languageMap.uk,
      value: "чотири",
      sound_path: "/sounds/numbers/words/uk/чотири.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_four`],
      language_id: languageMap.ru,
      value: "четыре",
      sound_path: "/sounds/numbers/words/ru/четыре.mp3"
    },

    // word 6
    {
      content_id: contentMap[`${categoryMap.numbers}_word_five`],
      language_id: languageMap.en,
      value: "five",
      sound_path: "/sounds/numbers/words/en/five.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_five`],
      language_id: languageMap.fi,
      value: "viisi",
      sound_path: "/sounds/numbers/words/fi/viisi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_five`],
      language_id: languageMap.uk,
      value: "п'ять",
      sound_path: "/sounds/numbers/words/uk/п'ять.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_five`],
      language_id: languageMap.ru,
      value: "пять",
      sound_path: "/sounds/numbers/words/ru/пять.mp3"
    },

    // word 7
    {
      content_id: contentMap[`${categoryMap.numbers}_word_six`],
      language_id: languageMap.en,
      value: "six",
      sound_path: "/sounds/numbers/words/en/six.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_six`],
      language_id: languageMap.fi,
      value: "kuusi",
      sound_path: "/sounds/numbers/words/fi/kuusi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_six`],
      language_id: languageMap.uk,
      value: "шість",
      sound_path: "/sounds/numbers/words/uk/шість.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_six`],
      language_id: languageMap.ru,
      value: "шесть",
      sound_path: "/sounds/numbers/words/ru/шесть.mp3"
    },

    // word 8
    {
      content_id: contentMap[`${categoryMap.numbers}_word_seven`],
      language_id: languageMap.en,
      value: "seven",
      sound_path: "/sounds/numbers/words/en/seven.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_seven`],
      language_id: languageMap.fi,
      value: "seitsemän",
      sound_path: "/sounds/numbers/words/fi/seitsemän.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_seven`],
      language_id: languageMap.uk,
      value: "сім",
      sound_path: "/sounds/numbers/words/uk/сім.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_seven`],
      language_id: languageMap.ru,
      value: "семь",
      sound_path: "/sounds/numbers/words/ru/семь.mp3"
    },

    // word 9
    {
      content_id: contentMap[`${categoryMap.numbers}_word_eight`],
      language_id: languageMap.en,
      value: "eight",
      sound_path: "/sounds/numbers/words/en/eight.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_eight`],
      language_id: languageMap.fi,
      value: "kahdeksan",
      sound_path: "/sounds/numbers/words/fi/kahdeksan.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_eight`],
      language_id: languageMap.uk,
      value: "вісім",
      sound_path: "/sounds/numbers/words/uk/вісім.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_eight`],
      language_id: languageMap.ru,
      value: "восемь",
      sound_path: "/sounds/numbers/words/ru/восемь.mp3"
    },

    // word 10
    {
      content_id: contentMap[`${categoryMap.numbers}_word_nine`],
      language_id: languageMap.en,
      value: "nine",
      sound_path: "/sounds/numbers/words/en/nine.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_nine`],
      language_id: languageMap.fi,
      value: "yhdeksän",
      sound_path: "/sounds/numbers/words/fi/yhdeksän.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_nine`],
      language_id: languageMap.uk,
      value: "дев'ять",
      sound_path: "/sounds/numbers/words/uk/дев'ять.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_nine`],
      language_id: languageMap.ru,
      value: "девять",
      sound_path: "/sounds/numbers/words/ru/девять.mp3"
    },

    // word 11
    {
      content_id: contentMap[`${categoryMap.numbers}_word_ten`],
      language_id: languageMap.en,
      value: "ten",
      sound_path: "/sounds/numbers/words/en/ten.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_ten`],
      language_id: languageMap.fi,
      value: "kymmenen",
      sound_path: "/sounds/numbers/words/fi/kymmenen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_ten`],
      language_id: languageMap.uk,
      value: "десять",
      sound_path: "/sounds/numbers/words/uk/десять.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_word_ten`],
      language_id: languageMap.ru,
      value: "десять",
      sound_path: "/sounds/numbers/words/ru/десять.mp3"
    },

    // SENTENCES

    // sentence 1
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_numbers`],
      language_id: languageMap.en,
      value: "We use {{answer}} for counting",
      answer_value: "numbers",
      sound_path: "/sounds/numbers/sentences/en/numbers.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_numbers`],
      language_id: languageMap.fi,
      value: "Käytämme {{answer}} laskemiseen.",
      answer_value: "numerot",
      sound_path: "/sounds/numbers/sentences/fi/numerot.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_numbers`],
      language_id: languageMap.uk,
      value: "Ми використовуємо {{answer}} для рахунку.",
      answer_value: "числа",
      sound_path: "/sounds/numbers/sentences/uk/числа.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_numbers`],
      language_id: languageMap.ru,
      value: "Мы используем {{answer}} для счёта.",
      answer_value: "числа",
      sound_path: "/sounds/numbers/sentences/ru/числа.mp3"
    },

    // sentence 2
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_one`],
      language_id: languageMap.en,
      value: "I have {{answer}} brother.",
      answer_value: "one",
      sound_path: "/sounds/numbers/sentences/en/one.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_one`],
      language_id: languageMap.fi,
      value: "Minulla on {{answer}} veli.",
      answer_value: "yksi",
      sound_path: "/sounds/numbers/sentences/fi/yksi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_one`],
      language_id: languageMap.uk,
      value: "У мене є {{answer}} брат.",
      answer_value: "один",
      sound_path: "/sounds/numbers/sentences/uk/один.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_one`],
      language_id: languageMap.ru,
      value: "У меня есть {{answer}} брат.",
      answer_value: "один",
      sound_path: "/sounds/numbers/sentences/ru/один.mp3"
    },

    // sentence 3
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_two`],
      language_id: languageMap.en,
      value: "You have {{answer}} sisters.",
      answer_value: "two",
      sound_path: "/sounds/numbers/sentences/en/two.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_two`],
      language_id: languageMap.fi,
      value: "Sinulla on {{answer}} siskoa.",
      answer_value: "kaksi",
      sound_path: "/sounds/numbers/sentences/fi/kaksi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_two`],
      language_id: languageMap.uk,
      value: "У тебе є {{answer}} сестри.",
      answer_value: "дві",
      sound_path: "/sounds/numbers/sentences/uk/два.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_two`],
      language_id: languageMap.ru,
      value: "У тебя есть {{answer}} сестры.",
      answer_value: "две",
      sound_path: "/sounds/numbers/sentences/ru/два.mp3"
    },

    // sentence 4
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_three`],
      language_id: languageMap.en,
      value: "Mikael has {{answer}} books.",
      answer_value: "three",
      sound_path: "/sounds/numbers/sentences/en/three.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_three`],
      language_id: languageMap.fi,
      value: "Mikaelilla on {{answer}} kirjaa.",
      answer_value: "kolme",
      sound_path: "/sounds/numbers/sentences/fi/kolme.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_three`],
      language_id: languageMap.uk,
      value: "У Мікаеля є {{answer}} книги.",
      answer_value: "три",
      sound_path: "/sounds/numbers/sentences/uk/три.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_three`],
      language_id: languageMap.ru,
      value: "У Микаэля есть {{answer}} книги.",
      answer_value: "три",
      sound_path: "/sounds/numbers/sentences/ru/три.mp3"
    },

    // sentence 5
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_four`],
      language_id: languageMap.en,
      value: "We have {{answer}} lessons every day.",
      answer_value: "four",
      sound_path: "/sounds/numbers/sentences/en/four.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_four`],
      language_id: languageMap.fi,
      value: "Meillä on {{answer}} oppituntia joka päivä.",
      answer_value: "neljä",
      sound_path: "/sounds/numbers/sentences/fi/neljä.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_four`],
      language_id: languageMap.uk,
      value: "У нас щодня {{answer}} уроки.",
      answer_value: "чотири",
      sound_path: "/sounds/numbers/sentences/uk/чотири.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_four`],
      language_id: languageMap.ru,
      value: "У нас каждый день {{answer}} урока.",
      answer_value: "четыре",
      sound_path: "/sounds/numbers/sentences/ru/четыре.mp3"
    },

    // sentence 6
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_five`],
      language_id: languageMap.en,
      value: "We buy {{answer}} liters of milk every week.",
      answer_value: "five",
      sound_path: "/sounds/numbers/sentences/en/five.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_five`],
      language_id: languageMap.fi,
      value: "Ostamme {{answer}} litraa maitoa joka viikko.",
      answer_value: "viisi",
      sound_path: "/sounds/numbers/sentences/fi/viisi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_five`],
      language_id: languageMap.uk,
      value: "Ми купуємо {{answer}} літрів молока щотижня.",
      answer_value: "п'ять",
      sound_path: "/sounds/numbers/sentences/uk/п'ять.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_five`],
      language_id: languageMap.ru,
      value: "Мы {{answer}} пять литров молока каждую неделю.",
      answer_value: "пять",
      sound_path: "/sounds/numbers/sentences/ru/пять.mp3"
    },

    // sentence 7
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_six`],
      language_id: languageMap.en,
      value: "They have {{answer}} apples.",
      answer_value: "six",
      sound_path: "/sounds/numbers/sentences/en/six.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_six`],
      language_id: languageMap.fi,
      value: "Heillä on {{answer}} omenaa.",
      answer_value: "kuusi",
      sound_path: "/sounds/numbers/sentences/fi/kuusi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_six`],
      language_id: languageMap.uk,
      value: "У них є {{answer}} яблук.",
      answer_value: "шість",
      sound_path: "/sounds/numbers/sentences/uk/шість.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_six`],
      language_id: languageMap.ru,
      value: "У них есть {{answer}} яблок.",
      answer_value: "шесть",
      sound_path: "/sounds/numbers/sentences/ru/шесть.mp3"
    },

    // sentence 8
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_seven`],
      language_id: languageMap.en,
      value: "I have {{answer}} notebooks.",
      answer_value: "seven",
      sound_path: "/sounds/numbers/sentences/en/seven.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_seven`],
      language_id: languageMap.fi,
      value: "Minulla on {{answer}} vihkoa.",
      answer_value: "seitsemän",
      sound_path: "/sounds/numbers/sentences/fi/seitsemän.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_seven`],
      language_id: languageMap.uk,
      value: "У мене є {{answer}} зошитів.",
      answer_value: "сім",
      sound_path: "/sounds/numbers/sentences/uk/сім.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_seven`],
      language_id: languageMap.ru,
      value: "У меня есть {{answer}} тетрадей.",
      answer_value: "семь",
      sound_path: "/sounds/numbers/sentences/ru/семь.mp3"
    },

    // sentence 9
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_eight`],
      language_id: languageMap.en,
      value: "You have {{answer}} pens.",
      answer_value: "eight",
      sound_path: "/sounds/numbers/sentences/en/eight.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_eight`],
      language_id: languageMap.fi,
      value: "Sinulla on {{answer}} kynää.",
      answer_value: "kahdeksan",
      sound_path: "/sounds/numbers/sentences/fi/kahdeksan.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_eight`],
      language_id: languageMap.uk,
      value: "У тебе є {{answer}} ручок.",
      answer_value: "вісім",
      sound_path: "/sounds/numbers/sentences/uk/вісім.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_eight`],
      language_id: languageMap.ru,
      value: "У тебя есть {{answer}} ручек.",
      answer_value: "восемь",
      sound_path: "/sounds/numbers/sentences/ru/восемь.mp3"
    },

    // sentence 10
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_nine`],
      language_id: languageMap.en,
      value: "We have {{answer}} glasses.",
      answer_value: "nine",
      sound_path: "/sounds/numbers/sentences/en/nine.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_nine`],
      language_id: languageMap.fi,
      value: "Meillä on {{answer}} lasia.",
      answer_value: "yhdeksän",
      sound_path: "/sounds/numbers/sentences/fi/yhdeksän.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_nine`],
      language_id: languageMap.uk,
      value: "У нас є {{answer}} склянок.",
      answer_value: "дев'ять",
      sound_path: "/sounds/numbers/sentences/uk/дев'ять.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_nine`],
      language_id: languageMap.ru,
      value: "У нас есть {{answer}} стаканов.",
      answer_value: "девять",
      sound_path: "/sounds/numbers/sentences/ru/девять.mp3"
    },

    // sentence 11
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_ten`],
      language_id: languageMap.en,
      value: "Emma has {{answer}} pencils.",
      answer_value: "ten",
      sound_path: "/sounds/numbers/sentences/en/ten.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_ten`],
      language_id: languageMap.fi,
      value: "Emmalla on {{answer}} lyijykynää.",
      answer_value: "kymmenen",
      sound_path: "/sounds/numbers/sentences/fi/kymmenen.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_ten`],
      language_id: languageMap.uk,
      value: "У Емми є {{answer}} олівців.",
      answer_value: "десять",
      sound_path: "/sounds/numbers/sentences/uk/десять.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_sentence_ten`],
      language_id: languageMap.ru,
      value: "У Эммы есть {{answer}} карандашей.",
      answer_value: "десять",
      sound_path: "/sounds/numbers/sentences/ru/десять.mp3"
    },

    // TEXT
    {
      content_id: contentMap[`${categoryMap.numbers}_text_numbers`],
      language_id: languageMap.en,
      value: "Emma goes to the shop with her family. They buy one pack of rice, two loaves of bread and three packs of cheese. They also buy four fish, five liters of milk and six apples. They buy seven bananas, eight pieces of meat, nine potatoes and ten eggs. At home, Emma counts the food. One, two, three, four, five, six, seven, eight, nine, ten! Emma likes numbers.",
      sound_path: "/sounds/numbers/text/en_numbers.mp3",
      title: "Numbers"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_text_numbers`],
      language_id: languageMap.fi,
      value: "Emma menee kauppaan perheensä kanssa. He ostavat yhden paketin riisiä, kaksi leipää ja kolme pakettia juustoa. He ostavat myös neljä kalaa, viisi litraa maitoa ja kuusi omenaa. He ostavat seitsemän banaania, kahdeksan palaa lihaa, yhdeksän perunaa ja kymmenen kananmunaa. Kotona Emma laskee ruuat. Yksi, kaksi, kolme, neljä, viisi, kuusi, seitsemän, kahdeksan, yhdeksän, kymmenen! Emma pitää numeroista.",
      sound_path: "/sounds/numbers/text/fi_numbers.mp3",
      title: "Numerot"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_text_numbers`],
      language_id: languageMap.uk,
      value: "Емма йде до магазину зі своєю сім'єю. Вони купують одну пачку рису, два хліби та три пачки сиру. Вони також купують чотири риби, п'ять літрів молока та шість яблук. Вони купують сім бананів, вісім шматків м'яса, дев'ять картоплин і десять яєць. Вдома Емма рахує їжу. Один, два, три, чотири, п'ять, шість, сім, вісім, дев'ять, десять! Емма любить числа.",
      sound_path: "/sounds/numbers/text/uk_numbers.mp3",
      title: "Числа"
    },
    {
      content_id: contentMap[`${categoryMap.numbers}_text_numbers`],
      language_id: languageMap.ru,
      value: "Эмма идёт в магазин со своей семьёй. Они покупают одну пачку риса, два хлеба и три пачки сыра. Они также покупают четыре рыбы, пять литров молока и шесть яблок. Они покупают семь бананов, восемь кусочков мяса, девять картофелин и десять яиц. Дома Эмма считает еду. Один, два, три, четыре, пять, шесть, семь, восемь, девять, десять! Эмма любит числа.",
      sound_path: "/sounds/numbers/text/ru_numbers.mp3",
      title: "Числа"
    },
])
  .onConflict(["content_id", "language_id"])
  .merge([ "value", "answer_value", "sound_path", "title" ]);
};