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
    { type: "word", image_path: "/images/numbers/numbers.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/one.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/two.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/three.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/four.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/five.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/six.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/seven.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/eight.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/nine.png", category_id: categories[4].category_id },
    { type: "word", image_path: "/images/numbers/ten.png", category_id: categories[4].category_id },

    // SENTENCES
    { type: "sentence", image_path: "/images/numbers/one.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/two.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/three.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/four.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/five.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/six.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/seven.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/eight.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/nine.png", category_id: categories[4].category_id },
    { type: "sentence", image_path: "/images/numbers/ten.png", category_id: categories[4].category_id },

    // TEXT
    { type: "text", image_path: "/images/texts/numbers_image.png", category_id: categories[4].category_id },

  ]).returning("*");

  // 11. CONTENT TRANSLATIONS

  const content_translations = await knex('content_translations').insert([

    // WORDS

    // word 1
    {
      content_id: content[0].content_id,
      language_id: languageMap.en.language_id,
      value: "numbers",
      sound_path: "/sounds/numbers/words/en/numbers.mp3"
    },
    {
      content_id: content[0].content_id,
      language_id: languageMap.fi.language_id,
      value: "numerot",
      sound_path: "/sounds/numbers/words/fi/numerot.mp3"
    },
    {
      content_id: content[0].content_id,
      language_id: languageMap.uk.language_id,
      value: "числа",
      sound_path: "/sounds/numbers/words/uk/числа.mp3"
    },
    {
      content_id: content[0].content_id,
      language_id: languageMap.ru.language_id,
      value: "числа",
      sound_path: "/sounds/numbers/words/ru/числа.mp3"
    },

    // word 2
    {
      content_id: content[1].content_id,
      language_id: languageMap.en.language_id,
      value: "one",
      sound_path: "/sounds/numbers/words/en/one.mp3"
    },
    {
      content_id: content[1].content_id,
      language_id: languageMap.fi.language_id,
      value: "yksi",
      sound_path: "/sounds/numbers/words/fi/yksi.mp3"
    },
    {
      content_id: content[1].content_id,
      language_id: languageMap.uk.language_id,
      value: "один",
      sound_path: "/sounds/numbers/words/uk/один.mp3"
    },
    {
      content_id: content[1].content_id,
      language_id: languageMap.ru.language_id,
      value: "один",
      sound_path: "/sounds/numbers/words/ru/один.mp3"
    },

    // word 3
    {
      content_id: content[2].content_id,
      language_id: languageMap.en.language_id,
      value: "two",
      sound_path: "/sounds/numbers/words/en/two.mp3"
    },
    {
      content_id: content[2].content_id,
      language_id: languageMap.fi.language_id,
      value: "kaksi",
      sound_path: "/sounds/numbers/words/fi/kaksi.mp3"
    },
    {
      content_id: content[2].content_id,
      language_id: languageMap.uk.language_id,
      value: "два",
      sound_path: "/sounds/numbers/words/uk/два.mp3"
    },
    {
      content_id: content[2].content_id,
      language_id: languageMap.ru.language_id,
      value: "два",
      sound_path: "/sounds/numbers/words/ru/два.mp3"
    },

    // word 4
    {
      content_id: content[3].content_id,
      language_id: languageMap.en.language_id,
      value: "three",
      sound_path: "/sounds/numbers/words/en/three.mp3"
    },
    {
      content_id: content[3].content_id,
      language_id: languageMap.fi.language_id,
      value: "kolme",
      sound_path: "/sounds/numbers/words/fi/kolme.mp3"
    },
    {
      content_id: content[3].content_id,
      language_id: languageMap.uk.language_id,
      value: "три",
      sound_path: "/sounds/numbers/words/uk/три.mp3"
    },
    {
      content_id: content[3].content_id,
      language_id: languageMap.ru.language_id,
      value: "три",
      sound_path: "/sounds/numbers/words/ru/три.mp3"
    },

    // word 5
    {
      content_id: content[4].content_id,
      language_id: languageMap.en.language_id,
      value: "four",
      sound_path: "/sounds/numbers/words/en/four.mp3"
    },
    {
      content_id: content[4].content_id,
      language_id: languageMap.fi.language_id,
      value: "neljä",
      sound_path: "/sounds/numbers/words/fi/neljä.mp3"
    },
    {
      content_id: content[4].content_id,
      language_id: languageMap.uk.language_id,
      value: "чотири",
      sound_path: "/sounds/numbers/words/uk/чотири.mp3"
    },
    {
      content_id: content[4].content_id,
      language_id: languageMap.ru.language_id,
      value: "четыре",
      sound_path: "/sounds/numbers/words/ru/четыре.mp3"
    },

    // word 6
    {
      content_id: content[5].content_id,
      language_id: languageMap.en.language_id,
      value: "five",
      sound_path: "/sounds/numbers/words/en/five.mp3"
    },
    {
      content_id: content[5].content_id,
      language_id: languageMap.fi.language_id,
      value: "viisi",
      sound_path: "/sounds/numbers/words/fi/viisi.mp3"
    },
    {
      content_id: content[5].content_id,
      language_id: languageMap.uk.language_id,
      value: "п'ять",
      sound_path: "/sounds/numbers/words/uk/п'ять.mp3"
    },
    {
      content_id: content[5].content_id,
      language_id: languageMap.ru.language_id,
      value: "пять",
      sound_path: "/sounds/numbers/words/ru/пять.mp3"
    },

    // word 7
    {
      content_id: content[6].content_id,
      language_id: languageMap.en.language_id,
      value: "six",
      sound_path: "/sounds/numbers/words/en/six.mp3"
    },
    {
      content_id: content[6].content_id,
      language_id: languageMap.fi.language_id,
      value: "kuusi",
      sound_path: "/sounds/numbers/words/fi/kuusi.mp3"
    },
    {
      content_id: content[6].content_id,
      language_id: languageMap.uk.language_id,
      value: "шість",
      sound_path: "/sounds/numbers/words/uk/шість.mp3"
    },
    {
      content_id: content[6].content_id,
      language_id: languageMap.ru.language_id,
      value: "шесть",
      sound_path: "/sounds/numbers/words/ru/шесть.mp3"
    },

    // word 8
    {
      content_id: content[7].content_id,
      language_id: languageMap.en.language_id,
      value: "seven",
      sound_path: "/sounds/numbers/words/en/seven.mp3"
    },
    {
      content_id: content[7].content_id,
      language_id: languageMap.fi.language_id,
      value: "seitsemän",
      sound_path: "/sounds/numbers/words/fi/seitsemän.mp3"
    },
    {
      content_id: content[7].content_id,
      language_id: languageMap.uk.language_id,
      value: "сім",
      sound_path: "/sounds/numbers/words/uk/сім.mp3"
    },
    {
      content_id: content[7].content_id,
      language_id: languageMap.ru.language_id,
      value: "семь",
      sound_path: "/sounds/numbers/words/ru/семь.mp3"
    },

    // word 9
    {
      content_id: content[8].content_id,
      language_id: languageMap.en.language_id,
      value: "eight",
      sound_path: "/sounds/numbers/words/en/eight.mp3"
    },
    {
      content_id: content[8].content_id,
      language_id: languageMap.fi.language_id,
      value: "kahdeksan",
      sound_path: "/sounds/numbers/words/fi/kahdeksan.mp3"
    },
    {
      content_id: content[8].content_id,
      language_id: languageMap.uk.language_id,
      value: "вісім",
      sound_path: "/sounds/numbers/words/uk/вісім.mp3"
    },
    {
      content_id: content[8].content_id,
      language_id: languageMap.ru.language_id,
      value: "восемь",
      sound_path: "/sounds/numbers/words/ru/восемь.mp3"
    },

    // word 10
    {
      content_id: content[9].content_id,
      language_id: languageMap.en.language_id,
      value: "nine",
      sound_path: "/sounds/numbers/words/en/nine.mp3"
    },
    {
      content_id: content[9].content_id,
      language_id: languageMap.fi.language_id,
      value: "yhdeksän",
      sound_path: "/sounds/numbers/words/fi/yhdeksän.mp3"
    },
    {
      content_id: content[9].content_id,
      language_id: languageMap.uk.language_id,
      value: "дев'ять",
      sound_path: "/sounds/numbers/words/uk/дев'ять.mp3"
    },
    {
      content_id: content[9].content_id,
      language_id: languageMap.ru.language_id,
      value: "девять",
      sound_path: "/sounds/numbers/words/ru/девять.mp3"
    },

    // word 11
    {
      content_id: content[10].content_id,
      language_id: languageMap.en.language_id,
      value: "ten",
      sound_path: "/sounds/numbers/words/en/ten.mp3"
    },
    {
      content_id: content[10].content_id,
      language_id: languageMap.fi.language_id,
      value: "kymmenen",
      sound_path: "/sounds/numbers/words/fi/kymmenen.mp3"
    },
    {
      content_id: content[10].content_id,
      language_id: languageMap.uk.language_id,
      value: "десять",
      sound_path: "/sounds/numbers/words/uk/десять.mp3"
    },
    {
      content_id: content[10].content_id,
      language_id: languageMap.ru.language_id,
      value: "десять",
      sound_path: "/sounds/numbers/words/ru/десять.mp3"
    },

    // SENTENCES

    // sentence 1
    {
      content_id: content[11].content_id,
      language_id: languageMap.en.language_id,
      value: "I have {{answer}} brother.",
      answer_value: "one",
      sound_path: "/sounds/numbers/sentences/en/one.mp3"
    },
    {
      content_id: content[11].content_id,
      language_id: languageMap.fi.language_id,
      value: "Minulla on {{answer}} veli.",
      answer_value: "yksi",
      sound_path: "/sounds/numbers/sentences/fi/yksi.mp3"
    },
    {
      content_id: content[11].content_id,
      language_id: languageMap.uk.language_id,
      value: "У мене є {{answer}} брат.",
      answer_value: "один",
      sound_path: "/sounds/numbers/sentences/uk/один.mp3"
    },
    {
      content_id: content[11].content_id,
      language_id: languageMap.ru.language_id,
      value: "У меня есть {{answer}} брат.",
      answer_value: "один",
      sound_path: "/sounds/numbers/sentences/ru/один.mp3"
    },

    // sentence 2
    {
      content_id: content[12].content_id,
      language_id: languageMap.en.language_id,
      value: "You have {{answer}} sisters.",
      answer_value: "two",
      sound_path: "/sounds/numbers/sentences/en/two.mp3"
    },
    {
      content_id: content[12].content_id,
      language_id: languageMap.fi.language_id,
      value: "Sinulla on {{answer}} siskoa.",
      answer_value: "kaksi",
      sound_path: "/sounds/numbers/sentences/fi/kaksi.mp3"
    },
    {
      content_id: content[12].content_id,
      language_id: languageMap.uk.language_id,
      value: "У тебе є {{answer}} сестри.",
      answer_value: "дві",
      sound_path: "/sounds/numbers/sentences/uk/два.mp3"
    },
    {
      content_id: content[12].content_id,
      language_id: languageMap.ru.language_id,
      value: "У тебя есть {{answer}} сестры.",
      answer_value: "две",
      sound_path: "/sounds/numbers/sentences/ru/два.mp3"
    },

    // sentence 3
    {
      content_id: content[13].content_id,
      language_id: languageMap.en.language_id,
      value: "Mikael has {{answer}} books.",
      answer_value: "three",
      sound_path: "/sounds/numbers/sentences/en/three.mp3"
    },
    {
      content_id: content[13].content_id,
      language_id: languageMap.fi.language_id,
      value: "Mikaelilla on {{answer}} kirjaa.",
      answer_value: "kolme",
      sound_path: "/sounds/numbers/sentences/fi/kolme.mp3"
    },
    {
      content_id: content[13].content_id,
      language_id: languageMap.uk.language_id,
      value: "У Мікаеля є {{answer}} книги.",
      answer_value: "три",
      sound_path: "/sounds/numbers/sentences/uk/три.mp3"
    },
    {
      content_id: content[13].content_id,
      language_id: languageMap.ru.language_id,
      value: "У Микаэля есть {{answer}} книги.",
      answer_value: "три",
      sound_path: "/sounds/numbers/sentences/ru/три.mp3"
    },

    // sentence 4
    {
      content_id: content[14].content_id,
      language_id: languageMap.en.language_id,
      value: "We have {{answer}} lessons every day.",
      answer_value: "four",
      sound_path: "/sounds/numbers/sentences/en/four.mp3"
    },
    {
      content_id: content[14].content_id,
      language_id: languageMap.fi.language_id,
      value: "Meillä on {{answer}} oppituntia joka päivä.",
      answer_value: "neljä",
      sound_path: "/sounds/numbers/sentences/fi/neljä.mp3"
    },
    {
      content_id: content[14].content_id,
      language_id: languageMap.uk.language_id,
      value: "У нас щодня {{answer}} уроки.",
      answer_value: "чотири",
      sound_path: "/sounds/numbers/sentences/uk/чотири.mp3"
    },
    {
      content_id: content[14].content_id,
      language_id: languageMap.ru.language_id,
      value: "У нас каждый день {{answer}} урока.",
      answer_value: "четыре",
      sound_path: "/sounds/numbers/sentences/ru/четыре.mp3"
    },

    // sentence 5
    {
      content_id: content[15].content_id,
      language_id: languageMap.en.language_id,
      value: "We buy {{answer}} liters of milk every week.",
      answer_value: "five",
      sound_path: "/sounds/numbers/sentences/en/five.mp3"
    },
    {
      content_id: content[15].content_id,
      language_id: languageMap.fi.language_id,
      value: "Ostamme {{answer}} litraa maitoa joka viikko.",
      answer_value: "viisi",
      sound_path: "/sounds/numbers/sentences/fi/viisi.mp3"
    },
    {
      content_id: content[15].content_id,
      language_id: languageMap.uk.language_id,
      value: "Ми купуємо {{answer}} літрів молока щотижня.",
      answer_value: "п'ять",
      sound_path: "/sounds/numbers/sentences/uk/п'ять.mp3"
    },
    {
      content_id: content[15].content_id,
      language_id: languageMap.ru.language_id,
      value: "Мы покупаем {{answer}} литров молока каждую неделю.",
      answer_value: "пять",
      sound_path: "/sounds/numbers/sentences/ru/пять.mp3"
    },

    // sentence 6
    {
      content_id: content[16].content_id,
      language_id: languageMap.en.language_id,
      value: "They have {{answer}} apples.",
      answer_value: "six",
      sound_path: "/sounds/numbers/sentences/en/six.mp3"
    },
    {
      content_id: content[16].content_id,
      language_id: languageMap.fi.language_id,
      value: "Heillä on {{answer}} omenaa.",
      answer_value: "kuusi",
      sound_path: "/sounds/numbers/sentences/fi/kuusi.mp3"
    },
    {
      content_id: content[16].content_id,
      language_id: languageMap.uk.language_id,
      value: "У них є {{answer}} яблук.",
      answer_value: "шість",
      sound_path: "/sounds/numbers/sentences/uk/шість.mp3"
    },
    {
      content_id: content[16].content_id,
      language_id: languageMap.ru.language_id,
      value: "У них есть {{answer}} яблок.",
      answer_value: "шесть",
      sound_path: "/sounds/numbers/sentences/ru/шесть.mp3"
    },

    // sentence 7
    {
      content_id: content[17].content_id,
      language_id: languageMap.en.language_id,
      value: "I have {{answer}} notebooks.",
      answer_value: "seven",
      sound_path: "/sounds/numbers/sentences/en/seven.mp3"
    },
    {
      content_id: content[17].content_id,
      language_id: languageMap.fi.language_id,
      value: "Minulla on {{answer}} vihkoa.",
      answer_value: "seitsemän",
      sound_path: "/sounds/numbers/sentences/fi/seitsemän.mp3"
    },
    {
      content_id: content[17].content_id,
      language_id: languageMap.uk.language_id,
      value: "У мене є {{answer}} зошитів.",
      answer_value: "сім",
      sound_path: "/sounds/numbers/sentences/uk/сім.mp3"
    },
    {
      content_id: content[17].content_id,
      language_id: languageMap.ru.language_id,
      value: "У меня есть {{answer}} тетрадей.",
      answer_value: "семь",
      sound_path: "/sounds/numbers/sentences/ru/семь.mp3"
    },

    // sentence 8
    {
      content_id: content[18].content_id,
      language_id: languageMap.en.language_id,
      value: "You have {{answer}} pens.",
      answer_value: "eight",
      sound_path: "/sounds/numbers/sentences/en/eight.mp3"
    },
    {
      content_id: content[18].content_id,
      language_id: languageMap.fi.language_id,
      value: "Sinulla on {{answer}} kynää.",
      answer_value: "kahdeksan",
      sound_path: "/sounds/numbers/sentences/fi/kahdeksan.mp3"
    },
    {
      content_id: content[18].content_id,
      language_id: languageMap.uk.language_id,
      value: "У тебе є {{answer}} ручок.",
      answer_value: "вісім",
      sound_path: "/sounds/numbers/sentences/uk/вісім.mp3"
    },
    {
      content_id: content[18].content_id,
      language_id: languageMap.ru.language_id,
      value: "У тебя есть {{answer}} ручек.",
      answer_value: "восемь",
      sound_path: "/sounds/numbers/sentences/ru/восемь.mp3"
    },

    // sentence 9
    {
      content_id: content[19].content_id,
      language_id: languageMap.en.language_id,
      value: "We have {{answer}} glasses.",
      answer_value: "nine",
      sound_path: "/sounds/numbers/sentences/en/nine.mp3"
    },
    {
      content_id: content[19].content_id,
      language_id: languageMap.fi.language_id,
      value: "Meillä on {{answer}} lasia.",
      answer_value: "yhdeksän",
      sound_path: "/sounds/numbers/sentences/fi/yhdeksän.mp3"
    },
    {
      content_id: content[19].content_id,
      language_id: languageMap.uk.language_id,
      value: "У нас є {{answer}} склянок.",
      answer_value: "дев'ять",
      sound_path: "/sounds/numbers/sentences/uk/дев'ять.mp3"
    },
    {
      content_id: content[19].content_id,
      language_id: languageMap.ru.language_id,
      value: "У нас есть {{answer}} стаканов.",
      answer_value: "девять",
      sound_path: "/sounds/numbers/sentences/ru/девять.mp3"
    },

    // sentence 10
    {
      content_id: content[20].content_id,
      language_id: languageMap.en.language_id,
      value: "Emma has {{answer}} pencils.",
      answer_value: "ten",
      sound_path: "/sounds/numbers/sentences/en/ten.mp3"
    },
    {
      content_id: content[20].content_id,
      language_id: languageMap.fi.language_id,
      value: "Emmalla on {{answer}} lyijykynää.",
      answer_value: "kymmenen",
      sound_path: "/sounds/numbers/sentences/fi/kymmenen.mp3"
    },
    {
      content_id: content[20].content_id,
      language_id: languageMap.uk.language_id,
      value: "У Емми є {{answer}} олівців.",
      answer_value: "десять",
      sound_path: "/sounds/numbers/sentences/uk/десять.mp3"
    },
    {
      content_id: content[20].content_id,
      language_id: languageMap.ru.language_id,
      value: "У Эммы есть {{answer}} карандашей.",
      answer_value: "десять",
      sound_path: "/sounds/numbers/sentences/ru/десять.mp3"
    },

    // TEXT
    {
      content_id: content[21].content_id,
      language_id: languageMap.en.language_id,
      value: "Emma goes to the shop with her family. They buy one pack of rice, two loaves of bread and three packs of cheese. They also buy four fish, five liters of milk and six apples. They buy seven bananas, eight pieces of meat, nine potatoes and ten eggs. At home, Emma counts the food. One, two, three, four, five, six, seven, eight, nine, ten! Emma likes numbers.",
      sound_path: "/sounds/numbers/text/en_numbers.mp3",
      title: "Numbers"
    },
    {
      content_id: content[21].content_id,
      language_id: languageMap.fi.language_id,
      value: "Emma menee kauppaan perheensä kanssa. He ostavat yhden paketin riisiä, kaksi leipää ja kolme pakettia juustoa. He ostavat myös neljä kalaa, viisi litraa maitoa ja kuusi omenaa. He ostavat seitsemän banaania, kahdeksan palaa lihaa, yhdeksän perunaa ja kymmenen kananmunaa. Kotona Emma laskee ruuat. Yksi, kaksi, kolme, neljä, viisi, kuusi, seitsemän, kahdeksan, yhdeksän, kymmenen! Emma pitää numeroista.",
      sound_path: "/sounds/numbers/text/fi_numbers.mp3",
      title: "Numerot"
    },
    {
      content_id: content[21].content_id,
      language_id: languageMap.uk.language_id,
      value: "Емма йде до магазину зі своєю сім'єю. Вони купують одну пачку рису, два хліби та три пачки сиру. Вони також купують чотири риби, п'ять літрів молока та шість яблук. Вони купують сім бананів, вісім шматків м'яса, дев'ять картоплин і десять яєць. Вдома Емма рахує їжу. Один, два, три, чотири, п'ять, шість, сім, вісім, дев'ять, десять! Емма любить числа.",
      sound_path: "/sounds/numbers/text/uk_numbers.mp3",
      title: "Числа"
    },
    {
      content_id: content[21].content_id,
      language_id: languageMap.ru.language_id,
      value: "Эмма идёт в магазин со своей семьёй. Они покупают одну пачку риса, два хлеба и три пачки сыра. Они также покупают четыре рыбы, пять литров молока и шесть яблок. Они покупают семь бананов, восемь кусочков мяса, девять картофелин и десять яиц. Дома Эмма считает еду. Один, два, три, четыре, пять, шесть, семь, восемь, девять, десять! Эмма любит числа.",
      sound_path: "/sounds/numbers/text/ru_numbers.mp3",
      title: "Числа"
    },
  ]).returning("*");

};