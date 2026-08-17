/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const exercises = await knex('exercises')
    .select("exercise_id", "screen_name");

  const languages = await knex('languages')
    .select("language_id", "code");
  
  const exerciseMap = Object.fromEntries(
    exercises.map(exercise => [
      exercise.screen_name, 
      exercise.exercise_id
    ])
  );

  const languageMap = Object.fromEntries(
    languages.map(language => [
      language.code, 
      language.language_id
    ])
  );

  await knex("exercise_translations")
    .insert([
      // Words List
      { exercise_id: exerciseMap.WordsList, language_id: languageMap.en, name: "Words", description: "Read and listen to the words" },
      { exercise_id: exerciseMap.WordsList, language_id: languageMap.fi, name: "Sanat", description: "Lue ja kuuntele sanat" },
      { exercise_id: exerciseMap.WordsList, language_id: languageMap.uk, name: "Слова", description: "Прочитайте та прослухайте слова" },
      { exercise_id: exerciseMap.WordsList, language_id: languageMap.ru, name: "Слова", description: "Прочитайте и прослушайте слова" },

      // Word Cards
      { exercise_id: exerciseMap.WordCard, language_id: languageMap.en, name: "Word Cards", description: "Read and listen to a word" },
      { exercise_id: exerciseMap.WordCard, language_id: languageMap.fi, name: "Sanakortit", description: "Lue ja kuuntele sana" },
      { exercise_id: exerciseMap.WordCard, language_id: languageMap.uk, name: "Картки зі словами", description: "Прочитайте та прослухайте слово" },
      { exercise_id: exerciseMap.WordCard, language_id: languageMap.ru, name: "Карточки слов", description: "Прочитайте и прослушайте слово" },

      // Sentences
      { exercise_id: exerciseMap.SentenceCard, language_id: languageMap.en, name: "Sentences", description: "Read and listen to the sentences" },
      { exercise_id: exerciseMap.SentenceCard, language_id: languageMap.fi, name: "Lauseet", description: "Lue ja kuuntele lauseet" },
      { exercise_id: exerciseMap.SentenceCard, language_id: languageMap.uk, name: "Речення", description: "Прочитайте та прослухайте речення" },
      { exercise_id: exerciseMap.SentenceCard, language_id: languageMap.ru, name: "Предложения", description: "Прочитайте и прослушайте предложения" },

      // Text
      { exercise_id: exerciseMap.Text, language_id: languageMap.en, name: "Text", description: "Read and listen to the text" },
      { exercise_id: exerciseMap.Text, language_id: languageMap.fi, name: "Teksti", description: "Lue ja kuuntele teksti" },
      { exercise_id: exerciseMap.Text, language_id: languageMap.uk, name: "Текст", description: "Прочитайте та прослухайте текст" },
      { exercise_id: exerciseMap.Text, language_id: languageMap.ru, name: "Текст", description: "Прочитайте и прослушайте текст" },

      // Memo Game
      { exercise_id: exerciseMap.MemoGame, language_id: languageMap.en, name: "Memory Game", description: "Find matching pairs" },
      { exercise_id: exerciseMap.MemoGame, language_id: languageMap.fi, name: "Muistipeli", description: "Löydä kuvaparit" },
      { exercise_id: exerciseMap.MemoGame, language_id: languageMap.uk, name: "Гра на пам'ять", description: "Знайдіть однакові пари" },
      { exercise_id: exerciseMap.MemoGame, language_id: languageMap.ru, name: "Игра на память", description: "Найдите одинаковые пары" },

      // Match Game
      { exercise_id: exerciseMap.MatchGame, language_id: languageMap.en, name: "Match Game", description: "Match words with pictures" },
      { exercise_id: exerciseMap.MatchGame, language_id: languageMap.fi, name: "Yhdistämispeli", description: "Yhdistä sanat kuviin" },
      { exercise_id: exerciseMap.MatchGame, language_id: languageMap.uk, name: "Гра на відповідність", description: "Поєднайте слова із зображеннями" },
      { exercise_id: exerciseMap.MatchGame, language_id: languageMap.ru, name: "Игра на соответствие", description: "Соедините слова с картинками" },

      // Fill the Gaps
      { exercise_id: exerciseMap.GapsTask, language_id: languageMap.en, name: "Fill the Gaps", description: "Fill the missing words in the sentences" },
      { exercise_id: exerciseMap.GapsTask, language_id: languageMap.fi, name: "Täydennä aukot", description: "Täydennä puuttuvat sanat lauseisiin" },
      { exercise_id: exerciseMap.GapsTask, language_id: languageMap.uk, name: "Заповніть пропуски", description: "Заповніть пропущені слова в реченнях" },
      { exercise_id: exerciseMap.GapsTask, language_id: languageMap.ru, name: "Заполните пропуски", description: "Заполните пропущенные слова в предложениях" },
    ])
    .onConflict(["exercise_id", "language_id"])
    .merge(["name", "description"]);
};