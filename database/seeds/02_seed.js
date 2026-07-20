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
  { exercise_id: exercises[0].exercise_id, language_id: 1, name: "Words", description: "Read and listen to the words" },
  { exercise_id: exercises[0].exercise_id, language_id: 2, name: "Sanat", description: "Lue ja kuuntele sanat" },
  { exercise_id: exercises[0].exercise_id, language_id: 3, name: "Слова", description: "Прочитайте та прослухайте слова" },
  { exercise_id: exercises[0].exercise_id, language_id: 4, name: "Слова", description: "Прочитайте и прослушайте слова" },

  // Word Cards
  { exercise_id: exercises[1].exercise_id, language_id: 1, name: "Word Cards", description: "Read and listen to a word" },
  { exercise_id: exercises[1].exercise_id, language_id: 2, name: "Sanakortit", description: "Lue ja kuuntele sana" },
  { exercise_id: exercises[1].exercise_id, language_id: 3, name: "Картки зі словами", description: "Прочитайте та прослухайте слово" },
  { exercise_id: exercises[1].exercise_id, language_id: 4, name: "Карточки слов", description: "Прочитайте и прослушайте слово" },

  // Sentences
  { exercise_id: exercises[2].exercise_id, language_id: 1, name: "Sentences", description: "Read and listen to the sentences" },
  { exercise_id: exercises[2].exercise_id, language_id: 2, name: "Lauseet", description: "Lue ja kuuntele lauseet" },
  { exercise_id: exercises[2].exercise_id, language_id: 3, name: "Речення", description: "Прочитайте та прослухайте речення" },
  { exercise_id: exercises[2].exercise_id, language_id: 4, name: "Предложения", description: "Прочитайте и прослушайте предложения" },

  // Text
  { exercise_id: exercises[3].exercise_id, language_id: 1, name: "Text", description: "Read and listen to the text" },
  { exercise_id: exercises[3].exercise_id, language_id: 2, name: "Teksti", description: "Lue ja kuuntele teksti" },
  { exercise_id: exercises[3].exercise_id, language_id: 3, name: "Текст", description: "Прочитайте та прослухайте текст" },
  { exercise_id: exercises[3].exercise_id, language_id: 4, name: "Текст", description: "Прочитайте и прослушайте текст" },

  // Memo Game
  { exercise_id: exercises[4].exercise_id, language_id: 1, name: "Memory Game", description: "Find matching pairs" },
  { exercise_id: exercises[4].exercise_id, language_id: 2, name: "Muistipeli", description: "Löydä kuvaparit" },
  { exercise_id: exercises[4].exercise_id, language_id: 3, name: "Гра на пам'ять", description: "Знайдіть однакові пари" },
  { exercise_id: exercises[4].exercise_id, language_id: 4, name: "Игра на память", description: "Найдите одинаковые пары" },

  // Match Game
  { exercise_id: exercises[5].exercise_id, language_id: 1, name: "Match Game", description: "Match words with pictures" },
  { exercise_id: exercises[5].exercise_id, language_id: 2, name: "Yhdistämispeli", description: "Yhdistä sanat kuviin" },
  { exercise_id: exercises[5].exercise_id, language_id: 3, name: "Гра на відповідність", description: "Поєднайте слова із зображеннями" },
  { exercise_id: exercises[5].exercise_id, language_id: 4, name: "Игра на соответствие", description: "Соедините слова с картинками" },

  // Fill the Gaps
  { exercise_id: exercises[6].exercise_id, language_id: 1, name: "Fill the Gaps", description: "Fill the missing words in the sentences" },
  { exercise_id: exercises[6].exercise_id, language_id: 2, name: "Täydennä aukot", description: "Täydennä puuttuvat sanat lauseisiin" },
  { exercise_id: exercises[6].exercise_id, language_id: 3, name: "Заповніть пропуски", description: "Заповніть пропущені слова в реченнях" },
  { exercise_id: exercises[6].exercise_id, language_id: 4, name: "Заполните пропуски", description: "Заполните пропущенные слова в предложениях" },
]);

  // 10. CONTENT
  const content = await knex('content').insert([
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
    { type: "word", image_path: "/images/family/uncle.png", category_id: categories[0].category_id, },
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
    { type: "sentence", image_path: "/images/family/uncle.png", category_id: categories[0].category_id, },
    { type: "text", image_path: "/images/texts/family_image.png", category_id: categories[0].category_id, },
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
    { type: "word", image_path: "/images/school/break.png", category_id: categories[1].category_id, },
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
    { type: "sentence", image_path: "/images/school/break.png", category_id: categories[1].category_id, },
    { type: "text", image_path: "/images/texts/school_image.png", category_id: categories[1].category_id, },
    
  ]).returning('*');
  // 11. CONTENT TRANSLATIONS
  const content_translations = await knex('content_translations').insert([
    // FAMILY (WORDS)

    // family
    { content_id: content[0].content_id, language_id: languages[0].language_id, value: "family", sound_path: "/sounds/family/words/en/family.mp3" },
    { content_id: content[0].content_id, language_id: languages[1].language_id, value: "perhe", sound_path: "/sounds/family/words/fi/perhe.mp3" },
    { content_id: content[0].content_id, language_id: languages[2].language_id, value: "сім'я", sound_path: "/sounds/family/words/uk/сім'я.mp3" },
    { content_id: content[0].content_id, language_id: languages[3].language_id, value: "семья", sound_path: "/sounds/family/words/ru/семья.mp3" },
    // mother
    { content_id: content[1].content_id, language_id: languages[0].language_id, value: "mother", sound_path: "/sounds/family/words/en/mother.mp3" },
    { content_id: content[1].content_id, language_id: languages[1].language_id, value: "äiti", sound_path: "/sounds/family/words/fi/äiti.mp3" },
    { content_id: content[1].content_id, language_id: languages[2].language_id, value: "мама", sound_path: "/sounds/family/words/uk/мама.mp3" },
    { content_id: content[1].content_id, language_id: languages[3].language_id, value: "мама", sound_path: "/sounds/family/words/ru/мама.mp3" },
    // father
    { content_id: content[2].content_id, language_id: languages[0].language_id, value: "father", sound_path: "/sounds/family/words/en/father.mp3" },
    { content_id: content[2].content_id, language_id: languages[1].language_id, value: "isä", sound_path: "/sounds/family/words/fi/isä.mp3" },
    { content_id: content[2].content_id, language_id: languages[2].language_id, value: "тато", sound_path: "/sounds/family/words/uk/тато.mp3" },
    { content_id: content[2].content_id, language_id: languages[3].language_id, value: "папа", sound_path: "/sounds/family/words/ru/папа.mp3" },
    // son
    { content_id: content[3].content_id, language_id: languages[0].language_id, value: "son", sound_path: "/sounds/family/words/en/son.mp3" },
    { content_id: content[3].content_id, language_id: languages[1].language_id, value: "poika", sound_path: "/sounds/family/words/fi/poika.mp3" },
    { content_id: content[3].content_id, language_id: languages[2].language_id, value: "син", sound_path: "/sounds/family/words/uk/син.mp3" },
    { content_id: content[3].content_id, language_id: languages[3].language_id, value: "сын", sound_path: "/sounds/family/words/ru/сын.mp3" },
    // daughter
    { content_id: content[4].content_id, language_id: languages[0].language_id, value: "daughter", sound_path: "/sounds/family/words/en/daughter.mp3" },
    { content_id: content[4].content_id, language_id: languages[1].language_id, value: "tytär", sound_path: "/sounds/family/words/fi/tytär.mp3" },
    { content_id: content[4].content_id, language_id: languages[2].language_id, value: "донька", sound_path: "/sounds/family/words/uk/донька.mp3" },
    { content_id: content[4].content_id, language_id: languages[3].language_id, value: "дочь", sound_path: "/sounds/family/words/ru/дочь.mp3" },
    // sister
    { content_id: content[5].content_id, language_id: languages[0].language_id, value: "sister", sound_path: "/sounds/family/words/en/sister.mp3" },
    { content_id: content[5].content_id, language_id: languages[1].language_id, value: "sisko", sound_path: "/sounds/family/words/fi/sisko.mp3" },
    { content_id: content[5].content_id, language_id: languages[2].language_id, value: "сестра", sound_path: "/sounds/family/words/uk/сестра.mp3" },
    { content_id: content[5].content_id, language_id: languages[3].language_id, value: "сестра", sound_path: "/sounds/family/words/ru/сестра.mp3" },
    // brother
    { content_id: content[6].content_id, language_id: languages[0].language_id, value: "brother", sound_path: "/sounds/family/words/en/brother.mp3" },
    { content_id: content[6].content_id, language_id: languages[1].language_id, value: "veli", sound_path: "/sounds/family/words/fi/veli.mp3" },
    { content_id: content[6].content_id, language_id: languages[2].language_id, value: "брат", sound_path: "/sounds/family/words/uk/брат.mp3" },
    { content_id: content[6].content_id, language_id: languages[3].language_id, value: "брат", sound_path: "/sounds/family/words/ru/брат.mp3" },
    // grandmother
    { content_id: content[7].content_id, language_id: languages[0].language_id, value: "grandmother", sound_path: "/sounds/family/words/en/grandmother.mp3" },
    { content_id: content[7].content_id, language_id: languages[1].language_id, value: "isoäiti", sound_path: "/sounds/family/words/fi/isoäiti.mp3" },
    { content_id: content[7].content_id, language_id: languages[2].language_id, value: "бабуся", sound_path: "/sounds/family/words/uk/бабуся.mp3" },
    { content_id: content[7].content_id, language_id: languages[3].language_id, value: "бабушка", sound_path: "/sounds/family/words/ru/бабушка.mp3" },
    // grandfather
    { content_id: content[8].content_id, language_id: languages[0].language_id, value: "grandfather", sound_path: "/sounds/family/words/en/grandfather.mp3" },
    { content_id: content[8].content_id, language_id: languages[1].language_id, value: "isoisä", sound_path: "/sounds/family/words/fi/isoisä.mp3" },
    { content_id: content[8].content_id, language_id: languages[2].language_id, value: "дідусь", sound_path: "/sounds/family/words/uk/дідусь.mp3" },
    { content_id: content[8].content_id, language_id: languages[3].language_id, value: "дедушка", sound_path: "/sounds/family/words/ru/дедушка.mp3" },
    // aunt
    { content_id: content[9].content_id, language_id: languages[0].language_id, value: "aunt", sound_path: "/sounds/family/words/en/aunt.mp3" },
    { content_id: content[9].content_id, language_id: languages[1].language_id, value: "täti", sound_path: "/sounds/family/words/fi/täti.mp3" },
    { content_id: content[9].content_id, language_id: languages[2].language_id, value: "тітка", sound_path: "/sounds/family/words/uk/тітка.mp3" },
    { content_id: content[9].content_id, language_id: languages[3].language_id, value: "тётя", sound_path: "/sounds/family/words/ru/тётя.mp3" },
    // uncle
    { content_id: content[10].content_id, language_id: languages[0].language_id, value: "uncle", sound_path: "/sounds/family/words/en/uncle.mp3" },
    { content_id: content[10].content_id, language_id: languages[1].language_id, value: "eno / setä", sound_path: "/sounds/family/words/fi/eno_setä.mp3" },
    { content_id: content[10].content_id, language_id: languages[2].language_id, value: "дядько", sound_path: "/sounds/family/words/uk/дядько.mp3" },
    { content_id: content[10].content_id, language_id: languages[3].language_id, value: "дядя", sound_path: "/sounds/family/words/ru/дядя.mp3" },
    
    // FAMILY (SENTENCES)

    // family
    { content_id: content[11].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}.", answer_value: "family", sound_path: "/sounds/family/sentences/en/family.mp3" },
    { content_id: content[11].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}.", answer_value: "perhe", sound_path: "/sounds/family/sentences/fi/perhe.mp3" },
    { content_id: content[11].content_id, language_id: languages[2].language_id, value: "Це моя {{answer}}.", answer_value: "сім'я", sound_path: "/sounds/family/sentences/uk/сім'я.mp3" },
    { content_id: content[11].content_id, language_id: languages[3].language_id, value: "Это моя {{answer}}.", answer_value: "семья", sound_path: "/sounds/family/sentences/ru/семья.mp3" },

    // mother
    { content_id: content[12].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. Her name is Jane.", answer_value: "mother", sound_path: "/sounds/family/sentences/en/mother.mp3" },
    { content_id: content[12].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Jane.", answer_value: "äiti", sound_path: "/sounds/family/sentences/fi/äiti.mp3" },
    { content_id: content[12].content_id, language_id: languages[2].language_id, value: "Це моя {{answer}}. Її звуть Джейн.", answer_value: "мама", sound_path: "/sounds/family/sentences/uk/мама.mp3" },
    { content_id: content[12].content_id, language_id: languages[3].language_id, value: "Это моя {{answer}}. Ее зовут Джейн.", answer_value: "мама", sound_path: "/sounds/family/sentences/ru/мама.mp3" },

    // father
    { content_id: content[13].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. His name is John.", answer_value: "father", sound_path: "/sounds/family/sentences/en/father.mp3" },
    { content_id: content[13].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on John.", answer_value: "isä", sound_path: "/sounds/family/sentences/fi/isä.mp3" },
    { content_id: content[13].content_id, language_id: languages[2].language_id, value: "Це мій {{answer}}. Його звати Джон.", answer_value: "тато", sound_path: "/sounds/family/sentences/uk/тато.mp3" },
    { content_id: content[13].content_id, language_id: languages[3].language_id, value: "Это мой {{answer}}. Его зовут Джон.", answer_value: "папа", sound_path: "/sounds/family/sentences/ru/папа.mp3" },

    // son
    { content_id: content[14].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. His name is Mikael.", answer_value: "son", sound_path: "/sounds/family/sentences/en/son.mp3" },
    { content_id: content[14].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Mikael.", answer_value: "poika", sound_path: "/sounds/family/sentences/fi/poika.mp3" },
    { content_id: content[14].content_id, language_id: languages[2].language_id, value: "Це мій {{answer}}. Його звуть Мікаель.", answer_value: "син", sound_path: "/sounds/family/sentences/uk/син.mp3" },
    { content_id: content[14].content_id, language_id: languages[3].language_id, value: "Это мой {{answer}}. Его зовут Микаэль.", answer_value: "сын", sound_path: "/sounds/family/sentences/ru/сын.mp3" },

    // daughter
    { content_id: content[15].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. Her name is Penny.", answer_value: "daughter", sound_path: "/sounds/family/sentences/en/daughter.mp3" },
    { content_id: content[15].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Penny.", answer_value: "tytär", sound_path: "/sounds/family/sentences/fi/tytär.mp3" },
    { content_id: content[15].content_id, language_id: languages[2].language_id, value: "Це моя {{answer}}. Її звати Пенні.", answer_value: "донька", sound_path: "/sounds/family/sentences/uk/донька.mp3" },
    { content_id: content[15].content_id, language_id: languages[3].language_id, value: "Это моя {{answer}}. Ее зовут Пенни.", answer_value: "дочь", sound_path: "/sounds/family/sentences/ru/дочь.mp3" },

    // sister
    { content_id: content[16].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. Her name is Johanna.", answer_value: "sister", sound_path: "/sounds/family/sentences/en/sister.mp3" },
    { content_id: content[16].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Johanna.", answer_value: "sisko", sound_path: "/sounds/family/sentences/fi/sisko.mp3" },
    { content_id: content[16].content_id, language_id: languages[2].language_id, value: "Це моя {{answer}}. Її звати Йоганна.", answer_value: "сестра", sound_path: "/sounds/family/sentences/uk/сестра.mp3" },
    { content_id: content[16].content_id, language_id: languages[3].language_id, value: "Это моя {{answer}}. Её зовут Йоханна.", answer_value: "сестра", sound_path: "/sounds/family/sentences/ru/сестра.mp3" },

    // brother
    { content_id: content[17].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. His name is Jack.", answer_value: "brother", sound_path: "/sounds/family/sentences/en/brother.mp3" },
    { content_id: content[17].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Jack.", answer_value: "veli", sound_path: "/sounds/family/sentences/fi/veli.mp3" },
    { content_id: content[17].content_id, language_id: languages[2].language_id, value: "Це мій {{answer}}. Його звати Джек.", answer_value: "брат", sound_path: "/sounds/family/sentences/uk/брат.mp3" },
    { content_id: content[17].content_id, language_id: languages[3].language_id, value: "Это мой {{answer}}. Его зовут Джек.", answer_value: "брат", sound_path: "/sounds/family/sentences/ru/брат.mp3" },

    // grandmother
    { content_id: content[18].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. Her name is Lily.", answer_value: "grandmother", sound_path: "/sounds/family/sentences/en/grandmother.mp3" },
    { content_id: content[18].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Lily.", answer_value: "isoäiti", sound_path: "/sounds/family/sentences/fi/isoäiti.mp3" },
    { content_id: content[18].content_id, language_id: languages[2].language_id, value: "Це моя {{answer}}. Її звати Лілі.", answer_value: "бабуся", sound_path: "/sounds/family/sentences/uk/бабуся.mp3" },
    { content_id: content[18].content_id, language_id: languages[3].language_id, value: "Это моя {{answer}}. Ее зовут Лили.", answer_value: "бабушка", sound_path: "/sounds/family/sentences/ru/бабушка.mp3" },

    // grandfather
    { content_id: content[19].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. His name is Leonard.", answer_value: "grandfather", sound_path: "/sounds/family/sentences/en/grandfather.mp3" },
    { content_id: content[19].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Leonard.", answer_value: "isoisä", sound_path: "/sounds/family/sentences/fi/isoisä.mp3" },
    { content_id: content[19].content_id, language_id: languages[2].language_id, value: "Це мій {{answer}}. Його звати Леонард.", answer_value: "дідусь", sound_path: "/sounds/family/sentences/uk/дідусь.mp3" },
    { content_id: content[19].content_id, language_id: languages[3].language_id, value: "Это мой {{answer}}. Его зовут Леонард.", answer_value: "дедушка", sound_path: "/sounds/family/sentences/ru/дедушка.mp3" },

    // aunt
    { content_id: content[20].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. Her name is Emily.", answer_value: "aunt", sound_path: "/sounds/family/sentences/en/aunt.mp3" },
    { content_id: content[20].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Emily.", answer_value: "täti", sound_path: "/sounds/family/sentences/fi/täti.mp3" },
    { content_id: content[20].content_id, language_id: languages[2].language_id, value: "Це моя {{answer}}. Її звати Емілі.", answer_value: "тітка", sound_path: "/sounds/family/sentences/uk/тітка.mp3" },
    { content_id: content[20].content_id, language_id: languages[3].language_id, value: "Это моя {{answer}}. Её зовут Эмили.", answer_value: "тетя", sound_path: "/sounds/family/sentences/ru/тетя.mp3" },

    // uncle
    { content_id: content[21].content_id, language_id: languages[0].language_id, value: "This is my {{answer}}. His name is Bill.", answer_value: "uncle", sound_path: "/sounds/family/sentences/en/uncle.mp3" },
    { content_id: content[21].content_id, language_id: languages[1].language_id, value: "Tämä on minun {{answer}}. Hänen nimensä on Bill.", answer_value: "setä", sound_path: "/sounds/family/sentences/fi/eno_setä.mp3" },
    { content_id: content[21].content_id, language_id: languages[2].language_id, value: "Це мій {{answer}}. Його звати Білл.", answer_value: "дядько", sound_path: "/sounds/family/sentences/uk/дядько.mp3" },
    { content_id: content[21].content_id, language_id: languages[3].language_id, value: "Это мой {{answer}}. Его зовут Билл.", answer_value: "дядя", sound_path: "/sounds/family/sentences/ru/дядя.mp3" },

    // FAMILY (TEXT)
    // English
    { 
      content_id: content[22].content_id, 
      language_id: languages[0].language_id, 
      value: "Hi! My name is Emma. I have a big family. This is my mother. Her name is Jane. This is my father. His name is John. This is my brother. His name is Mikael. This is my sister. Her name is Penny. This is my grandmother. Her name is Lily. This is my grandfather. His name is Leonard. This is my aunt. Her name is Emily. This is my uncle. His name is Bill. I love my family.", 
      sound_path: "/sounds/family/text/en_family.mp3",
      title: "My family"  
    },
    // Finnish
    { 
      content_id: content[22].content_id, 
      language_id: languages[1].language_id, 
      value: "Hei! Minun nimi on Emma. Minulla on suuri perhe. Tämä on minun äiti. Hänen nimi on Jane. Tämä on minun isä. Hänen nimi on John. Tämä on minun veli. Hänen nimi on Mikael. Tämä on minun sisko. Hänen nimi on Penny. Tämä on minun isoäiti. Hänen nimi on Lily. Tämä on minun isoisä. Hänen nimi on Leonard. Tämä on minun täti. Hänen nimi on Emily. Tämä on minun setä. Hänen nimi on Bill. Rakastan minun perhettä.", 
      sound_path: "/sounds/family/text/fi_family.mp3",
      title: "Minun perhe" 
    },
    // Ukrainian
    { 
      content_id: content[22].content_id, 
      language_id: languages[2].language_id, 
      value: "Привіт! Мене звати Емма. У мене велика родина. Це моя мама. Її звати Джейн. Це мій батько. Його звати Джон. Це мій брат. Його звати Мікаель. Це моя сестра. Її звати Пенні. Це моя бабуся. Її звати Лілі. Це мій дідусь. Його звати Леонард. Це моя тітка. Її звати Емілі. Це мій дядько. Його звати Білл. Я люблю свою сім'ю.", 
      sound_path: "/sounds/family/text/uk_family.mp3",
      title: "Моя сім'я" 
    },
    // Russian
    { 
      content_id: content[22].content_id, 
      language_id: languages[3].language_id, 
      value: "Привет! Меня зовут Эмма. У меня большая семья. Это моя мама. Ее зовут Джейн. Это мой отец. Его зовут Джон. Это мой брат. Его зовут Микаэль. Это моя сестра. Ее зовут Пенни. Это моя бабушка. Ее зовут Лили. Это мой дедушка. Его зовут Леонард. Это моя тетя. Ее зовут Эмили. Это мой дядя. Его зовут Билл. Я люблю свою семью.", 
      sound_path: "/sounds/family/text/ru_family.mp3",
      title: "Моя семья"
    },

    // SCHOOL (WORDS)

    // school
    { content_id: content[23].content_id, language_id: languages[0].language_id, value: "school", sound_path: "/sounds/school/words/en/school.mp3" },
    { content_id: content[23].content_id, language_id: languages[1].language_id, value: "koulu", sound_path: "/sounds/school/words/fi/koulu.mp3" },
    { content_id: content[23].content_id, language_id: languages[2].language_id, value: "школа", sound_path: "/sounds/school/words/uk/школа.mp3" },
    { content_id: content[23].content_id, language_id: languages[3].language_id, value: "школа", sound_path: "/sounds/school/words/ru/школа.mp3" },

    // classroom
    { content_id: content[24].content_id, language_id: languages[0].language_id, value: "classroom", sound_path: "/sounds/school/words/en/classroom.mp3" },
    { content_id: content[24].content_id, language_id: languages[1].language_id, value: "luokkahuone", sound_path: "/sounds/school/words/fi/luokkahuone.mp3" },
    { content_id: content[24].content_id, language_id: languages[2].language_id, value: "клас", sound_path: "/sounds/school/words/uk/клас.mp3" },
    { content_id: content[24].content_id, language_id: languages[3].language_id, value: "класс", sound_path: "/sounds/school/words/ru/класс.mp3" },

    // teacher
    { content_id: content[25].content_id, language_id: languages[0].language_id, value: "teacher", sound_path: "/sounds/school/words/en/teacher.mp3" },
    { content_id: content[25].content_id, language_id: languages[1].language_id, value: "opettaja", sound_path: "/sounds/school/words/fi/opettaja.mp3" },
    { content_id: content[25].content_id, language_id: languages[2].language_id, value: "вчитель", sound_path: "/sounds/school/words/uk/вчитель.mp3" },
    { content_id: content[25].content_id, language_id: languages[3].language_id, value: "учитель", sound_path: "/sounds/school/words/ru/учитель.mp3" },

    // student
    { content_id: content[26].content_id, language_id: languages[0].language_id, value: "student", sound_path: "/sounds/school/words/en/student.mp3" },
    { content_id: content[26].content_id, language_id: languages[1].language_id, value: "oppilas", sound_path: "/sounds/school/words/fi/oppilas.mp3" },
    { content_id: content[26].content_id, language_id: languages[2].language_id, value: "учень", sound_path: "/sounds/school/words/uk/учень.mp3" },
    { content_id: content[26].content_id, language_id: languages[3].language_id, value: "ученик", sound_path: "/sounds/school/words/ru/ученик.mp3" },

    // book
    { content_id: content[27].content_id, language_id: languages[0].language_id, value: "book", sound_path: "/sounds/school/words/en/book.mp3" },
    { content_id: content[27].content_id, language_id: languages[1].language_id, value: "kirja", sound_path: "/sounds/school/words/fi/kirja.mp3" },
    { content_id: content[27].content_id, language_id: languages[2].language_id, value: "книга", sound_path: "/sounds/school/words/uk/книга.mp3" },
    { content_id: content[27].content_id, language_id: languages[3].language_id, value: "книга", sound_path: "/sounds/school/words/ru/книга.mp3" },

    // notebook
    { content_id: content[28].content_id, language_id: languages[0].language_id, value: "notebook", sound_path: "/sounds/school/words/en/notebook.mp3" },
    { content_id: content[28].content_id, language_id: languages[1].language_id, value: "vihko", sound_path: "/sounds/school/words/fi/vihko.mp3" },
    { content_id: content[28].content_id, language_id: languages[2].language_id, value: "зошит", sound_path: "/sounds/school/words/uk/зошит.mp3" },
    { content_id: content[28].content_id, language_id: languages[3].language_id, value: "тетрадь", sound_path: "/sounds/school/words/ru/тетрадь.mp3" },

    // pen
    { content_id: content[29].content_id, language_id: languages[0].language_id, value: "pen", sound_path: "/sounds/school/words/en/pen.mp3" },
    { content_id: content[29].content_id, language_id: languages[1].language_id, value: "kynä", sound_path: "/sounds/school/words/fi/kynä.mp3" },
    { content_id: content[29].content_id, language_id: languages[2].language_id, value: "ручка", sound_path: "/sounds/school/words/uk/ручка.mp3" },
    { content_id: content[29].content_id, language_id: languages[3].language_id, value: "ручка", sound_path: "/sounds/school/words/ru/ручка.mp3" },

    // pencil
    { content_id: content[30].content_id, language_id: languages[0].language_id, value: "pencil", sound_path: "/sounds/school/words/en/pencil.mp3" },
    { content_id: content[30].content_id, language_id: languages[1].language_id, value: "lyijykynä", sound_path: "/sounds/school/words/fi/lyijykynä.mp3" },
    { content_id: content[30].content_id, language_id: languages[2].language_id, value: "олівець", sound_path: "/sounds/school/words/uk/олівець.mp3" },
    { content_id: content[30].content_id, language_id: languages[3].language_id, value: "карандаш", sound_path: "/sounds/school/words/ru/карандаш.mp3" },

    // desk
    { content_id: content[31].content_id, language_id: languages[0].language_id, value: "desk", sound_path: "/sounds/school/words/en/desk.mp3" },
    { content_id: content[31].content_id, language_id: languages[1].language_id, value: "pulpetti", sound_path: "/sounds/school/words/fi/pulpetti.mp3" },
    { content_id: content[31].content_id, language_id: languages[2].language_id, value: "парта", sound_path: "/sounds/school/words/uk/парта.mp3" },
    { content_id: content[31].content_id, language_id: languages[3].language_id, value: "парта", sound_path: "/sounds/school/words/ru/парта.mp3" },

    // lesson
    { content_id: content[32].content_id, language_id: languages[0].language_id, value: "lesson", sound_path: "/sounds/school/words/en/lesson.mp3" },
    { content_id: content[32].content_id, language_id: languages[1].language_id, value: "oppitunti", sound_path: "/sounds/school/words/fi/oppitunti.mp3" },
    { content_id: content[32].content_id, language_id: languages[2].language_id, value: "урок", sound_path: "/sounds/school/words/uk/урок.mp3" },
    { content_id: content[32].content_id, language_id: languages[3].language_id, value: "урок", sound_path: "/sounds/school/words/ru/урок.mp3" },

    // break
    { content_id: content[33].content_id, language_id: languages[0].language_id, value: "break", sound_path: "/sounds/school/words/en/break.mp3" },
    { content_id: content[33].content_id, language_id: languages[1].language_id, value: "välitunti", sound_path: "/sounds/school/words/fi/välitunti.mp3" },
    { content_id: content[33].content_id, language_id: languages[2].language_id, value: "перерва", sound_path: "/sounds/school/words/uk/перерва.mp3" },
    { content_id: content[33].content_id, language_id: languages[3].language_id, value: "перемена", sound_path: "/sounds/school/words/ru/перемена.mp3" },

    // SCHOOL (SENTENCES)

    // school
    { content_id: content[34].content_id, language_id: languages[0].language_id, value: "I go to {{answer}}.", answer_value: "school", sound_path: "/sounds/school/sentences/en/school.mp3" },
    { content_id: content[34].content_id, language_id: languages[1].language_id, value: "Minä menen {{answer}}.", answer_value: "kouluun", sound_path: "/sounds/school/sentences/fi/koulu.mp3" },
    { content_id: content[34].content_id, language_id: languages[2].language_id, value: "Я ходжу до {{answer}}.", answer_value: "школи", sound_path: "/sounds/school/sentences/uk/школа.mp3" },
    { content_id: content[34].content_id, language_id: languages[3].language_id, value: "Я хожу в {{answer}}.", answer_value: "школу", sound_path: "/sounds/school/sentences/ru/школа.mp3" },

    // classroom
    { content_id: content[35].content_id, language_id: languages[0].language_id, value: "Our {{answer}} is big and light.", answer_value: "classroom", sound_path: "/sounds/school/sentences/en/classroom.mp3" },
    { content_id: content[35].content_id, language_id: languages[1].language_id, value: "Meidän {{answer}} on suuri ja valoisa.", answer_value: "luokka", sound_path: "/sounds/school/sentences/fi/luokkahuone.mp3" },
    { content_id: content[35].content_id, language_id: languages[2].language_id, value: "Наш {{answer}} великий і світлий.", answer_value: "клас", sound_path: "/sounds/school/sentences/uk/клас.mp3" },
    { content_id: content[35].content_id, language_id: languages[3].language_id, value: "Наш {{answer}} большой и светлый.", answer_value: "класс", sound_path: "/sounds/school/sentences/ru/класс.mp3" },

    // teacher
    { content_id: content[36].content_id, language_id: languages[0].language_id, value: "We have a good {{answer}}.", answer_value: "teacher", sound_path: "/sounds/school/sentences/en/teacher.mp3" },
    { content_id: content[36].content_id, language_id: languages[1].language_id, value: "Meillä on hyvä {{answer}}.", answer_value: "opettaja", sound_path: "/sounds/school/sentences/fi/opettaja.mp3" },
    { content_id: content[36].content_id, language_id: languages[2].language_id, value: "У нас хороший {{answer}}.", answer_value: "учитель", sound_path: "/sounds/school/sentences/uk/вчитель.mp3" },
    { content_id: content[36].content_id, language_id: languages[3].language_id, value: "У нас хороший {{answer}}.", answer_value: "учитель", sound_path: "/sounds/school/sentences/ru/учитель.mp3" },

    // student
    { content_id: content[37].content_id, language_id: languages[0].language_id, value: "I am a {{answer}}.", answer_value: "student", sound_path: "/sounds/school/sentences/en/student.mp3" },
    { content_id: content[37].content_id, language_id: languages[1].language_id, value: "Minä olen {{answer}}.", answer_value: "oppilas", sound_path: "/sounds/school/sentences/fi/oppilas.mp3" },
    { content_id: content[37].content_id, language_id: languages[2].language_id, value: "Я {{answer}}.", answer_value: "учень", sound_path: "/sounds/school/sentences/uk/учень.mp3" },
    { content_id: content[37].content_id, language_id: languages[3].language_id, value: "Я {{answer}}.", answer_value: "ученик", sound_path: "/sounds/school/sentences/ru/ученик.mp3" },

    // book
    { content_id: content[38].content_id, language_id: languages[0].language_id, value: "I read a {{answer}}.", answer_value: "book", sound_path: "/sounds/school/sentences/en/book.mp3" },
    { content_id: content[38].content_id, language_id: languages[1].language_id, value: "Minä luen {{answer}}.", answer_value: "kirjaa", sound_path: "/sounds/school/sentences/fi/kirja.mp3" },
    { content_id: content[38].content_id, language_id: languages[2].language_id, value: "Я читаю {{answer}}.", answer_value: "книгу", sound_path: "/sounds/school/sentences/uk/книга.mp3" },
    { content_id: content[38].content_id, language_id: languages[3].language_id, value: "Я читаю {{answer}}.", answer_value: "книгу", sound_path: "/sounds/school/sentences/ru/книга.mp3" },

    // notebook
    { content_id: content[39].content_id, language_id: languages[0].language_id, value: "I write in my {{answer}}.", answer_value: "notebook", sound_path: "/sounds/school/sentences/en/notebook.mp3" },
    { content_id: content[39].content_id, language_id: languages[1].language_id, value: "Minä kirjoitan {{answer}}.", answer_value: "vihkoon", sound_path: "/sounds/school/sentences/fi/vihko.mp3" },
    { content_id: content[39].content_id, language_id: languages[2].language_id, value: "Я пишу у {{answer}}.", answer_value: "зошиті", sound_path: "/sounds/school/sentences/uk/зошит.mp3" },
    { content_id: content[39].content_id, language_id: languages[3].language_id, value: "Я пишу в {{answer}}.", answer_value: "тетради", sound_path: "/sounds/school/sentences/ru/тетрадь.mp3" },

    // pen
    { content_id: content[40].content_id, language_id: languages[0].language_id, value: "I write with a {{answer}}.", answer_value: "pen", sound_path: "/sounds/school/sentences/en/pen.mp3" },
    { content_id: content[40].content_id, language_id: languages[1].language_id, value: "Minä kirjoitan {{answer}}.", answer_value: "kynällä", sound_path: "/sounds/school/sentences/fi/kynä.mp3" },
    { content_id: content[40].content_id, language_id: languages[2].language_id, value: "Я пишу {{answer}}.", answer_value: "ручкою", sound_path: "/sounds/school/sentences/uk/ручка.mp3" },
    { content_id: content[40].content_id, language_id: languages[3].language_id, value: "Я пишу {{answer}}.", answer_value: "ручкой", sound_path: "/sounds/school/sentences/ru/ручка.mp3" },

    // pencil
    { content_id: content[41].content_id, language_id: languages[0].language_id, value: "I draw with a {{answer}}.", answer_value: "pencil", sound_path: "/sounds/school/sentences/en/pencil.mp3" },
    { content_id: content[41].content_id, language_id: languages[1].language_id, value: "Minä piirrän {{answer}}.", answer_value: "lyijykynällä", sound_path: "/sounds/school/sentences/fi/lyijykynä.mp3" },
    { content_id: content[41].content_id, language_id: languages[2].language_id, value: "Я малюю {{answer}}.", answer_value: "олівцем", sound_path: "/sounds/school/sentences/uk/олівець.mp3" },
    { content_id: content[41].content_id, language_id: languages[3].language_id, value: "Я рисую {{answer}}.", answer_value: "карандашом", sound_path: "/sounds/school/sentences/ru/карандаш.mp3" },

    // desk
    { content_id: content[42].content_id, language_id: languages[0].language_id, value: "We sit at {{answer}}.", answer_value: "desks", sound_path: "/sounds/school/sentences/en/desk.mp3" },
    { content_id: content[42].content_id, language_id: languages[1].language_id, value: "Me istumme {{answer}}.", answer_value: "pulpettien ääressä", sound_path: "/sounds/school/sentences/fi/pulpetti.mp3" },
    { content_id: content[42].content_id, language_id: languages[2].language_id, value: "Ми сидимо за {{answer}}.", answer_value: "партами", sound_path: "/sounds/school/sentences/uk/парта.mp3" },
    { content_id: content[42].content_id, language_id: languages[3].language_id, value: "Мы сидим за {{answer}}.", answer_value: "партами", sound_path: "/sounds/school/sentences/ru/парта.mp3" },

    // lesson
    { content_id: content[43].content_id, language_id: languages[0].language_id, value: "We have four {{answer}} every day.", answer_value: "lessons", sound_path: "/sounds/school/sentences/en/lesson.mp3" },
    { content_id: content[43].content_id, language_id: languages[1].language_id, value: "Meillä on neljä {{answer}} joka päivä.", answer_value: "oppituntia", sound_path: "/sounds/school/sentences/fi/oppitunti.mp3" },
    { content_id: content[43].content_id, language_id: languages[2].language_id, value: "У нас чотири {{answer}} щодня.", answer_value: "уроки", sound_path: "/sounds/school/sentences/uk/урок.mp3" },
    { content_id: content[43].content_id, language_id: languages[3].language_id, value: "У нас четыре {{answer}} каждый день.", answer_value: "урока", sound_path: "/sounds/school/sentences/ru/урок.mp3" },

    // break
    { content_id: content[44].content_id, language_id: languages[0].language_id, value: "Students go outside on a {{answer}}.", answer_value: "break", sound_path: "/sounds/school/sentences/en/break.mp3" },
    { content_id: content[44].content_id, language_id: languages[1].language_id, value: "Oppilaat menevät ulos {{answer}}.", answer_value: "välitunnilla", sound_path: "/sounds/school/sentences/fi/välitunti.mp3" },
    { content_id: content[44].content_id, language_id: languages[2].language_id, value: "Учні виходять надвір на {{answer}}.", answer_value: "перерві", sound_path: "/sounds/school/sentences/uk/перерва.mp3" },
    { content_id: content[44].content_id, language_id: languages[3].language_id, value: "Ученики выходят на улицу на {{answer}}.", answer_value: "перемене", sound_path: "/sounds/school/sentences/ru/перемена.mp3" },

    // SCHOOL (TEXT)

    // English
    {
      content_id: content[45].content_id,
      language_id: languages[0].language_id,
      value: "Hello! My name is Emma. I am a student. Every morning I go to school. Our classroom is big and bright. My teacher is very kind. I have a book, a notebook, a pen, and a pencil in my school bag. I read my book and write in my notebook with a pen. I draw with a pencil. We sit at our desks and learn many new things. We have four lessons every day. During the break, my friends and I go outside and play together. I like my school very much.",
      sound_path: "/sounds/school/text/en_school.mp3",
      title: "My school"
    },

    // Finnish
    {
      content_id: content[45].content_id,
      language_id: languages[1].language_id,
      value: "Hei! Minun nimeni on Emma. Olen oppilas. Joka aamu menen kouluun. Meidän luokkahuone on suuri ja valoisa. Opettaja on erittäin ystävällinen. Minulla on koululaukussa kirja, vihko, kynä ja lyijykynä. Luen kirjaa ja kirjoitan vihkoon kynällä. Piirrän lyijykynällä. Istumme pulpeteissa ja opimme paljon uusia asioita. Meillä on neljä oppituntia joka päivä. Välitunnilla minä ja ystävä menemme ulos ja leikimme yhdessä. Pidän koulusta todella paljon.",
      sound_path: "/sounds/school/text/fi_school.mp3",
      title: "Minun kouluni"
    },

    // Ukrainian
    {
      content_id: content[45].content_id,
      language_id: languages[2].language_id,
      value: "Привіт! Мене звати Емма. Я учениця. Щоранку я ходжу до школи. Наш клас великий і світлий. Моя вчителька дуже добра. У моєму шкільному рюкзаку є книга, зошит, ручка та олівець. Я читаю свою книгу і пишу в зошиті ручкою. Я малюю олівцем. Ми сидимо за партами і вивчаємо багато нового. У нас чотири уроки щодня. На перерві ми з друзями виходимо на вулицю і граємо разом. Мені дуже подобається моя школа.",
      sound_path: "/sounds/school/text/uk_school.mp3",
      title: "Моя школа"
    },

    // Russian
    {
      content_id: content[45].content_id,
      language_id: languages[3].language_id,
      value: "Привет! Меня зовут Эмма. Я ученица. Каждое утро я хожу в школу. Наш класс большой и светлый. Моя учительница очень добрая. В моем школьном рюкзаке есть книга, тетрадь, ручка и карандаш. Я читаю свою книгу и пишу в тетради ручкой. Я рисую карандашом. Мы сидим за партами и узнаём много нового. У нас четыре урока каждый день. На перемене мы с друзьями выходим на улицу и играем вместе. Мне очень нравится моя школа.",
      sound_path: "/sounds/school/text/ru_school.mp3",
      title: "Моя школа"
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