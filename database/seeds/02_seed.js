/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('progress').del();
  await knex('content_translations').del();
  await knex('content').del();
  await knex('exercise_translations').del();
  await knex('exercises').del();

  const categories = await knex('categories').select('*');

  const languages = await knex('languages').select('*');
  const languageMap = Object.fromEntries(
    languages.map(lang => [lang.code, lang])
  );

  const users_languages = await knex('users_languages').select('*');
  
  // 8. EXERCISES
  const exercises = await knex('exercises').insert([
    { screen_name: 'WordsList', max_score: 5, sort_order: 1 },
    { screen_name: 'WordCard', max_score: 5, sort_order: 2 },
    { screen_name: 'SentenceCard', max_score: 5, sort_order: 3 },
    { screen_name: 'Text', max_score: 5, sort_order: 4 },
    { screen_name: 'MemoGame', max_score: 5, sort_order: 5 },
    { screen_name: 'MatchGame', max_score: 5, sort_order: 6 },
    { screen_name: 'GapsTask', max_score: 5, sort_order: 7 },
  ]).returning('*');

  // 9. EXERCISE TRANSLATIONS
await knex("exercise_translations").insert([
  // Words List
  { exercise_id: exercises[0].exercise_id, language_id: languageMap.en.language_id, name: "Words", description: "Read and listen to the words" },
  { exercise_id: exercises[0].exercise_id, language_id: languageMap.fi.language_id, name: "Sanat", description: "Lue ja kuuntele sanat" },
  { exercise_id: exercises[0].exercise_id, language_id: languageMap.uk.language_id, name: "Слова", description: "Прочитайте та прослухайте слова" },
  { exercise_id: exercises[0].exercise_id, language_id: languageMap.ru.language_id, name: "Слова", description: "Прочитайте и прослушайте слова" },

  // Word Cards
  { exercise_id: exercises[1].exercise_id, language_id: languageMap.en.language_id, name: "Word Cards", description: "Read and listen to a word" },
  { exercise_id: exercises[1].exercise_id, language_id: languageMap.fi.language_id, name: "Sanakortit", description: "Lue ja kuuntele sana" },
  { exercise_id: exercises[1].exercise_id, language_id: languageMap.uk.language_id, name: "Картки зі словами", description: "Прочитайте та прослухайте слово" },
  { exercise_id: exercises[1].exercise_id, language_id: languageMap.ru.language_id, name: "Карточки слов", description: "Прочитайте и прослушайте слово" },

  // Sentences
  { exercise_id: exercises[2].exercise_id, language_id: languageMap.en.language_id, name: "Sentences", description: "Read and listen to the sentences" },
  { exercise_id: exercises[2].exercise_id, language_id: languageMap.fi.language_id, name: "Lauseet", description: "Lue ja kuuntele lauseet" },
  { exercise_id: exercises[2].exercise_id, language_id: languageMap.uk.language_id, name: "Речення", description: "Прочитайте та прослухайте речення" },
  { exercise_id: exercises[2].exercise_id, language_id: languageMap.ru.language_id, name: "Предложения", description: "Прочитайте и прослушайте предложения" },

  // Text
  { exercise_id: exercises[3].exercise_id, language_id: languageMap.en.language_id, name: "Text", description: "Read and listen to the text" },
  { exercise_id: exercises[3].exercise_id, language_id: languageMap.fi.language_id, name: "Teksti", description: "Lue ja kuuntele teksti" },
  { exercise_id: exercises[3].exercise_id, language_id: languageMap.uk.language_id, name: "Текст", description: "Прочитайте та прослухайте текст" },
  { exercise_id: exercises[3].exercise_id, language_id: languageMap.ru.language_id, name: "Текст", description: "Прочитайте и прослушайте текст" },

  // Memo Game
  { exercise_id: exercises[4].exercise_id, language_id: languageMap.en.language_id, name: "Memory Game", description: "Find matching pairs" },
  { exercise_id: exercises[4].exercise_id, language_id: languageMap.fi.language_id, name: "Muistipeli", description: "Löydä kuvaparit" },
  { exercise_id: exercises[4].exercise_id, language_id: languageMap.uk.language_id, name: "Гра на пам'ять", description: "Знайдіть однакові пари" },
  { exercise_id: exercises[4].exercise_id, language_id: languageMap.ru.language_id, name: "Игра на память", description: "Найдите одинаковые пары" },

  // Match Game
  { exercise_id: exercises[5].exercise_id, language_id: languageMap.en.language_id, name: "Match Game", description: "Match words with pictures" },
  { exercise_id: exercises[5].exercise_id, language_id: languageMap.fi.language_id, name: "Yhdistämispeli", description: "Yhdistä sanat kuviin" },
  { exercise_id: exercises[5].exercise_id, language_id: languageMap.uk.language_id, name: "Гра на відповідність", description: "Поєднайте слова із зображеннями" },
  { exercise_id: exercises[5].exercise_id, language_id: languageMap.ru.language_id, name: "Игра на соответствие", description: "Соедините слова с картинками" },

  // Fill the Gaps
  { exercise_id: exercises[6].exercise_id, language_id: languageMap.en.language_id, name: "Fill the Gaps", description: "Fill the missing words in the sentences" },
  { exercise_id: exercises[6].exercise_id, language_id: languageMap.fi.language_id, name: "Täydennä aukot", description: "Täydennä puuttuvat sanat lauseisiin" },
  { exercise_id: exercises[6].exercise_id, language_id: languageMap.uk.language_id, name: "Заповніть пропуски", description: "Заповніть пропущені слова в реченнях" },
  { exercise_id: exercises[6].exercise_id, language_id: languageMap.ru.language_id, name: "Заполните пропуски", description: "Заполните пропущенные слова в предложениях" },
]);

  // 10. CONTENT
  const content = await knex('content').insert([
    
    // FAMILY
    { type: "word", image_path: "/images/family/family.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/mother.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/father.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/son.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/daughter.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/sister.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/brother.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/grandmother.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/grandfather.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/aunt.png", category_id: categories[0].category_id, },
    { type: "word", image_path: "/images/family/uncle.png", category_id: categories[0].category_id, }, // 10

    { type: "sentence", image_path: "/images/family/family.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/mother.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/father.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/son.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/daughter.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/sister.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/brother.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/grandmother.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/grandfather.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/aunt.png", category_id: categories[0].category_id, },
    { type: "sentence", image_path: "/images/family/uncle.png", category_id: categories[0].category_id, }, // 21
    
    { type: "text", image_path: "/images/texts/family_image.png", category_id: categories[0].category_id, }, // 22

    // SCHOOL
    { type: "word", image_path: "/images/school/school.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/classroom.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/teacher.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/student.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/book.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/notebook.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/pen.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/pencil.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/desk.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/lesson.png", category_id: categories[1].category_id, },
    { type: "word", image_path: "/images/school/break.png", category_id: categories[1].category_id, }, // 34

    { type: "sentence", image_path: "/images/school/school.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/classroom.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/teacher.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/student.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/book.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/notebook.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/pen.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/pencil.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/desk.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/lesson.png", category_id: categories[1].category_id, },
    { type: "sentence", image_path: "/images/school/break.png", category_id: categories[1].category_id, }, // 44

    { type: "text", image_path: "/images/texts/school_image.png", category_id: categories[1].category_id, }, // 45

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
    // FAMILY (WORDS)

    // family
    { content_id: content[0].content_id, language_id: languageMap.en.language_id, value: "family", sound_path: "/sounds/family/words/en/family.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.fi.language_id, value: "perhe", sound_path: "/sounds/family/words/fi/perhe.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.uk.language_id, value: "сім'я", sound_path: "/sounds/family/words/uk/сім'я.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.ru.language_id, value: "семья", sound_path: "/sounds/family/words/ru/семья.mp3" },
    // mother
    { content_id: content[1].content_id, language_id: languageMap.en.language_id, value: "mother", sound_path: "/sounds/family/words/en/mother.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.fi.language_id, value: "äiti", sound_path: "/sounds/family/words/fi/äiti.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.uk.language_id, value: "мама", sound_path: "/sounds/family/words/uk/мама.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.ru.language_id, value: "мама", sound_path: "/sounds/family/words/ru/мама.mp3" },
    // father
    { content_id: content[2].content_id, language_id: languageMap.en.language_id, value: "father", sound_path: "/sounds/family/words/en/father.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.fi.language_id, value: "isä", sound_path: "/sounds/family/words/fi/isä.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.uk.language_id, value: "тато", sound_path: "/sounds/family/words/uk/тато.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.ru.language_id, value: "папа", sound_path: "/sounds/family/words/ru/папа.mp3" },
    // son
    { content_id: content[3].content_id, language_id: languageMap.en.language_id, value: "son", sound_path: "/sounds/family/words/en/son.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.fi.language_id, value: "poika", sound_path: "/sounds/family/words/fi/poika.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.uk.language_id, value: "син", sound_path: "/sounds/family/words/uk/син.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.ru.language_id, value: "сын", sound_path: "/sounds/family/words/ru/сын.mp3" },
    // daughter
    { content_id: content[4].content_id, language_id: languageMap.en.language_id, value: "daughter", sound_path: "/sounds/family/words/en/daughter.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.fi.language_id, value: "tytär", sound_path: "/sounds/family/words/fi/tytär.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.uk.language_id, value: "донька", sound_path: "/sounds/family/words/uk/донька.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.ru.language_id, value: "дочь", sound_path: "/sounds/family/words/ru/дочь.mp3" },
    // sister
    { content_id: content[5].content_id, language_id: languageMap.en.language_id, value: "sister", sound_path: "/sounds/family/words/en/sister.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.fi.language_id, value: "sisko", sound_path: "/sounds/family/words/fi/sisko.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.uk.language_id, value: "сестра", sound_path: "/sounds/family/words/uk/сестра.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.ru.language_id, value: "сестра", sound_path: "/sounds/family/words/ru/сестра.mp3" },
    // brother
    { content_id: content[6].content_id, language_id: languageMap.en.language_id, value: "brother", sound_path: "/sounds/family/words/en/brother.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.fi.language_id, value: "veli", sound_path: "/sounds/family/words/fi/veli.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.uk.language_id, value: "брат", sound_path: "/sounds/family/words/uk/брат.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.ru.language_id, value: "брат", sound_path: "/sounds/family/words/ru/брат.mp3" },
    // grandmother
    { content_id: content[7].content_id, language_id: languageMap.en.language_id, value: "grandmother", sound_path: "/sounds/family/words/en/grandmother.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.fi.language_id, value: "isoäiti", sound_path: "/sounds/family/words/fi/isoäiti.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.uk.language_id, value: "бабуся", sound_path: "/sounds/family/words/uk/бабуся.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.ru.language_id, value: "бабушка", sound_path: "/sounds/family/words/ru/бабушка.mp3" },
    // grandfather
    { content_id: content[8].content_id, language_id: languageMap.en.language_id, value: "grandfather", sound_path: "/sounds/family/words/en/grandfather.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.fi.language_id, value: "isoisä", sound_path: "/sounds/family/words/fi/isoisä.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.uk.language_id, value: "дідусь", sound_path: "/sounds/family/words/uk/дідусь.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.ru.language_id, value: "дедушка", sound_path: "/sounds/family/words/ru/дедушка.mp3" },
    // aunt
    { content_id: content[9].content_id, language_id: languageMap.en.language_id, value: "aunt", sound_path: "/sounds/family/words/en/aunt.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.fi.language_id, value: "täti", sound_path: "/sounds/family/words/fi/täti.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.uk.language_id, value: "тітка", sound_path: "/sounds/family/words/uk/тітка.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.ru.language_id, value: "тётя", sound_path: "/sounds/family/words/ru/тётя.mp3" },
    // uncle
    { content_id: content[10].content_id, language_id: languageMap.en.language_id, value: "uncle", sound_path: "/sounds/family/words/en/uncle.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.fi.language_id, value: "eno / setä", sound_path: "/sounds/family/words/fi/eno_setä.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.uk.language_id, value: "дядько", sound_path: "/sounds/family/words/uk/дядько.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.ru.language_id, value: "дядя", sound_path: "/sounds/family/words/ru/дядя.mp3" },
    
    // FAMILY (SENTENCES)

    // family
    { content_id: content[11].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}.", answer_value: "family", sound_path: "/sounds/family/sentences/en/family.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}.", answer_value: "perhe", sound_path: "/sounds/family/sentences/fi/perhe.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.uk.language_id, value: "Це моя {{answer}}.", answer_value: "сім'я", sound_path: "/sounds/family/sentences/uk/сім'я.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.ru.language_id, value: "Это моя {{answer}}.", answer_value: "семья", sound_path: "/sounds/family/sentences/ru/семья.mp3" },

    // mother
    { content_id: content[12].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. Her name is Jane.", answer_value: "mother", sound_path: "/sounds/family/sentences/en/mother.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Jane.", answer_value: "äiti", sound_path: "/sounds/family/sentences/fi/äiti.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.uk.language_id, value: "Це моя {{answer}}. Її звуть Джейн.", answer_value: "мама", sound_path: "/sounds/family/sentences/uk/мама.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.ru.language_id, value: "Это моя {{answer}}. Ее зовут Джейн.", answer_value: "мама", sound_path: "/sounds/family/sentences/ru/мама.mp3" },

    // father
    { content_id: content[13].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. His name is John.", answer_value: "father", sound_path: "/sounds/family/sentences/en/father.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on John.", answer_value: "isä", sound_path: "/sounds/family/sentences/fi/isä.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.uk.language_id, value: "Це мій {{answer}}. Його звати Джон.", answer_value: "тато", sound_path: "/sounds/family/sentences/uk/тато.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.ru.language_id, value: "Это мой {{answer}}. Его зовут Джон.", answer_value: "папа", sound_path: "/sounds/family/sentences/ru/папа.mp3" },

    // son
    { content_id: content[14].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. His name is Mikael.", answer_value: "son", sound_path: "/sounds/family/sentences/en/son.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Mikael.", answer_value: "poika", sound_path: "/sounds/family/sentences/fi/poika.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.uk.language_id, value: "Це мій {{answer}}. Його звуть Мікаель.", answer_value: "син", sound_path: "/sounds/family/sentences/uk/син.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.ru.language_id, value: "Это мой {{answer}}. Его зовут Микаэль.", answer_value: "сын", sound_path: "/sounds/family/sentences/ru/сын.mp3" },

    // daughter
    { content_id: content[15].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. Her name is Penny.", answer_value: "daughter", sound_path: "/sounds/family/sentences/en/daughter.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Penny.", answer_value: "tytär", sound_path: "/sounds/family/sentences/fi/tytär.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.uk.language_id, value: "Це моя {{answer}}. Її звати Пенні.", answer_value: "донька", sound_path: "/sounds/family/sentences/uk/донька.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.ru.language_id, value: "Это моя {{answer}}. Ее зовут Пенни.", answer_value: "дочь", sound_path: "/sounds/family/sentences/ru/дочь.mp3" },

    // sister
    { content_id: content[16].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. Her name is Johanna.", answer_value: "sister", sound_path: "/sounds/family/sentences/en/sister.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Johanna.", answer_value: "sisko", sound_path: "/sounds/family/sentences/fi/sisko.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.uk.language_id, value: "Це моя {{answer}}. Її звати Йоганна.", answer_value: "сестра", sound_path: "/sounds/family/sentences/uk/сестра.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.ru.language_id, value: "Это моя {{answer}}. Её зовут Йоханна.", answer_value: "сестра", sound_path: "/sounds/family/sentences/ru/сестра.mp3" },

    // brother
    { content_id: content[17].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. His name is Jack.", answer_value: "brother", sound_path: "/sounds/family/sentences/en/brother.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Jack.", answer_value: "veli", sound_path: "/sounds/family/sentences/fi/veli.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.uk.language_id, value: "Це мій {{answer}}. Його звати Джек.", answer_value: "брат", sound_path: "/sounds/family/sentences/uk/брат.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.ru.language_id, value: "Это мой {{answer}}. Его зовут Джек.", answer_value: "брат", sound_path: "/sounds/family/sentences/ru/брат.mp3" },

    // grandmother
    { content_id: content[18].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. Her name is Lily.", answer_value: "grandmother", sound_path: "/sounds/family/sentences/en/grandmother.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Lily.", answer_value: "isoäiti", sound_path: "/sounds/family/sentences/fi/isoäiti.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.uk.language_id, value: "Це моя {{answer}}. Її звати Лілі.", answer_value: "бабуся", sound_path: "/sounds/family/sentences/uk/бабуся.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.ru.language_id, value: "Это моя {{answer}}. Ее зовут Лили.", answer_value: "бабушка", sound_path: "/sounds/family/sentences/ru/бабушка.mp3" },

    // grandfather
    { content_id: content[19].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. His name is Leonard.", answer_value: "grandfather", sound_path: "/sounds/family/sentences/en/grandfather.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Leonard.", answer_value: "isoisä", sound_path: "/sounds/family/sentences/fi/isoisä.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.uk.language_id, value: "Це мій {{answer}}. Його звати Леонард.", answer_value: "дідусь", sound_path: "/sounds/family/sentences/uk/дідусь.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.ru.language_id, value: "Это мой {{answer}}. Его зовут Леонард.", answer_value: "дедушка", sound_path: "/sounds/family/sentences/ru/дедушка.mp3" },

    // aunt
    { content_id: content[20].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. Her name is Emily.", answer_value: "aunt", sound_path: "/sounds/family/sentences/en/aunt.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Emily.", answer_value: "täti", sound_path: "/sounds/family/sentences/fi/täti.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.uk.language_id, value: "Це моя {{answer}}. Її звати Емілі.", answer_value: "тітка", sound_path: "/sounds/family/sentences/uk/тітка.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.ru.language_id, value: "Это моя {{answer}}. Её зовут Эмили.", answer_value: "тетя", sound_path: "/sounds/family/sentences/ru/тетя.mp3" },

    // uncle
    { content_id: content[21].content_id, language_id: languageMap.en.language_id, value: "This is my {{answer}}. His name is Bill.", answer_value: "uncle", sound_path: "/sounds/family/sentences/en/uncle.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.fi.language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Bill.", answer_value: "setä", sound_path: "/sounds/family/sentences/fi/eno_setä.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.uk.language_id, value: "Це мій {{answer}}. Його звати Білл.", answer_value: "дядько", sound_path: "/sounds/family/sentences/uk/дядько.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.ru.language_id, value: "Это мой {{answer}}. Его зовут Билл.", answer_value: "дядя", sound_path: "/sounds/family/sentences/ru/дядя.mp3" },

    // FAMILY (TEXT)
    // English
    { 
      content_id: content[22].content_id, 
      language_id: languageMap.en.language_id, 
      value: "Hi! My name is Emma. I have a big family. This is my mother. Her name is Jane. This is my father. His name is John. This is my brother. His name is Mikael. This is my sister. Her name is Penny. This is my grandmother. Her name is Lily. This is my grandfather. His name is Leonard. This is my aunt. Her name is Emily. This is my uncle. His name is Bill. I love my family.", 
      sound_path: "/sounds/family/text/en_family.mp3",
      title: "My family"  
    },
    // Finnish
    { 
      content_id: content[22].content_id, 
      language_id: languageMap.fi.language_id, 
      value: "Hei! Minun nimi on Emma. Minulla on suuri perhe. Tämä on minun äiti. Hänen nimi on Jane. Tämä on minun isä. Hänen nimi on John. Tämä on minun veli. Hänen nimi on Mikael. Tämä on minun sisko. Hänen nimi on Penny. Tämä on minun isoäiti. Hänen nimi on Lily. Tämä on minun isoisä. Hänen nimi on Leonard. Tämä on minun täti. Hänen nimi on Emily. Tämä on minun setä. Hänen nimi on Bill. Rakastan minun perhettä.", 
      sound_path: "/sounds/family/text/fi_family.mp3",
      title: "Minun perhe" 
    },
    // Ukrainian
    { 
      content_id: content[22].content_id, 
      language_id: languageMap.uk.language_id, 
      value: "Привіт! Мене звати Емма. У мене велика родина. Це моя мама. Її звати Джейн. Це мій батько. Його звати Джон. Це мій брат. Його звати Мікаель. Це моя сестра. Її звати Пенні. Це моя бабуся. Її звати Лілі. Це мій дідусь. Його звати Леонард. Це моя тітка. Її звати Емілі. Це мій дядько. Його звати Білл. Я люблю свою сім'ю.", 
      sound_path: "/sounds/family/text/uk_family.mp3",
      title: "Моя сім'я" 
    },
    // Russian
    { 
      content_id: content[22].content_id, 
      language_id: languageMap.ru.language_id, 
      value: "Привет! Меня зовут Эмма. У меня большая семья. Это моя мама. Ее зовут Джейн. Это мой отец. Его зовут Джон. Это мой брат. Его зовут Микаэль. Это моя сестра. Ее зовут Пенни. Это моя бабушка. Ее зовут Лили. Это мой дедушка. Его зовут Леонард. Это моя тетя. Ее зовут Эмили. Это мой дядя. Его зовут Билл. Я люблю свою семью.", 
      sound_path: "/sounds/family/text/ru_family.mp3",
      title: "Моя семья"
    },

    // SCHOOL (WORDS)

    // school
    { content_id: content[23].content_id, language_id: languageMap.en.language_id, value: "school", sound_path: "/sounds/school/words/en/school.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.fi.language_id, value: "koulu", sound_path: "/sounds/school/words/fi/koulu.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.uk.language_id, value: "школа", sound_path: "/sounds/school/words/uk/школа.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.ru.language_id, value: "школа", sound_path: "/sounds/school/words/ru/школа.mp3" },

    // classroom
    { content_id: content[24].content_id, language_id: languageMap.en.language_id, value: "classroom", sound_path: "/sounds/school/words/en/classroom.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.fi.language_id, value: "luokkahuone", sound_path: "/sounds/school/words/fi/luokkahuone.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.uk.language_id, value: "клас", sound_path: "/sounds/school/words/uk/клас.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.ru.language_id, value: "класс", sound_path: "/sounds/school/words/ru/класс.mp3" },

    // teacher
    { content_id: content[25].content_id, language_id: languageMap.en.language_id, value: "teacher", sound_path: "/sounds/school/words/en/teacher.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.fi.language_id, value: "opettaja", sound_path: "/sounds/school/words/fi/opettaja.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.uk.language_id, value: "вчитель", sound_path: "/sounds/school/words/uk/вчитель.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.ru.language_id, value: "учитель", sound_path: "/sounds/school/words/ru/учитель.mp3" },

    // student
    { content_id: content[26].content_id, language_id: languageMap.en.language_id, value: "student", sound_path: "/sounds/school/words/en/student.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.fi.language_id, value: "oppilas", sound_path: "/sounds/school/words/fi/oppilas.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.uk.language_id, value: "учень", sound_path: "/sounds/school/words/uk/учень.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.ru.language_id, value: "ученик", sound_path: "/sounds/school/words/ru/ученик.mp3" },

    // book
    { content_id: content[27].content_id, language_id: languageMap.en.language_id, value: "book", sound_path: "/sounds/school/words/en/book.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.fi.language_id, value: "kirja", sound_path: "/sounds/school/words/fi/kirja.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.uk.language_id, value: "книга", sound_path: "/sounds/school/words/uk/книга.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.ru.language_id, value: "книга", sound_path: "/sounds/school/words/ru/книга.mp3" },

    // notebook
    { content_id: content[28].content_id, language_id: languageMap.en.language_id, value: "notebook", sound_path: "/sounds/school/words/en/notebook.mp3" },
    { content_id: content[28].content_id, language_id: languageMap.fi.language_id, value: "vihko", sound_path: "/sounds/school/words/fi/vihko.mp3" },
    { content_id: content[28].content_id, language_id: languageMap.uk.language_id, value: "зошит", sound_path: "/sounds/school/words/uk/зошит.mp3" },
    { content_id: content[28].content_id, language_id: languageMap.ru.language_id, value: "тетрадь", sound_path: "/sounds/school/words/ru/тетрадь.mp3" },

    // pen
    { content_id: content[29].content_id, language_id: languageMap.en.language_id, value: "pen", sound_path: "/sounds/school/words/en/pen.mp3" },
    { content_id: content[29].content_id, language_id: languageMap.fi.language_id, value: "kynä", sound_path: "/sounds/school/words/fi/kynä.mp3" },
    { content_id: content[29].content_id, language_id: languageMap.uk.language_id, value: "ручка", sound_path: "/sounds/school/words/uk/ручка.mp3" },
    { content_id: content[29].content_id, language_id: languageMap.ru.language_id, value: "ручка", sound_path: "/sounds/school/words/ru/ручка.mp3" },

    // pencil
    { content_id: content[30].content_id, language_id: languageMap.en.language_id, value: "pencil", sound_path: "/sounds/school/words/en/pencil.mp3" },
    { content_id: content[30].content_id, language_id: languageMap.fi.language_id, value: "lyijykynä", sound_path: "/sounds/school/words/fi/lyijykynä.mp3" },
    { content_id: content[30].content_id, language_id: languageMap.uk.language_id, value: "олівець", sound_path: "/sounds/school/words/uk/олівець.mp3" },
    { content_id: content[30].content_id, language_id: languageMap.ru.language_id, value: "карандаш", sound_path: "/sounds/school/words/ru/карандаш.mp3" },

    // desk
    { content_id: content[31].content_id, language_id: languageMap.en.language_id, value: "desk", sound_path: "/sounds/school/words/en/desk.mp3" },
    { content_id: content[31].content_id, language_id: languageMap.fi.language_id, value: "pulpetti", sound_path: "/sounds/school/words/fi/pulpetti.mp3" },
    { content_id: content[31].content_id, language_id: languageMap.uk.language_id, value: "парта", sound_path: "/sounds/school/words/uk/парта.mp3" },
    { content_id: content[31].content_id, language_id: languageMap.ru.language_id, value: "парта", sound_path: "/sounds/school/words/ru/парта.mp3" },

    // lesson
    { content_id: content[32].content_id, language_id: languageMap.en.language_id, value: "lesson", sound_path: "/sounds/school/words/en/lesson.mp3" },
    { content_id: content[32].content_id, language_id: languageMap.fi.language_id, value: "oppitunti", sound_path: "/sounds/school/words/fi/oppitunti.mp3" },
    { content_id: content[32].content_id, language_id: languageMap.uk.language_id, value: "урок", sound_path: "/sounds/school/words/uk/урок.mp3" },
    { content_id: content[32].content_id, language_id: languageMap.ru.language_id, value: "урок", sound_path: "/sounds/school/words/ru/урок.mp3" },

    // break
    { content_id: content[33].content_id, language_id: languageMap.en.language_id, value: "break", sound_path: "/sounds/school/words/en/break.mp3" },
    { content_id: content[33].content_id, language_id: languageMap.fi.language_id, value: "välitunti", sound_path: "/sounds/school/words/fi/välitunti.mp3" },
    { content_id: content[33].content_id, language_id: languageMap.uk.language_id, value: "перерва", sound_path: "/sounds/school/words/uk/перерва.mp3" },
    { content_id: content[33].content_id, language_id: languageMap.ru.language_id, value: "перемена", sound_path: "/sounds/school/words/ru/перемена.mp3" },

    // SCHOOL (SENTENCES)

    // school
    { content_id: content[34].content_id, language_id: languageMap.en.language_id, value: "I go to {{answer}}.", answer_value: "school", sound_path: "/sounds/school/sentences/en/school.mp3" },
    { content_id: content[34].content_id, language_id: languageMap.fi.language_id, value: "Minä menen {{answer}}.", answer_value: "kouluun", sound_path: "/sounds/school/sentences/fi/koulu.mp3" },
    { content_id: content[34].content_id, language_id: languageMap.uk.language_id, value: "Я ходжу до {{answer}}.", answer_value: "школи", sound_path: "/sounds/school/sentences/uk/школа.mp3" },
    { content_id: content[34].content_id, language_id: languageMap.ru.language_id, value: "Я хожу в {{answer}}.", answer_value: "школу", sound_path: "/sounds/school/sentences/ru/школа.mp3" },

    // classroom
    { content_id: content[35].content_id, language_id: languageMap.en.language_id, value: "Our {{answer}} is big and light.", answer_value: "classroom", sound_path: "/sounds/school/sentences/en/classroom.mp3" },
    { content_id: content[35].content_id, language_id: languageMap.fi.language_id, value: "Meidän {{answer}} on suuri ja valoisa.", answer_value: "luokka", sound_path: "/sounds/school/sentences/fi/luokkahuone.mp3" },
    { content_id: content[35].content_id, language_id: languageMap.uk.language_id, value: "Наш {{answer}} великий і світлий.", answer_value: "клас", sound_path: "/sounds/school/sentences/uk/клас.mp3" },
    { content_id: content[35].content_id, language_id: languageMap.ru.language_id, value: "Наш {{answer}} большой и светлый.", answer_value: "класс", sound_path: "/sounds/school/sentences/ru/класс.mp3" },

    // teacher
    { content_id: content[36].content_id, language_id: languageMap.en.language_id, value: "We have a good {{answer}}.", answer_value: "teacher", sound_path: "/sounds/school/sentences/en/teacher.mp3" },
    { content_id: content[36].content_id, language_id: languageMap.fi.language_id, value: "Meillä on hyvä {{answer}}.", answer_value: "opettaja", sound_path: "/sounds/school/sentences/fi/opettaja.mp3" },
    { content_id: content[36].content_id, language_id: languageMap.uk.language_id, value: "У нас хороший {{answer}}.", answer_value: "учитель", sound_path: "/sounds/school/sentences/uk/вчитель.mp3" },
    { content_id: content[36].content_id, language_id: languageMap.ru.language_id, value: "У нас хороший {{answer}}.", answer_value: "учитель", sound_path: "/sounds/school/sentences/ru/учитель.mp3" },

    // student
    { content_id: content[37].content_id, language_id: languageMap.en.language_id, value: "I am a {{answer}}.", answer_value: "student", sound_path: "/sounds/school/sentences/en/student.mp3" },
    { content_id: content[37].content_id, language_id: languageMap.fi.language_id, value: "Minä olen {{answer}}.", answer_value: "oppilas", sound_path: "/sounds/school/sentences/fi/oppilas.mp3" },
    { content_id: content[37].content_id, language_id: languageMap.uk.language_id, value: "Я {{answer}}.", answer_value: "учень", sound_path: "/sounds/school/sentences/uk/учень.mp3" },
    { content_id: content[37].content_id, language_id: languageMap.ru.language_id, value: "Я {{answer}}.", answer_value: "ученик", sound_path: "/sounds/school/sentences/ru/ученик.mp3" },

    // book
    { content_id: content[38].content_id, language_id: languageMap.en.language_id, value: "I read a {{answer}}.", answer_value: "book", sound_path: "/sounds/school/sentences/en/book.mp3" },
    { content_id: content[38].content_id, language_id: languageMap.fi.language_id, value: "Minä luen {{answer}}.", answer_value: "kirjaa", sound_path: "/sounds/school/sentences/fi/kirja.mp3" },
    { content_id: content[38].content_id, language_id: languageMap.uk.language_id, value: "Я читаю {{answer}}.", answer_value: "книгу", sound_path: "/sounds/school/sentences/uk/книга.mp3" },
    { content_id: content[38].content_id, language_id: languageMap.ru.language_id, value: "Я читаю {{answer}}.", answer_value: "книгу", sound_path: "/sounds/school/sentences/ru/книга.mp3" },

    // notebook
    { content_id: content[39].content_id, language_id: languageMap.en.language_id, value: "I write in my {{answer}}.", answer_value: "notebook", sound_path: "/sounds/school/sentences/en/notebook.mp3" },
    { content_id: content[39].content_id, language_id: languageMap.fi.language_id, value: "Minä kirjoitan {{answer}}.", answer_value: "vihkoon", sound_path: "/sounds/school/sentences/fi/vihko.mp3" },
    { content_id: content[39].content_id, language_id: languageMap.uk.language_id, value: "Я пишу у {{answer}}.", answer_value: "зошиті", sound_path: "/sounds/school/sentences/uk/зошит.mp3" },
    { content_id: content[39].content_id, language_id: languageMap.ru.language_id, value: "Я пишу в {{answer}}.", answer_value: "тетради", sound_path: "/sounds/school/sentences/ru/тетрадь.mp3" },

    // pen
    { content_id: content[40].content_id, language_id: languageMap.en.language_id, value: "I write with a {{answer}}.", answer_value: "pen", sound_path: "/sounds/school/sentences/en/pen.mp3" },
    { content_id: content[40].content_id, language_id: languageMap.fi.language_id, value: "Minä kirjoitan {{answer}}.", answer_value: "kynällä", sound_path: "/sounds/school/sentences/fi/kynä.mp3" },
    { content_id: content[40].content_id, language_id: languageMap.uk.language_id, value: "Я пишу {{answer}}.", answer_value: "ручкою", sound_path: "/sounds/school/sentences/uk/ручка.mp3" },
    { content_id: content[40].content_id, language_id: languageMap.ru.language_id, value: "Я пишу {{answer}}.", answer_value: "ручкой", sound_path: "/sounds/school/sentences/ru/ручка.mp3" },

    // pencil
    { content_id: content[41].content_id, language_id: languageMap.en.language_id, value: "I draw with a {{answer}}.", answer_value: "pencil", sound_path: "/sounds/school/sentences/en/pencil.mp3" },
    { content_id: content[41].content_id, language_id: languageMap.fi.language_id, value: "Minä piirrän {{answer}}.", answer_value: "lyijykynällä", sound_path: "/sounds/school/sentences/fi/lyijykynä.mp3" },
    { content_id: content[41].content_id, language_id: languageMap.uk.language_id, value: "Я малюю {{answer}}.", answer_value: "олівцем", sound_path: "/sounds/school/sentences/uk/олівець.mp3" },
    { content_id: content[41].content_id, language_id: languageMap.ru.language_id, value: "Я рисую {{answer}}.", answer_value: "карандашом", sound_path: "/sounds/school/sentences/ru/карандаш.mp3" },

    // desk
    { content_id: content[42].content_id, language_id: languageMap.en.language_id, value: "We sit at {{answer}}.", answer_value: "desks", sound_path: "/sounds/school/sentences/en/desk.mp3" },
    { content_id: content[42].content_id, language_id: languageMap.fi.language_id, value: "Me istumme {{answer}}.", answer_value: "pulpettien ääressä", sound_path: "/sounds/school/sentences/fi/pulpetti.mp3" },
    { content_id: content[42].content_id, language_id: languageMap.uk.language_id, value: "Ми сидимо за {{answer}}.", answer_value: "партами", sound_path: "/sounds/school/sentences/uk/парта.mp3" },
    { content_id: content[42].content_id, language_id: languageMap.ru.language_id, value: "Мы сидим за {{answer}}.", answer_value: "партами", sound_path: "/sounds/school/sentences/ru/парта.mp3" },

    // lesson
    { content_id: content[43].content_id, language_id: languageMap.en.language_id, value: "We have four {{answer}} every day.", answer_value: "lessons", sound_path: "/sounds/school/sentences/en/lesson.mp3" },
    { content_id: content[43].content_id, language_id: languageMap.fi.language_id, value: "Meillä on neljä {{answer}} joka päivä.", answer_value: "oppituntia", sound_path: "/sounds/school/sentences/fi/oppitunti.mp3" },
    { content_id: content[43].content_id, language_id: languageMap.uk.language_id, value: "У нас чотири {{answer}} щодня.", answer_value: "уроки", sound_path: "/sounds/school/sentences/uk/урок.mp3" },
    { content_id: content[43].content_id, language_id: languageMap.ru.language_id, value: "У нас четыре {{answer}} каждый день.", answer_value: "урока", sound_path: "/sounds/school/sentences/ru/урок.mp3" },

    // break
    { content_id: content[44].content_id, language_id: languageMap.en.language_id, value: "Students go outside on a {{answer}}.", answer_value: "break", sound_path: "/sounds/school/sentences/en/break.mp3" },
    { content_id: content[44].content_id, language_id: languageMap.fi.language_id, value: "Oppilaat menevät ulos {{answer}}.", answer_value: "välitunnilla", sound_path: "/sounds/school/sentences/fi/välitunti.mp3" },
    { content_id: content[44].content_id, language_id: languageMap.uk.language_id, value: "Учні виходять надвір на {{answer}}.", answer_value: "перерві", sound_path: "/sounds/school/sentences/uk/перерва.mp3" },
    { content_id: content[44].content_id, language_id: languageMap.ru.language_id, value: "Ученики выходят на улицу на {{answer}}.", answer_value: "перемене", sound_path: "/sounds/school/sentences/ru/перемена.mp3" },

    // SCHOOL (TEXT)

    // English
    {
      content_id: content[45].content_id,
      language_id: languageMap.en.language_id,
      value: "Hello! My name is Emma. I am a student. Every morning I go to school. Our classroom is big and bright. My teacher is very kind. I have a book, a notebook, a pen, and a pencil in my school bag. I read my book and write in my notebook with a pen. I draw with a pencil. We sit at our desks and learn many new things. We have four lessons every day. During the break, my friends and I go outside and play together. I like my school very much.",
      sound_path: "/sounds/school/text/en_school.mp3",
      title: "My school"
    },

    // Finnish
    {
      content_id: content[45].content_id,
      language_id: languageMap.fi.language_id,
      value: "Hei! Minun nimeni on Emma. Olen oppilas. Joka aamu menen kouluun. Meidän luokkahuone on suuri ja valoisa. Opettaja on erittäin ystävällinen. Minulla on koululaukussa kirja, vihko, kynä ja lyijykynä. Luen kirjaa ja kirjoitan vihkoon kynällä. Piirrän lyijykynällä. Istumme pulpeteissa ja opimme paljon uusia asioita. Meillä on neljä oppituntia joka päivä. Välitunnilla minä ja ystävä menemme ulos ja leikimme yhdessä. Pidän koulusta todella paljon.",
      sound_path: "/sounds/school/text/fi_school.mp3",
      title: "Minun kouluni"
    },

    // Ukrainian
    {
      content_id: content[45].content_id,
      language_id: languageMap.uk.language_id,
      value: "Привіт! Мене звати Емма. Я учениця. Щоранку я ходжу до школи. Наш клас великий і світлий. Моя вчителька дуже добра. У моєму шкільному рюкзаку є книга, зошит, ручка та олівець. Я читаю свою книгу і пишу в зошиті ручкою. Я малюю олівцем. Ми сидимо за партами і вивчаємо багато нового. У нас чотири уроки щодня. На перерві ми з друзями виходимо на вулицю і граємо разом. Мені дуже подобається моя школа.",
      sound_path: "/sounds/school/text/uk_school.mp3",
      title: "Моя школа"
    },

    // Russian
    {
      content_id: content[45].content_id,
      language_id: languageMap.ru.language_id,
      value: "Привет! Меня зовут Эмма. Я ученица. Каждое утро я хожу в школу. Наш класс большой и светлый. Моя учительница очень добрая. В моем школьном рюкзаке есть книга, тетрадь, ручка и карандаш. Я читаю свою книгу и пишу в тетради ручкой. Я рисую карандашом. Мы сидим за партами и узнаём много нового. У нас четыре урока каждый день. На перемене мы с друзьями выходим на улицу и играем вместе. Мне очень нравится моя школа.",
      sound_path: "/sounds/school/text/ru_school.mp3",
      title: "Моя школа"
    },

    // FOOD (WORDS)

    // food
    { content_id: content[46].content_id, language_id: languageMap.en.language_id, value: "food", sound_path: "/sounds/food/words/en/food.mp3" },
    { content_id: content[46].content_id, language_id: languageMap.fi.language_id, value: "ruoka", sound_path: "/sounds/food/words/fi/ruoka.mp3" },
    { content_id: content[46].content_id, language_id: languageMap.uk.language_id, value: "їжа", sound_path: "/sounds/food/words/uk/їжа.mp3" },
    { content_id: content[46].content_id, language_id: languageMap.ru.language_id, value: "еда", sound_path: "/sounds/food/words/ru/еда.mp3" },

    // breakfast
    { content_id: content[47].content_id, language_id: languageMap.en.language_id, value: "breakfast", sound_path: "/sounds/food/words/en/breakfast.mp3" },
    { content_id: content[47].content_id, language_id: languageMap.fi.language_id, value: "aamiainen", sound_path: "/sounds/food/words/fi/aamiainen.mp3" },
    { content_id: content[47].content_id, language_id: languageMap.uk.language_id, value: "сніданок", sound_path: "/sounds/food/words/uk/сніданок.mp3" },
    { content_id: content[47].content_id, language_id: languageMap.ru.language_id, value: "завтрак", sound_path: "/sounds/food/words/ru/завтрак.mp3" },

    // lunch
    { content_id: content[48].content_id, language_id: languageMap.en.language_id, value: "lunch", sound_path: "/sounds/food/words/en/lunch.mp3" },
    { content_id: content[48].content_id, language_id: languageMap.fi.language_id, value: "lounas", sound_path: "/sounds/food/words/fi/lounas.mp3" },
    { content_id: content[48].content_id, language_id: languageMap.uk.language_id, value: "обід", sound_path: "/sounds/food/words/uk/обід.mp3" },
    { content_id: content[48].content_id, language_id: languageMap.ru.language_id, value: "обед", sound_path: "/sounds/food/words/ru/обед.mp3" },

    // dinner
    { content_id: content[49].content_id, language_id: languageMap.en.language_id, value: "dinner", sound_path: "/sounds/food/words/en/dinner.mp3" },
    { content_id: content[49].content_id, language_id: languageMap.fi.language_id, value: "päivällinen", sound_path: "/sounds/food/words/fi/päivällinen.mp3" },
    { content_id: content[49].content_id, language_id: languageMap.uk.language_id, value: "вечеря", sound_path: "/sounds/food/words/uk/вечеря.mp3" },
    { content_id: content[49].content_id, language_id: languageMap.ru.language_id, value: "ужин", sound_path: "/sounds/food/words/ru/ужин.mp3" },

    // porridge
    { content_id: content[50].content_id, language_id: languageMap.en.language_id, value: "porridge", sound_path: "/sounds/food/words/en/porridge.mp3" },
    { content_id: content[50].content_id, language_id: languageMap.fi.language_id, value: "puuro", sound_path: "/sounds/food/words/fi/puuro.mp3" },
    { content_id: content[50].content_id, language_id: languageMap.uk.language_id, value: "каша", sound_path: "/sounds/food/words/uk/каша.mp3" },
    { content_id: content[50].content_id, language_id: languageMap.ru.language_id, value: "каша", sound_path: "/sounds/food/words/ru/каша.mp3" },

    // egg
    { content_id: content[51].content_id, language_id: languageMap.en.language_id, value: "egg", sound_path: "/sounds/food/words/en/egg.mp3" },
    { content_id: content[51].content_id, language_id: languageMap.fi.language_id, value: "kananmuna", sound_path: "/sounds/food/words/fi/kananmuna.mp3" },
    { content_id: content[51].content_id, language_id: languageMap.uk.language_id, value: "яйце", sound_path: "/sounds/food/words/uk/яйце.mp3" },
    { content_id: content[51].content_id, language_id: languageMap.ru.language_id, value: "яйцо", sound_path: "/sounds/food/words/ru/яйцо.mp3" },

    // milk
    { content_id: content[52].content_id, language_id: languageMap.en.language_id, value: "milk", sound_path: "/sounds/food/words/en/milk.mp3" },
    { content_id: content[52].content_id, language_id: languageMap.fi.language_id, value: "maito", sound_path: "/sounds/food/words/fi/maito.mp3" },
    { content_id: content[52].content_id, language_id: languageMap.uk.language_id, value: "молоко", sound_path: "/sounds/food/words/uk/молоко.mp3" },
    { content_id: content[52].content_id, language_id: languageMap.ru.language_id, value: "молоко", sound_path: "/sounds/food/words/ru/молоко.mp3" },

    // potato
    { content_id: content[53].content_id, language_id: languageMap.en.language_id, value: "potato", sound_path: "/sounds/food/words/en/potato.mp3" },
    { content_id: content[53].content_id, language_id: languageMap.fi.language_id, value: "peruna", sound_path: "/sounds/food/words/fi/peruna.mp3" },
    { content_id: content[53].content_id, language_id: languageMap.uk.language_id, value: "картопля", sound_path: "/sounds/food/words/uk/картопля.mp3" },
    { content_id: content[53].content_id, language_id: languageMap.ru.language_id, value: "картофель", sound_path: "/sounds/food/words/ru/картофель.mp3" },

    // meat
    { content_id: content[54].content_id, language_id: languageMap.en.language_id, value: "meat", sound_path: "/sounds/food/words/en/meat.mp3" },
    { content_id: content[54].content_id, language_id: languageMap.fi.language_id, value: "liha", sound_path: "/sounds/food/words/fi/liha.mp3" },
    { content_id: content[54].content_id, language_id: languageMap.uk.language_id, value: "м'ясо", sound_path: "/sounds/food/words/uk/м'ясо.mp3" },
    { content_id: content[54].content_id, language_id: languageMap.ru.language_id, value: "мясо", sound_path: "/sounds/food/words/ru/мясо.mp3" },

    // fish
    { content_id: content[55].content_id, language_id: languageMap.en.language_id, value: "fish", sound_path: "/sounds/food/words/en/fish.mp3" },
    { content_id: content[55].content_id, language_id: languageMap.fi.language_id, value: "kala", sound_path: "/sounds/food/words/fi/kala.mp3" },
    { content_id: content[55].content_id, language_id: languageMap.uk.language_id, value: "риба", sound_path: "/sounds/food/words/uk/риба.mp3" },
    { content_id: content[55].content_id, language_id: languageMap.ru.language_id, value: "рыба", sound_path: "/sounds/food/words/ru/рыба.mp3" },

    // rice
    { content_id: content[56].content_id, language_id: languageMap.en.language_id, value: "rice", sound_path: "/sounds/food/words/en/rice.mp3" },
    { content_id: content[56].content_id, language_id: languageMap.fi.language_id, value: "riisi", sound_path: "/sounds/food/words/fi/riisi.mp3" },
    { content_id: content[56].content_id, language_id: languageMap.uk.language_id, value: "рис", sound_path: "/sounds/food/words/uk/рис.mp3" },
    { content_id: content[56].content_id, language_id: languageMap.ru.language_id, value: "рис", sound_path: "/sounds/food/words/ru/рис.mp3" },

    // bread
    { content_id: content[57].content_id, language_id: languageMap.en.language_id, value: "bread", sound_path: "/sounds/food/words/en/bread.mp3" },
    { content_id: content[57].content_id, language_id: languageMap.fi.language_id, value: "leipä", sound_path: "/sounds/food/words/fi/leipä.mp3" },
    { content_id: content[57].content_id, language_id: languageMap.uk.language_id, value: "хліб", sound_path: "/sounds/food/words/uk/хліб.mp3" },
    { content_id: content[57].content_id, language_id: languageMap.ru.language_id, value: "хлеб", sound_path: "/sounds/food/words/ru/хлеб.mp3" },

    // butter
    { content_id: content[58].content_id, language_id: languageMap.en.language_id, value: "butter", sound_path: "/sounds/food/words/en/butter.mp3" },
    { content_id: content[58].content_id, language_id: languageMap.fi.language_id, value: "voi", sound_path: "/sounds/food/words/fi/voi.mp3" },
    { content_id: content[58].content_id, language_id: languageMap.uk.language_id, value: "масло", sound_path: "/sounds/food/words/uk/масло.mp3" },
    { content_id: content[58].content_id, language_id: languageMap.ru.language_id, value: "масло", sound_path: "/sounds/food/words/ru/масло.mp3" },

    // cheese
    { content_id: content[59].content_id, language_id: languageMap.en.language_id, value: "cheese", sound_path: "/sounds/food/words/en/cheese.mp3" },
    { content_id: content[59].content_id, language_id: languageMap.fi.language_id, value: "juusto", sound_path: "/sounds/food/words/fi/juusto.mp3" },
    { content_id: content[59].content_id, language_id: languageMap.uk.language_id, value: "сир", sound_path: "/sounds/food/words/uk/сир.mp3" },
    { content_id: content[59].content_id, language_id: languageMap.ru.language_id, value: "сыр", sound_path: "/sounds/food/words/ru/сыр.mp3" },

    // apple
    { content_id: content[60].content_id, language_id: languageMap.en.language_id, value: "apple", sound_path: "/sounds/food/words/en/apple.mp3" },
    { content_id: content[60].content_id, language_id: languageMap.fi.language_id, value: "omena", sound_path: "/sounds/food/words/fi/omena.mp3" },
    { content_id: content[60].content_id, language_id: languageMap.uk.language_id, value: "яблуко", sound_path: "/sounds/food/words/uk/яблуко.mp3" },
    { content_id: content[60].content_id, language_id: languageMap.ru.language_id, value: "яблоко", sound_path: "/sounds/food/words/ru/яблоко.mp3" },

    // banana
    { content_id: content[61].content_id, language_id: languageMap.en.language_id, value: "banana", sound_path: "/sounds/food/words/en/banana.mp3" },
    { content_id: content[61].content_id, language_id: languageMap.fi.language_id, value: "banaani", sound_path: "/sounds/food/words/fi/banaani.mp3" },
    { content_id: content[61].content_id, language_id: languageMap.uk.language_id, value: "банан", sound_path: "/sounds/food/words/uk/банан.mp3" },
    { content_id: content[61].content_id, language_id: languageMap.ru.language_id, value: "банан", sound_path: "/sounds/food/words/ru/банан.mp3" },

    // FOOD (SENTENCES)

    // food
    { content_id: content[62].content_id, language_id: languageMap.en.language_id, value: "I like healthy {{answer}}.", answer_value: "food", sound_path: "/sounds/food/sentences/en/food.mp3" },
    { content_id: content[62].content_id, language_id: languageMap.fi.language_id, value: "Pidän terveellisestä {{answer}}.", answer_value: "ruoasta", sound_path: "/sounds/food/sentences/fi/ruoka.mp3" },
    { content_id: content[62].content_id, language_id: languageMap.uk.language_id, value: "Я люблю здорову {{answer}}.", answer_value: "їжу", sound_path: "/sounds/food/sentences/uk/їжа.mp3" },
    { content_id: content[62].content_id, language_id: languageMap.ru.language_id, value: "Я люблю здоровую {{answer}}.", answer_value: "еду", sound_path: "/sounds/food/sentences/ru/еда.mp3" },

    // breakfast
    { content_id: content[63].content_id, language_id: languageMap.en.language_id, value: "I eat {{answer}} with my family.", answer_value: "breakfast", sound_path: "/sounds/food/sentences/en/breakfast.mp3" },
    { content_id: content[63].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} minun perheen kanssa.", answer_value: "aamiaisen", sound_path: "/sounds/food/sentences/fi/aamiainen.mp3" },
    { content_id: content[63].content_id, language_id: languageMap.uk.language_id, value: "Я снідаю зі своєю {{answer}}.", answer_value: "сім'єю", sound_path: "/sounds/food/sentences/uk/сніданок.mp3" },
    { content_id: content[63].content_id, language_id: languageMap.ru.language_id, value: "Я завтракаю со своей {{answer}}.", answer_value: "семьёй", sound_path: "/sounds/food/sentences/ru/завтрак.mp3" },

    // lunch
    { content_id: content[64].content_id, language_id: languageMap.en.language_id, value: "I have {{answer}} at school.", answer_value: "lunch", sound_path: "/sounds/food/sentences/en/lunch.mp3" },
    { content_id: content[64].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} koulussa.", answer_value: "lounaan", sound_path: "/sounds/food/sentences/fi/lounas.mp3" },
    { content_id: content[64].content_id, language_id: languageMap.uk.language_id, value: "Я обідаю в {{answer}}.", answer_value: "школі", sound_path: "/sounds/food/sentences/uk/обід.mp3" },
    { content_id: content[64].content_id, language_id: languageMap.ru.language_id, value: "Я обедаю в {{answer}}.", answer_value: "школе", sound_path: "/sounds/food/sentences/ru/обед.mp3" },

    // dinner
    { content_id: content[65].content_id, language_id: languageMap.en.language_id, value: "My family eats {{answer}} together.", answer_value: "dinner", sound_path: "/sounds/food/sentences/en/dinner.mp3" },
    { content_id: content[65].content_id, language_id: languageMap.fi.language_id, value: "Minun perhe syö {{answer}} yhdessä.", answer_value: "päivällisen", sound_path: "/sounds/food/sentences/fi/päivällinen.mp3" },
    { content_id: content[65].content_id, language_id: languageMap.uk.language_id, value: "Моя сім'я вечеряє {{answer}}.", answer_value: "разом", sound_path: "/sounds/food/sentences/uk/вечеря.mp3" },
    { content_id: content[65].content_id, language_id: languageMap.ru.language_id, value: "Моя семья ужинает {{answer}}.", answer_value: "вместе", sound_path: "/sounds/food/sentences/ru/ужин.mp3" },

    // porridge
    { content_id: content[66].content_id, language_id: languageMap.en.language_id, value: "I eat {{answer}} for breakfast.", answer_value: "porridge", sound_path: "/sounds/food/sentences/en/porridge.mp3" },
    { content_id: content[66].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} aamiaiseksi.", answer_value: "puuroa", sound_path: "/sounds/food/sentences/fi/puuro.mp3" },
    { content_id: content[66].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} на сніданок.", answer_value: "кашу", sound_path: "/sounds/food/sentences/uk/каша.mp3" },
    { content_id: content[66].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} на завтрак.", answer_value: "кашу", sound_path: "/sounds/food/sentences/ru/каша.mp3" },

    // egg
    { content_id: content[67].content_id, language_id: languageMap.en.language_id, value: "I eat an {{answer}} for breakfast.", answer_value: "egg", sound_path: "/sounds/food/sentences/en/egg.mp3" },
    { content_id: content[67].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} aamiaiseksi.", answer_value: "kananmunan", sound_path: "/sounds/food/sentences/fi/kananmuna.mp3" },
    { content_id: content[67].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} на сніданок.", answer_value: "яйце", sound_path: "/sounds/food/sentences/uk/яйце.mp3" },
    { content_id: content[67].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} на завтрак.", answer_value: "яйцо", sound_path: "/sounds/food/sentences/ru/яйцо.mp3" },

    // milk
    { content_id: content[68].content_id, language_id: languageMap.en.language_id, value: "I drink {{answer}} every morning.", answer_value: "milk", sound_path: "/sounds/food/sentences/en/milk.mp3" },
    { content_id: content[68].content_id, language_id: languageMap.fi.language_id, value: "Juon {{answer}} joka aamu.", answer_value: "maitoa", sound_path: "/sounds/food/sentences/fi/maito.mp3" },
    { content_id: content[68].content_id, language_id: languageMap.uk.language_id, value: "Я п'ю {{answer}} щоранку.", answer_value: "молоко", sound_path: "/sounds/food/sentences/uk/молоко.mp3" },
    { content_id: content[68].content_id, language_id: languageMap.ru.language_id, value: "Я пью {{answer}} каждое утро.", answer_value: "молоко", sound_path: "/sounds/food/sentences/ru/молоко.mp3" },

    // potato
    { content_id: content[69].content_id, language_id: languageMap.en.language_id, value: "I eat {{answer}} for lunch.", answer_value: "potatoes", sound_path: "/sounds/food/sentences/en/potato.mp3" },
    { content_id: content[69].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} lounaaksi.", answer_value: "perunoita", sound_path: "/sounds/food/sentences/fi/peruna.mp3" },
    { content_id: content[69].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} на обід.", answer_value: "картоплю", sound_path: "/sounds/food/sentences/uk/картопля.mp3" },
    { content_id: content[69].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} на обед.", answer_value: "картофель", sound_path: "/sounds/food/sentences/ru/картофель.mp3" },

    // meat
    { content_id: content[70].content_id, language_id: languageMap.en.language_id, value: "My father likes {{answer}}.", answer_value: "meat", sound_path: "/sounds/food/sentences/en/meat.mp3" },
    { content_id: content[70].content_id, language_id: languageMap.fi.language_id, value: "Minun isä pitää {{answer}}.", answer_value: "lihasta", sound_path: "/sounds/food/sentences/fi/liha.mp3" },
    { content_id: content[70].content_id, language_id: languageMap.uk.language_id, value: "Мій тато любить {{answer}}.", answer_value: "м'ясо", sound_path: "/sounds/food/sentences/uk/м'ясо.mp3" },
    { content_id: content[70].content_id, language_id: languageMap.ru.language_id, value: "Мой папа любит {{answer}}.", answer_value: "мясо", sound_path: "/sounds/food/sentences/ru/мясо.mp3" },

    // fish
    { content_id: content[71].content_id, language_id: languageMap.en.language_id, value: "My mother likes {{answer}}.", answer_value: "fish", sound_path: "/sounds/food/sentences/en/fish.mp3" },
    { content_id: content[71].content_id, language_id: languageMap.fi.language_id, value: "Minun äiti pitää {{answer}}.", answer_value: "kalasta", sound_path: "/sounds/food/sentences/fi/kala.mp3" },
    { content_id: content[71].content_id, language_id: languageMap.uk.language_id, value: "Моя мама любить {{answer}}.", answer_value: "рибу", sound_path: "/sounds/food/sentences/uk/риба.mp3" },
    { content_id: content[71].content_id, language_id: languageMap.ru.language_id, value: "Моя мама любит {{answer}}.", answer_value: "рыбу", sound_path: "/sounds/food/sentences/ru/рыба.mp3" },

    // rice
    { content_id: content[72].content_id, language_id: languageMap.en.language_id, value: "I eat {{answer}} with fish.", answer_value: "rice", sound_path: "/sounds/food/sentences/en/rice.mp3" },
    { content_id: content[72].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} kalan kanssa.", answer_value: "riisiä", sound_path: "/sounds/food/sentences/fi/riisi.mp3" },
    { content_id: content[72].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} з рибою.", answer_value: "рис", sound_path: "/sounds/food/sentences/uk/рис.mp3" },
    { content_id: content[72].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} с рыбой.", answer_value: "рис", sound_path: "/sounds/food/sentences/ru/рис.mp3" },

    // bread
    { content_id: content[73].content_id, language_id: languageMap.en.language_id, value: "We eat {{answer}} every day.", answer_value: "bread", sound_path: "/sounds/food/sentences/en/bread.mp3" },
    { content_id: content[73].content_id, language_id: languageMap.fi.language_id, value: "Me syömme {{answer}} joka päivä.", answer_value: "leipää", sound_path: "/sounds/food/sentences/fi/leipä.mp3" },
    { content_id: content[73].content_id, language_id: languageMap.uk.language_id, value: "Ми їмо {{answer}} щодня.", answer_value: "хліб", sound_path: "/sounds/food/sentences/uk/хліб.mp3" },
    { content_id: content[73].content_id, language_id: languageMap.ru.language_id, value: "Мы едим {{answer}} каждый день.", answer_value: "хлеб", sound_path: "/sounds/food/sentences/ru/хлеб.mp3" },

    // butter
    { content_id: content[74].content_id, language_id: languageMap.en.language_id, value: "I eat bread with {{answer}}.", answer_value: "butter", sound_path: "/sounds/food/sentences/en/butter.mp3" },
    { content_id: content[74].content_id, language_id: languageMap.fi.language_id, value: "Syön leipää {{answer}} kanssa.", answer_value: "voin", sound_path: "/sounds/food/sentences/fi/voi.mp3" },
    { content_id: content[74].content_id, language_id: languageMap.uk.language_id, value: "Я їм хліб із {{answer}}.", answer_value: "маслом", sound_path: "/sounds/food/sentences/uk/масло.mp3" },
    { content_id: content[74].content_id, language_id: languageMap.ru.language_id, value: "Я ем хлеб с {{answer}}.", answer_value: "маслом", sound_path: "/sounds/food/sentences/ru/масло.mp3" },

    // cheese
    { content_id: content[75].content_id, language_id: languageMap.en.language_id, value: "My sister likes {{answer}}.", answer_value: "cheese", sound_path: "/sounds/food/sentences/en/cheese.mp3" },
    { content_id: content[75].content_id, language_id: languageMap.fi.language_id, value: "Minun sisko pitää {{answer}}.", answer_value: "juustosta", sound_path: "/sounds/food/sentences/fi/juusto.mp3" },
    { content_id: content[75].content_id, language_id: languageMap.uk.language_id, value: "Моя сестра любить {{answer}}.", answer_value: "сир", sound_path: "/sounds/food/sentences/uk/сир.mp3" },
    { content_id: content[75].content_id, language_id: languageMap.ru.language_id, value: "Моя сестра любит {{answer}}.", answer_value: "сыр", sound_path: "/sounds/food/sentences/ru/сыр.mp3" },

    // apple
    { content_id: content[76].content_id, language_id: languageMap.en.language_id, value: "My brother eats an {{answer}}.", answer_value: "apple", sound_path: "/sounds/food/sentences/en/apple.mp3" },
    { content_id: content[76].content_id, language_id: languageMap.fi.language_id, value: "Minun veli syö {{answer}}.", answer_value: "omenan", sound_path: "/sounds/food/sentences/fi/omena.mp3" },
    { content_id: content[76].content_id, language_id: languageMap.uk.language_id, value: "Мій брат їсть {{answer}}.", answer_value: "яблуко", sound_path: "/sounds/food/sentences/uk/яблуко.mp3" },
    { content_id: content[76].content_id, language_id: languageMap.ru.language_id, value: "Мой брат ест {{answer}}.", answer_value: "яблоко", sound_path: "/sounds/food/sentences/ru/яблоко.mp3" },

    // banana
    { content_id: content[77].content_id, language_id: languageMap.en.language_id, value: "I eat a {{answer}} after lunch.", answer_value: "banana", sound_path: "/sounds/food/sentences/en/banana.mp3" },
    { content_id: content[77].content_id, language_id: languageMap.fi.language_id, value: "Syön {{answer}} lounaan jälkeen.", answer_value: "banaanin", sound_path: "/sounds/food/sentences/fi/banaani.mp3" },
    { content_id: content[77].content_id, language_id: languageMap.uk.language_id, value: "Я їм {{answer}} після обіду.", answer_value: "банан", sound_path: "/sounds/food/sentences/uk/банан.mp3" },
    { content_id: content[77].content_id, language_id: languageMap.ru.language_id, value: "Я ем {{answer}} после обеда.", answer_value: "банан", sound_path: "/sounds/food/sentences/ru/банан.mp3" },

    // FOOD (TEXT)

    // English
    {
      content_id: content[78].content_id,
      language_id: languageMap.en.language_id,
      value: "Hello! My name is Emma. Every day I eat healthy food. In the morning I have breakfast. I eat porridge or an egg and drink milk. For lunch I eat potatoes with meat. For dessert I eat an apple or a banana. For dinner I eat fish with rice. Before bed I eat bread with butter and cheese and drink a glass of milk. I like healthy food.",
      sound_path: "/sounds/food/text/en_food.mp3",
      title: "Food"
    },

    // Finnish
    {
      content_id: content[78].content_id,
      language_id: languageMap.fi.language_id,
      value: "Hei! Minun nimi on Emma. Syön terveellistä ruokaa joka päivä. Aamulla syön aamiaisen. Syön puuroa tai kananmunan ja juon maitoa. Lounaaksi syön perunoita ja lihaa. Jälkiruoaksi syön omenan tai banaanin. Päivälliseksi syön kalaa ja riisiä. Ennen nukkumaanmenoa syön leipää voin ja juuston kanssa ja juon lasillisen maitoa. Pidän terveellisestä ruoasta.",
      sound_path: "/sounds/food/text/fi_food.mp3",
      title: "Ruoka"
    },

    // Ukrainian
    {
      content_id: content[78].content_id,
      language_id: languageMap.uk.language_id,
      value: "Привіт! Мене звати Емма. Щодня я їм здорову їжу. Вранці я снідаю. Я їм кашу або яйце і п’ю молоко. На обід я їм картоплю з м’ясом. На десерт я їм яблуко або банан. На вечерю я їм рибу з рисом. Перед сном я їм хліб із маслом і сиром та п’ю склянку молока. Я люблю здорову їжу.",
      sound_path: "/sounds/food/text/uk_food.mp3",
      title: "їжа"
    },

    // Russian
    {
      content_id: content[78].content_id,
      language_id: languageMap.ru.language_id,
      value: "Привет! Меня зовут Эмма. Каждый день я ем здоровую пищу. Утром я завтракаю. Я ем кашу или яйцо и пью молоко. На обед я ем картофель с мясом. На десерт я ем яблоко или банан. На ужин я ем рыбу с рисом. Перед сном я ем хлеб с маслом и сыром и пью стакан молока. Я люблю здоровую пищу.",
      sound_path: "/sounds/food/text/ru_food.mp3",
      title: "Еда"
    },
  ]).returning('*');
  // 12. PROGRESS
  const progress = await knex('progress').insert([
    { user_language_id: users_languages[0].user_language_id, category_id: categories[0].category_id, exercise_id: exercises[0].exercise_id, score: 5 },
    { user_language_id: users_languages[0].user_language_id, category_id: categories[0].category_id, exercise_id: exercises[1].exercise_id, score: 5 },
    { user_language_id: users_languages[0].user_language_id, category_id: categories[0].category_id, exercise_id: exercises[2].exercise_id, score: 5 },
    { user_language_id: users_languages[0].user_language_id, category_id: categories[0].category_id, exercise_id: exercises[3].exercise_id, score: 5 },
    { user_language_id: users_languages[0].user_language_id, category_id: categories[0].category_id, exercise_id: exercises[4].exercise_id, score: 5 },
    { user_language_id: users_languages[0].user_language_id, category_id: categories[0].category_id, exercise_id: exercises[5].exercise_id, score: 5 },
    { user_language_id: users_languages[0].user_language_id, category_id: categories[0].category_id, exercise_id: exercises[6].exercise_id, score: 5 }
  ]).returning('*');
};