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

    // FOOD
    { type: "word", image_path: "/images/food/food.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/breakfast.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/lunch.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/dinner.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/porridge.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/egg.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/milk.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/potato.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/meat.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/fish.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/rice.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/bread.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/butter.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/cheese.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/apple.png", category_id: categories[2].category_id, },
    { type: "word", image_path: "/images/food/banana.png", category_id: categories[2].category_id, }, // 61

    { type: "sentence", image_path: "/images/food/food.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/breakfast.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/lunch.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/dinner.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/porridge.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/egg.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/milk.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/potato.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/meat.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/fish.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/rice.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/bread.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/butter.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/cheese.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/apple.png", category_id: categories[2].category_id, },
    { type: "sentence", image_path: "/images/food/banana.png", category_id: categories[2].category_id, }, // 77

    { type: "text", image_path: "/images/texts/food_image.png", category_id: categories[2].category_id, }, // 78 
    
  ]).returning('*');
  // 11. CONTENT TRANSLATIONS
  const content_translations = await knex('content_translations').insert([

    // FOOD (WORDS)

    // food
    { content_id: content[0].content_id, language_id: languageMap.en.language_id, value: "food", sound_path: "/sounds/food/words/en/food.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.fi.language_id, value: "ruoka", sound_path: "/sounds/food/words/fi/ruoka.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.uk.language_id, value: "їжа", sound_path: "/sounds/food/words/uk/їжа.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.ru.language_id, value: "еда", sound_path: "/sounds/food/words/ru/еда.mp3" },

    // breakfast
    { content_id: content[1].content_id, language_id: languageMap.en.language_id, value: "breakfast", sound_path: "/sounds/food/words/en/breakfast.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.fi.language_id, value: "aamiainen", sound_path: "/sounds/food/words/fi/aamiainen.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.uk.language_id, value: "сніданок", sound_path: "/sounds/food/words/uk/сніданок.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.ru.language_id, value: "завтрак", sound_path: "/sounds/food/words/ru/завтрак.mp3" },

    // lunch
    { content_id: content[2].content_id, language_id: languageMap.en.language_id, value: "lunch", sound_path: "/sounds/food/words/en/lunch.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.fi.language_id, value: "lounas", sound_path: "/sounds/food/words/fi/lounas.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.uk.language_id, value: "обід", sound_path: "/sounds/food/words/uk/обід.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.ru.language_id, value: "обед", sound_path: "/sounds/food/words/ru/обед.mp3" },

    // dinner
    { content_id: content[3].content_id, language_id: languageMap.en.language_id, value: "dinner", sound_path: "/sounds/food/words/en/dinner.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.fi.language_id, value: "päivällinen", sound_path: "/sounds/food/words/fi/päivällinen.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.uk.language_id, value: "вечеря", sound_path: "/sounds/food/words/uk/вечеря.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.ru.language_id, value: "ужин", sound_path: "/sounds/food/words/ru/ужин.mp3" },

    // porridge
    { content_id: content[4].content_id, language_id: languageMap.en.language_id, value: "porridge", sound_path: "/sounds/food/words/en/porridge.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.fi.language_id, value: "puuro", sound_path: "/sounds/food/words/fi/puuro.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.uk.language_id, value: "каша", sound_path: "/sounds/food/words/uk/каша.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.ru.language_id, value: "каша", sound_path: "/sounds/food/words/ru/каша.mp3" },

    // egg
    { content_id: content[5].content_id, language_id: languageMap.en.language_id, value: "egg", sound_path: "/sounds/food/words/en/egg.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.fi.language_id, value: "kananmuna", sound_path: "/sounds/food/words/fi/kananmuna.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.uk.language_id, value: "яйце", sound_path: "/sounds/food/words/uk/яйце.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.ru.language_id, value: "яйцо", sound_path: "/sounds/food/words/ru/яйцо.mp3" },

    // milk
    { content_id: content[6].content_id, language_id: languageMap.en.language_id, value: "milk", sound_path: "/sounds/food/words/en/milk.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.fi.language_id, value: "maito", sound_path: "/sounds/food/words/fi/maito.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.uk.language_id, value: "молоко", sound_path: "/sounds/food/words/uk/молоко.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.ru.language_id, value: "молоко", sound_path: "/sounds/food/words/ru/молоко.mp3" },

    // potato
    { content_id: content[7].content_id, language_id: languageMap.en.language_id, value: "potato", sound_path: "/sounds/food/words/en/potato.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.fi.language_id, value: "peruna", sound_path: "/sounds/food/words/fi/peruna.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.uk.language_id, value: "картопля", sound_path: "/sounds/food/words/uk/картопля.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.ru.language_id, value: "картофель", sound_path: "/sounds/food/words/ru/картофель.mp3" },

    // meat
    { content_id: content[8].content_id, language_id: languageMap.en.language_id, value: "meat", sound_path: "/sounds/food/words/en/meat.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.fi.language_id, value: "liha", sound_path: "/sounds/food/words/fi/liha.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.uk.language_id, value: "м'ясо", sound_path: "/sounds/food/words/uk/м'ясо.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.ru.language_id, value: "мясо", sound_path: "/sounds/food/words/ru/мясо.mp3" },

    // fish
    { content_id: content[9].content_id, language_id: languageMap.en.language_id, value: "fish", sound_path: "/sounds/food/words/en/fish.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.fi.language_id, value: "kala", sound_path: "/sounds/food/words/fi/kala.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.uk.language_id, value: "риба", sound_path: "/sounds/food/words/uk/риба.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.ru.language_id, value: "рыба", sound_path: "/sounds/food/words/ru/рыба.mp3" },

    // rice
    { content_id: content[10].content_id, language_id: languageMap.en.language_id, value: "rice", sound_path: "/sounds/food/words/en/rice.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.fi.language_id, value: "riisi", sound_path: "/sounds/food/words/fi/riisi.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.uk.language_id, value: "рис", sound_path: "/sounds/food/words/uk/рис.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.ru.language_id, value: "рис", sound_path: "/sounds/food/words/ru/рис.mp3" },

    // bread
    { content_id: content[11].content_id, language_id: languageMap.en.language_id, value: "bread", sound_path: "/sounds/food/words/en/bread.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.fi.language_id, value: "leipä", sound_path: "/sounds/food/words/fi/leipä.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.uk.language_id, value: "хліб", sound_path: "/sounds/food/words/uk/хліб.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.ru.language_id, value: "хлеб", sound_path: "/sounds/food/words/ru/хлеб.mp3" },

    // butter
    { content_id: content[12].content_id, language_id: languageMap.en.language_id, value: "butter", sound_path: "/sounds/food/words/en/butter.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.fi.language_id, value: "voi", sound_path: "/sounds/food/words/fi/voi.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.uk.language_id, value: "масло", sound_path: "/sounds/food/words/uk/масло.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.ru.language_id, value: "масло", sound_path: "/sounds/food/words/ru/масло.mp3" },

    // cheese
    { content_id: content[13].content_id, language_id: languageMap.en.language_id, value: "cheese", sound_path: "/sounds/food/words/en/cheese.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.fi.language_id, value: "juusto", sound_path: "/sounds/food/words/fi/juusto.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.uk.language_id, value: "сир", sound_path: "/sounds/food/words/uk/сир.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.ru.language_id, value: "сыр", sound_path: "/sounds/food/words/ru/сыр.mp3" },

    // apple
    { content_id: content[14].content_id, language_id: languageMap.en.language_id, value: "apple", sound_path: "/sounds/food/words/en/apple.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.fi.language_id, value: "omena", sound_path: "/sounds/food/words/fi/omena.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.uk.language_id, value: "яблуко", sound_path: "/sounds/food/words/uk/яблуко.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.ru.language_id, value: "яблоко", sound_path: "/sounds/food/words/ru/яблоко.mp3" },

    // banana
    { content_id: content[15].content_id, language_id: languageMap.en.language_id, value: "banana", sound_path: "/sounds/food/words/en/banana.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.fi.language_id, value: "banaani", sound_path: "/sounds/food/words/fi/banaani.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.uk.language_id, value: "банан", sound_path: "/sounds/food/words/uk/банан.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.ru.language_id, value: "банан", sound_path: "/sounds/food/words/ru/банан.mp3" },

    // FOOD (SENTENCES)

    // food
    { content_id: content[16].content_id, language_id: languageMap.en.language_id, value: "I like healthy {{answer}}.", answer_value: "food", sound_path: "/sounds/food/sentences/en/food.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.fi.language_id, value: "Pidän terveellisestä {{answer}}.", answer_value: "ruoasta", sound_path: "/sounds/food/sentences/fi/ruoka.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.uk.language_id, value: "Я люблю здорову {{answer}}.", answer_value: "їжу", sound_path: "/sounds/food/sentences/uk/їжа.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.ru.language_id, value: "Я люблю здоровую {{answer}}.", answer_value: "еду", sound_path: "/sounds/food/sentences/ru/еда.mp3" },

    // breakfast
    { content_id: content[17].content_id, language_id: languageMap.en.language_id, value: "I eat {{answer}} with my family.", answer_value: "breakfast", sound_path: "/sounds/food/sentences/en/breakfast.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} minun perheen kanssa.", answer_value: "aamiaisen", sound_path: "/sounds/food/sentences/fi/aamiainen.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.uk.language_id, value: "Я снідаю зі своєю {{answer}}.", answer_value: "сім'єю", sound_path: "/sounds/food/sentences/uk/сніданок.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.ru.language_id, value: "Я завтракаю со своей {{answer}}.", answer_value: "семьёй", sound_path: "/sounds/food/sentences/ru/завтрак.mp3" },

    // lunch
    { content_id: content[18].content_id, language_id: languageMap.en.language_id, value: "I have {{answer}} at school.", answer_value: "lunch", sound_path: "/sounds/food/sentences/en/lunch.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} koulussa.", answer_value: "lounaan", sound_path: "/sounds/food/sentences/fi/lounas.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.uk.language_id, value: "Я обідаю в {{answer}}.", answer_value: "школі", sound_path: "/sounds/food/sentences/uk/обід.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.ru.language_id, value: "Я обедаю в {{answer}}.", answer_value: "школе", sound_path: "/sounds/food/sentences/ru/обед.mp3" },

    // dinner
    { content_id: content[19].content_id, language_id: languageMap.en.language_id, value: "My family eats {{answer}} together.", answer_value: "dinner", sound_path: "/sounds/food/sentences/en/dinner.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.fi.language_id, value: "Minun perhe syö {{answer}} yhdessä.", answer_value: "päivällisen", sound_path: "/sounds/food/sentences/fi/päivällinen.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.uk.language_id, value: "Моя сім'я вечеряє {{answer}}.", answer_value: "разом", sound_path: "/sounds/food/sentences/uk/вечеря.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.ru.language_id, value: "Моя семья ужинает {{answer}}.", answer_value: "вместе", sound_path: "/sounds/food/sentences/ru/ужин.mp3" },

    // porridge
    { content_id: content[20].content_id, language_id: languageMap.en.language_id, value: "I eat {{answer}} for breakfast.", answer_value: "porridge", sound_path: "/sounds/food/sentences/en/porridge.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} aamiaiseksi.", answer_value: "puuroa", sound_path: "/sounds/food/sentences/fi/puuro.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} на сніданок.", answer_value: "кашу", sound_path: "/sounds/food/sentences/uk/каша.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} на завтрак.", answer_value: "кашу", sound_path: "/sounds/food/sentences/ru/каша.mp3" },

    // egg
    { content_id: content[21].content_id, language_id: languageMap.en.language_id, value: "I eat an {{answer}} for breakfast.", answer_value: "egg", sound_path: "/sounds/food/sentences/en/egg.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} aamiaiseksi.", answer_value: "kananmunan", sound_path: "/sounds/food/sentences/fi/kananmuna.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} на сніданок.", answer_value: "яйце", sound_path: "/sounds/food/sentences/uk/яйце.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} на завтрак.", answer_value: "яйцо", sound_path: "/sounds/food/sentences/ru/яйцо.mp3" },

    // milk
    { content_id: content[22].content_id, language_id: languageMap.en.language_id, value: "I drink {{answer}} every morning.", answer_value: "milk", sound_path: "/sounds/food/sentences/en/milk.mp3" },
    { content_id: content[22].content_id, language_id: languageMap.fi.language_id, value: "Juon {{answer}} joka aamu.", answer_value: "maitoa", sound_path: "/sounds/food/sentences/fi/maito.mp3" },
    { content_id: content[22].content_id, language_id: languageMap.uk.language_id, value: "Я п'ю {{answer}} щоранку.", answer_value: "молоко", sound_path: "/sounds/food/sentences/uk/молоко.mp3" },
    { content_id: content[22].content_id, language_id: languageMap.ru.language_id, value: "Я пью {{answer}} каждое утро.", answer_value: "молоко", sound_path: "/sounds/food/sentences/ru/молоко.mp3" },

    // potato
    { content_id: content[23].content_id, language_id: languageMap.en.language_id, value: "I eat {{answer}} for lunch.", answer_value: "potatoes", sound_path: "/sounds/food/sentences/en/potato.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} lounaaksi.", answer_value: "perunoita", sound_path: "/sounds/food/sentences/fi/peruna.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} на обід.", answer_value: "картоплю", sound_path: "/sounds/food/sentences/uk/картопля.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} на обед.", answer_value: "картофель", sound_path: "/sounds/food/sentences/ru/картофель.mp3" },

    // meat
    { content_id: content[24].content_id, language_id: languageMap.en.language_id, value: "My father likes {{answer}}.", answer_value: "meat", sound_path: "/sounds/food/sentences/en/meat.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.fi.language_id, value: "Minun isä pitää {{answer}}.", answer_value: "lihasta", sound_path: "/sounds/food/sentences/fi/liha.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.uk.language_id, value: "Мій тато любить {{answer}}.", answer_value: "м'ясо", sound_path: "/sounds/food/sentences/uk/м'ясо.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.ru.language_id, value: "Мой папа любит {{answer}}.", answer_value: "мясо", sound_path: "/sounds/food/sentences/ru/мясо.mp3" },

    // fish
    { content_id: content[25].content_id, language_id: languageMap.en.language_id, value: "My mother likes {{answer}}.", answer_value: "fish", sound_path: "/sounds/food/sentences/en/fish.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.fi.language_id, value: "Minun äiti pitää {{answer}}.", answer_value: "kalasta", sound_path: "/sounds/food/sentences/fi/kala.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.uk.language_id, value: "Моя мама любить {{answer}}.", answer_value: "рибу", sound_path: "/sounds/food/sentences/uk/риба.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.ru.language_id, value: "Моя мама любит {{answer}}.", answer_value: "рыбу", sound_path: "/sounds/food/sentences/ru/рыба.mp3" },

    // rice
    { content_id: content[26].content_id, language_id: languageMap.en.language_id, value: "I eat {{answer}} with fish.", answer_value: "rice", sound_path: "/sounds/food/sentences/en/rice.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} kalan kanssa.", answer_value: "riisiä", sound_path: "/sounds/food/sentences/fi/riisi.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} із рибою.", answer_value: "рис", sound_path: "/sounds/food/sentences/uk/рис.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} с рыбой.", answer_value: "рис", sound_path: "/sounds/food/sentences/ru/рис.mp3" },

    // bread
    { content_id: content[27].content_id, language_id: languageMap.en.language_id, value: "We eat {{answer}} every day.", answer_value: "bread", sound_path: "/sounds/food/sentences/en/bread.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.fi.language_id, value: "Me syömme {{answer}} joka päivä.", answer_value: "leipää", sound_path: "/sounds/food/sentences/fi/leipä.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.uk.language_id, value: "Ми їмо {{answer}} щодня.", answer_value: "хліб", sound_path: "/sounds/food/sentences/uk/хліб.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.ru.language_id, value: "Мы едим {{answer}} каждый день.", answer_value: "хлеб", sound_path: "/sounds/food/sentences/ru/хлеб.mp3" },

    // butter
    { content_id: content[28].content_id, language_id: languageMap.en.language_id, value: "I eat bread with {{answer}}.", answer_value: "butter", sound_path: "/sounds/food/sentences/en/butter.mp3" },
    { content_id: content[28].content_id, language_id: languageMap.fi.language_id, value: "Syön leipää {{answer}} kanssa.", answer_value: "voin", sound_path: "/sounds/food/sentences/fi/voi.mp3" },
    { content_id: content[28].content_id, language_id: languageMap.uk.language_id, value: "Я їм хліб із {{answer}}.", answer_value: "маслом", sound_path: "/sounds/food/sentences/uk/масло.mp3" },
    { content_id: content[28].content_id, language_id: languageMap.ru.language_id, value: "Я ем хлеб с {{answer}}.", answer_value: "маслом", sound_path: "/sounds/food/sentences/ru/масло.mp3" },

    // cheese
    { content_id: content[29].content_id, language_id: languageMap.en.language_id, value: "My sister likes {{answer}}.", answer_value: "cheese", sound_path: "/sounds/food/sentences/en/cheese.mp3" },
    { content_id: content[29].content_id, language_id: languageMap.fi.language_id, value: "Minun sisko pitää {{answer}}.", answer_value: "juustosta", sound_path: "/sounds/food/sentences/fi/juusto.mp3" },
    { content_id: content[29].content_id, language_id: languageMap.uk.language_id, value: "Моя сестра любить {{answer}}.", answer_value: "сир", sound_path: "/sounds/food/sentences/uk/сир.mp3" },
    { content_id: content[29].content_id, language_id: languageMap.ru.language_id, value: "Моя сестра любит {{answer}}.", answer_value: "сыр", sound_path: "/sounds/food/sentences/ru/сыр.mp3" },

    // apple
    { content_id: content[30].content_id, language_id: languageMap.en.language_id, value: "My brother eats an {{answer}}.", answer_value: "apple", sound_path: "/sounds/food/sentences/en/apple.mp3" },
    { content_id: content[30].content_id, language_id: languageMap.fi.language_id, value: "Minun veli syö {{answer}}.", answer_value: "omenan", sound_path: "/sounds/food/sentences/fi/omena.mp3" },
    { content_id: content[30].content_id, language_id: languageMap.uk.language_id, value: "Мій брат їсть {{answer}}.", answer_value: "яблуко", sound_path: "/sounds/food/sentences/uk/яблуко.mp3" },
    { content_id: content[30].content_id, language_id: languageMap.ru.language_id, value: "Мой брат ест {{answer}}.", answer_value: "яблоко", sound_path: "/sounds/food/sentences/ru/яблоко.mp3" },

    // banana
    { content_id: content[31].content_id, language_id: languageMap.en.language_id, value: "I eat a {{answer}} after lunch.", answer_value: "banana", sound_path: "/sounds/food/sentences/en/banana.mp3" },
    { content_id: content[31].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} lounaan jälkeen.", answer_value: "banaanin", sound_path: "/sounds/food/sentences/fi/banaani.mp3" },
    { content_id: content[31].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} після обіду.", answer_value: "банан", sound_path: "/sounds/food/sentences/uk/банан.mp3" },
    { content_id: content[31].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} после обеда.", answer_value: "банан", sound_path: "/sounds/food/sentences/ru/банан.mp3" },

    // FOOD (TEXT)

    // English
    {
      content_id: content[32].content_id,
      language_id: languageMap.en.language_id,
      value: "Hello! My name is Emma. Every day I eat healthy food. In the morning I have breakfast. I eat porridge or an egg and drink milk. For lunch I eat potatoes with meat. For dessert I eat an apple or a banana. For dinner I eat fish with rice. Before bed I eat bread with butter and cheese and drink a glass of milk. I like healthy food.",
      sound_path: "/sounds/food/text/en_food.mp3",
      title: "Food"
    },

    // Finnish
    {
      content_id: content[32].content_id,
      language_id: languageMap.fi.language_id,
      value: "Hei! Minun nimi on Emma. Syön terveellistä ruokaa joka päivä. Aamulla syön aamiaisen. Syön puuroa tai kananmunan ja juon maitoa. Lounaaksi syön perunoita ja lihaa. Jälkiruoaksi syön omenan tai banaanin. Päivälliseksi syön kalaa ja riisiä. Ennen nukkumaanmenoa syön leipää voilla ja juustolla ja juon lasillisen maitoa. Pidän terveellisestä ruoasta.",
      sound_path: "/sounds/food/text/fi_food.mp3",
      title: "Ruoka"
    },

    // Ukrainian
    {
      content_id: content[32].content_id,
      language_id: languageMap.uk.language_id,
      value: "Привіт! Мене звати Емма. Щодня я їм здорову їжу. Вранці я снідаю. Я їм кашу або яйце і п’ю молоко. На обід я їм картоплю з м’ясом. На десерт я їм яблуко або банан. На вечерю я їм рибу з рисом. Перед сном я їм хліб із маслом і сиром та п’ю склянку молока. Я люблю здорову їжу.",
      sound_path: "/sounds/food/text/uk_food.mp3",
      title: "їжа"
    },

    // Russian
    {
      content_id: content[32].content_id,
      language_id: languageMap.ru.language_id,
      value: "Привет! Меня зовут Эмма. Каждый день я ем здоровую еду. Утром я завтракаю. Я ем кашу или яйцо и пью молоко. На обед я ем картофель с мясом. На десерт я ем яблоко или банан. На ужин я ем рыбу с рисом. Перед сном я ем хлеб с маслом и сыром и пью стакан молока. Я люблю здоровую еду.",
      sound_path: "/sounds/food/text/ru_food.mp3",
      title: "Еда"
    },
  ]).returning('*');
};