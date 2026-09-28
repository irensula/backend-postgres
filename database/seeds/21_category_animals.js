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
    { type: "word", slug: "animal", image_path: "/images/animals/animal.png", category_id: categoryMap.animals },
    { type: "word", slug: "pet", image_path: "/images/animals/pet.png", category_id: categoryMap.animals },
    { type: "word", slug: "dog", image_path: "/images/animals/dog.png", category_id: categoryMap.animals },
    { type: "word", slug: "cat", image_path: "/images/animals/cat.png", category_id: categoryMap.animals },
    { type: "word", slug: "hamster", image_path: "/images/animals/hamster.png", category_id: categoryMap.animals },
    { type: "word", slug: "hare", image_path: "/images/animals/hare.png", category_id: categoryMap.animals },
    { type: "word", slug: "squirrel", image_path: "/images/animals/squirrel.png", category_id: categoryMap.animals },
    { type: "word", slug: "hedgehog", image_path: "/images/animals/hedgehog.png", category_id: categoryMap.animals },
    { type: "word", slug: "fox", image_path: "/images/animals/fox.png", category_id: categoryMap.animals },
    { type: "word", slug: "wolf", image_path: "/images/animals/wolf.png", category_id: categoryMap.animals },
    { type: "word", slug: "bear", image_path: "/images/animals/bear.png", category_id: categoryMap.animals },
    { type: "word", slug: "mouse", image_path: "/images/animals/mouse.png", category_id: categoryMap.animals },

    // SENTENCES
    { type: "sentence", slug: "animal", image_path: "/images/animals/animal.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "pet", image_path: "/images/animals/pet.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "dog", image_path: "/images/animals/dog.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "cat", image_path: "/images/animals/cat.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "hamster", image_path: "/images/animals/hamster.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "hare", image_path: "/images/animals/hare.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "squirrel", image_path: "/images/animals/squirrel.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "hedgehog", image_path: "/images/animals/hedgehog.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "fox", image_path: "/images/animals/fox.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "wolf", image_path: "/images/animals/wolf.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "bear", image_path: "/images/animals/bear.png", category_id: categoryMap.animals },
    { type: "sentence", slug: "mouse", image_path: "/images/animals/mouse.png", category_id: categoryMap.animals },

    // TEXT
    { type: "text", slug: "animals", image_path: "/images/texts/animals_image.png", category_id: categoryMap.animals },
])
  .onConflict(["category_id", "type", "slug"])
  .merge(["image_path"]);

  const content = await knex("content")
      .select("content_id", "category_id", "type", "slug")
      .where("category_id", categoryMap.animals);

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
      content_id: contentMap[`${categoryMap.animals}_word_animal`],
      language_id: languageMap.en,
      value: "animal",
      sound_path: "/sounds/animals/words/en/animal.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_animal`],
      language_id: languageMap.fi,
      value: "eläin",
      sound_path: "/sounds/animals/words/fi/eläin.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_animal`],
      language_id: languageMap.uk,
      value: "тварина",
      sound_path: "/sounds/animals/words/uk/тварина.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_animal`],
      language_id: languageMap.ru,
      value: "животное",
      sound_path: "/sounds/animals/words/ru/животное.mp3"
    },

    // word 2
    {
      content_id: contentMap[`${categoryMap.animals}_word_pet`],
      language_id: languageMap.en,
      value: "pet",
      sound_path: "/sounds/animals/words/en/pet.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_pet`],
      language_id: languageMap.fi,
      value: "lemmikki",
      sound_path: "/sounds/animals/words/fi/lemmikki.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_pet`],
      language_id: languageMap.uk,
      value: "домашня тварина",
      sound_path: "/sounds/animals/words/uk/домашня тварина.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_pet`],
      language_id: languageMap.ru,
      value: "домашнее животное",
      sound_path: "/sounds/animals/words/ru/домашнее животное.mp3"
    },

    // word 3
    {
      content_id: contentMap[`${categoryMap.animals}_word_dog`],
      language_id: languageMap.en,
      value: "dog",
      sound_path: "/sounds/animals/words/en/dog.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_dog`],
      language_id: languageMap.fi,
      value: "koira",
      sound_path: "/sounds/animals/words/fi/koira.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_dog`],
      language_id: languageMap.uk,
      value: "собака",
      sound_path: "/sounds/animals/words/uk/собака.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_dog`],
      language_id: languageMap.ru,
      value: "собака",
      sound_path: "/sounds/animals/words/ru/собака.mp3"
    },

    // word 4
    {
      content_id: contentMap[`${categoryMap.animals}_word_cat`],
      language_id: languageMap.en,
      value: "cat",
      sound_path: "/sounds/animals/words/en/cat.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_cat`],
      language_id: languageMap.fi,
      value: "kissa",
      sound_path: "/sounds/animals/words/fi/kissa.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_cat`],
      language_id: languageMap.uk,
      value: "кішка",
      sound_path: "/sounds/animals/words/uk/кішка.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_cat`],
      language_id: languageMap.ru,
      value: "кошка",
      sound_path: "/sounds/animals/words/ru/кошка.mp3"
    },

    // word 5
    {
      content_id: contentMap[`${categoryMap.animals}_word_hamster`],
      language_id: languageMap.en,
      value: "hamster",
      sound_path: "/sounds/animals/words/en/hamster.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hamster`],
      language_id: languageMap.fi,
      value: "hamsteri",
      sound_path: "/sounds/animals/words/fi/hamsteri.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hamster`],
      language_id: languageMap.uk,
      value: "хом’як",
      sound_path: "/sounds/animals/words/uk/хом’як.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hamster`],
      language_id: languageMap.ru,
      value: "хомяк",
      sound_path: "/sounds/animals/words/ru/хомяк.mp3"
    },

    // word 6
    {
      content_id: contentMap[`${categoryMap.animals}_word_hare`],
      language_id: languageMap.en,
      value: "hare",
      sound_path: "/sounds/animals/words/en/hare.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hare`],
      language_id: languageMap.fi,
      value: "jänis",
      sound_path: "/sounds/animals/words/fi/jänis.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hare`],
      language_id: languageMap.uk,
      value: "заєць",
      sound_path: "/sounds/animals/words/uk/заєць.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hare`],
      language_id: languageMap.ru,
      value: "заяц",
      sound_path: "/sounds/animals/words/ru/заяц.mp3"
    },

    // word 7
    {
      content_id: contentMap[`${categoryMap.animals}_word_squirrel`],
      language_id: languageMap.en,
      value: "squirrel",
      sound_path: "/sounds/animals/words/en/squirrel.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_squirrel`],
      language_id: languageMap.fi,
      value: "orava",
      sound_path: "/sounds/animals/words/fi/orava.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_squirrel`],
      language_id: languageMap.uk,
      value: "білка",
      sound_path: "/sounds/animals/words/uk/білка.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_squirrel`],
      language_id: languageMap.ru,
      value: "белка",
      sound_path: "/sounds/animals/words/ru/белка.mp3"
    },

    // word 8
    {
      content_id: contentMap[`${categoryMap.animals}_word_hedgehog`],
      language_id: languageMap.en,
      value: "hedgehog",
      sound_path: "/sounds/animals/words/en/hedgehog.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hedgehog`],
      language_id: languageMap.fi,
      value: "siili",
      sound_path: "/sounds/animals/words/fi/siili.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hedgehog`],
      language_id: languageMap.uk,
      value: "їжак",
      sound_path: "/sounds/animals/words/uk/їжак.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_hedgehog`],
      language_id: languageMap.ru,
      value: "ёж",
      sound_path: "/sounds/animals/words/ru/ёж.mp3"
    },

    // word 9
    {
      content_id: contentMap[`${categoryMap.animals}_word_fox`],
      language_id: languageMap.en,
      value: "fox",
      sound_path: "/sounds/animals/words/en/fox.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_fox`],
      language_id: languageMap.fi,
      value: "kettu",
      sound_path: "/sounds/animals/words/fi/kettu.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_fox`],
      language_id: languageMap.uk,
      value: "лисиця",
      sound_path: "/sounds/animals/words/uk/лисиця.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_fox`],
      language_id: languageMap.ru,
      value: "лиса",
      sound_path: "/sounds/animals/words/ru/лиса.mp3"
    },

    // word 10
    {
      content_id: contentMap[`${categoryMap.animals}_word_wolf`],
      language_id: languageMap.en,
      value: "wolf",
      sound_path: "/sounds/animals/words/en/wolf.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_wolf`],
      language_id: languageMap.fi,
      value: "susi",
      sound_path: "/sounds/animals/words/fi/susi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_wolf`],
      language_id: languageMap.uk,
      value: "вовк",
      sound_path: "/sounds/animals/words/uk/вовк.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_wolf`],
      language_id: languageMap.ru,
      value: "волк",
      sound_path: "/sounds/animals/words/ru/волк.mp3"
    },

    // word 11
    {
      content_id: contentMap[`${categoryMap.animals}_word_bear`],
      language_id: languageMap.en,
      value: "bear",
      sound_path: "/sounds/animals/words/en/bear.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_bear`],
      language_id: languageMap.fi,
      value: "karhu",
      sound_path: "/sounds/animals/words/fi/karhu.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_bear`],
      language_id: languageMap.uk,
      value: "ведмідь",
      sound_path: "/sounds/animals/words/uk/ведмідь.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_bear`],
      language_id: languageMap.ru,
      value: "медведь",
      sound_path: "/sounds/animals/words/ru/медведь.mp3"
    },

    // word 12
    {
      content_id: contentMap[`${categoryMap.animals}_word_mouse`],
      language_id: languageMap.en,
      value: "mouse",
      sound_path: "/sounds/animals/words/en/mouse.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_mouse`],
      language_id: languageMap.fi,
      value: "hiiri",
      sound_path: "/sounds/animals/words/fi/hiiri.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_mouse`],
      language_id: languageMap.uk,
      value: "миша",
      sound_path: "/sounds/animals/words/uk/миша.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_word_mouse`],
      language_id: languageMap.ru,
      value: "мышь",
      sound_path: "/sounds/animals/words/ru/мышь.mp3"
    },

    // SENTENCES

    // sentence 1
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_animal`],
      language_id: languageMap.en,
      value: "{{answer}} live in a forest.",
      answer_value: "Animals",
      sound_path: "/sounds/animals/sentences/en/animal.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_animal`],
      language_id: languageMap.fi,
      value: "{{answer}} elävät metsässä.",
      answer_value: "Eläimet",
      sound_path: "/sounds/animals/sentences/fi/eläin.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_animal`],
      language_id: languageMap.uk,
      value: "{{answer}} живуть у лісі.",
      answer_value: "Тварини",
      sound_path: "/sounds/animals/sentences/uk/тварина.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_animal`],
      language_id: languageMap.ru,
      value: "{{answer}} живут в лесу.",
      answer_value: "Животные",
      sound_path: "/sounds/animals/sentences/ru/животное.mp3"
    },

    // sentence 2
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_pet`],
      language_id: languageMap.en,
      value: "{{answer}} live at home.",
      answer_value: "Pets",
      sound_path: "/sounds/animals/sentences/en/pet.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_pet`],
      language_id: languageMap.fi,
      value: "{{answer}} asuvat kotona.",
      answer_value: "Lemmikit",
      sound_path: "/sounds/animals/sentences/fi/lemmikki.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_pet`],
      language_id: languageMap.uk,
      value: "{{answer}} живуть вдома.",
      answer_value: "Домашні тварини",
      sound_path: "/sounds/animals/sentences/uk/домашня тварина.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_pet`],
      language_id: languageMap.ru,
      value: "{{answer}} живут дома.",
      answer_value: "Домашние животные",
      sound_path: "/sounds/animals/sentences/ru/домашнее животное.mp3"
    },

    // sentence 3
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_dog`],
      language_id: languageMap.en,
      value: "I have a {{answer}}.",
      answer_value: "dog",
      sound_path: "/sounds/animals/sentences/en/dog.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_dog`],
      language_id: languageMap.fi,
      value: "Minulla on {{answer}}.",
      answer_value: "koira",
      sound_path: "/sounds/animals/sentences/fi/koira.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_dog`],
      language_id: languageMap.uk,
      value: "У мене є {{answer}}.",
      answer_value: "собака",
      sound_path: "/sounds/animals/sentences/uk/собака.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_dog`],
      language_id: languageMap.ru,
      value: "У меня есть {{answer}}.",
      answer_value: "собака",
      sound_path: "/sounds/animals/sentences/ru/собака.mp3"
    },

    // sentence 4
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_cat`],
      language_id: languageMap.en,
      value: "You have a {{answer}}.",
      answer_value: "cat",
      sound_path: "/sounds/animals/sentences/en/cat.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_cat`],
      language_id: languageMap.fi,
      value: "Sinulla on {{answer}}.",
      answer_value: "kissa",
      sound_path: "/sounds/animals/sentences/fi/kissa.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_cat`],
      language_id: languageMap.uk,
      value: "У тебе є {{answer}}.",
      answer_value: "кішка",
      sound_path: "/sounds/animals/sentences/uk/кішка.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_cat`],
      language_id: languageMap.ru,
      value: "У тебя есть {{answer}}.",
      answer_value: "кошка",
      sound_path: "/sounds/animals/sentences/ru/кошка.mp3"
    },

    // sentence 5
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hamster`],
      language_id: languageMap.en,
      value: "My brother has a {{answer}}.",
      answer_value: "hamster",
      sound_path: "/sounds/animals/sentences/en/hamster.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hamster`],
      language_id: languageMap.fi,
      value: "Veljelläni on {{answer}}.",
      answer_value: "hamsteri",
      sound_path: "/sounds/animals/sentences/fi/hamsteri.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hamster`],
      language_id: languageMap.uk,
      value: "У мого брата є {{answer}}.",
      answer_value: "хом’як",
      sound_path: "/sounds/animals/sentences/uk/хом’як.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hamster`],
      language_id: languageMap.ru,
      value: "У моего брата есть {{answer}}.",
      answer_value: "хомяк",
      sound_path: "/sounds/animals/sentences/ru/хомяк.mp3"
    },

    // sentence 6
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hare`],
      language_id: languageMap.en,
      value: "A {{answer}} runs fast.",
      answer_value: "hare",
      sound_path: "/sounds/animals/sentences/en/hare.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hare`],
      language_id: languageMap.fi,
      value: "{{answer}} juoksee nopeasti.",
      answer_value: "Jänis",
      sound_path: "/sounds/animals/sentences/fi/jänis.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hare`],
      language_id: languageMap.uk,
      value: "{{answer}} швидко бігає.",
      answer_value: "Заєць",
      sound_path: "/sounds/animals/sentences/uk/заєць.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hare`],
      language_id: languageMap.ru,
      value: "{{answer}} быстро бегает.",
      answer_value: "Заяц",
      sound_path: "/sounds/animals/sentences/ru/заяц.mp3"
    },

    // sentence 7
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_squirrel`],
      language_id: languageMap.en,
      value: "A {{answer}} lives in a tree.",
      answer_value: "squirrel",
      sound_path: "/sounds/animals/sentences/en/squirrel.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_squirrel`],
      language_id: languageMap.fi,
      value: "{{answer}} asuu puussa.",
      answer_value: "Orava",
      sound_path: "/sounds/animals/sentences/fi/orava.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_squirrel`],
      language_id: languageMap.uk,
      value: "{{answer}} живе на дереві.",
      answer_value: "Білка",
      sound_path: "/sounds/animals/sentences/uk/білка.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_squirrel`],
      language_id: languageMap.ru,
      value: "{{answer}} живёт на дереве.",
      answer_value: "Белка",
      sound_path: "/sounds/animals/sentences/ru/белка.mp3"
    },

    // sentence 8
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hedgehog`],
      language_id: languageMap.en,
      value: "A {{answer}} is prickly.",
      answer_value: "hedgehog",
      sound_path: "/sounds/animals/sentences/en/hedgehog.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hedgehog`],
      language_id: languageMap.fi,
      value: "{{answer}} on piikikäs.",
      answer_value: "Siili",
      sound_path: "/sounds/animals/sentences/fi/siili.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hedgehog`],
      language_id: languageMap.uk,
      value: "{{answer}} колючий.",
      answer_value: "Їжак",
      sound_path: "/sounds/animals/sentences/uk/їжак.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_hedgehog`],
      language_id: languageMap.ru,
      value: "{{answer}} колючий.",
      answer_value: "Ёж",
      sound_path: "/sounds/animals/sentences/ru/ёж.mp3"
    },

    // sentence 9
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_fox`],
      language_id: languageMap.en,
      value: "A {{answer}} is red.",
      answer_value: "fox",
      sound_path: "/sounds/animals/sentences/en/fox.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_fox`],
      language_id: languageMap.fi,
      value: "{{answer}} on punainen.",
      answer_value: "Kettu",
      sound_path: "/sounds/animals/sentences/fi/kettu.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_fox`],
      language_id: languageMap.uk,
      value: "{{answer}} руда.",
      answer_value: "Лисиця",
      sound_path: "/sounds/animals/sentences/uk/лисиця.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_fox`],
      language_id: languageMap.ru,
      value: "{{answer}} рыжая.",
      answer_value: "Лиса",
      sound_path: "/sounds/animals/sentences/ru/лиса.mp3"
    },

    // sentence 10
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_wolf`],
      language_id: languageMap.en,
      value: "A {{answer}} is grey.",
      answer_value: "wolf",
      sound_path: "/sounds/animals/sentences/en/wolf.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_wolf`],
      language_id: languageMap.fi,
      value: "{{answer}} on harmaa.",
      answer_value: "Susi",
      sound_path: "/sounds/animals/sentences/fi/susi.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_wolf`],
      language_id: languageMap.uk,
      value: "{{answer}} сірий.",
      answer_value: "Вовк",
      sound_path: "/sounds/animals/sentences/uk/вовк.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_wolf`],
      language_id: languageMap.ru,
      value: "{{answer}} серый.",
      answer_value: "Волк",
      sound_path: "/sounds/animals/sentences/ru/волк.mp3"
    },

    // sentence 11
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_bear`],
      language_id: languageMap.en,
      value: "A {{answer}} is big.",
      answer_value: "bear",
      sound_path: "/sounds/animals/sentences/en/bear.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_bear`],
      language_id: languageMap.fi,
      value: "{{answer}} on iso.",
      answer_value: "Karhu",
      sound_path: "/sounds/animals/sentences/fi/karhu.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_bear`],
      language_id: languageMap.uk,
      value: "{{answer}} великий.",
      answer_value: "Ведмідь",
      sound_path: "/sounds/animals/sentences/uk/ведмідь.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_bear`],
      language_id: languageMap.ru,
      value: "{{answer}} большой.",
      answer_value: "Медведь",
      sound_path: "/sounds/animals/sentences/ru/медведь.mp3"
    },

    // sentence 12
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_mouse`],
      language_id: languageMap.en,
      value: "A {{answer}} is small.",
      answer_value: "mouse",
      sound_path: "/sounds/animals/sentences/en/mouse.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_mouse`],
      language_id: languageMap.fi,
      value: "{{answer}} on pieni.",
      answer_value: "Hiiri",
      sound_path: "/sounds/animals/sentences/fi/hiiri.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_mouse`],
      language_id: languageMap.uk,
      value: "{{answer}} маленька.",
      answer_value: "Миша",
      sound_path: "/sounds/animals/sentences/uk/миша.mp3"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_sentence_mouse`],
      language_id: languageMap.ru,
      value: "{{answer}} маленькая.",
      answer_value: "Мышь",
      sound_path: "/sounds/animals/sentences/ru/мышь.mp3"
    },

    // TEXT
    {
      content_id: contentMap[`${categoryMap.animals}_text_animals`],
      language_id: languageMap.en,
      value: "We have pets at home: I have a hamster and my sister has a dog. My aunt has a cat. Many animals live in forests too. A squirrel is small and it lives in a tree. A hare is grey and it runs fast. A hedgehog is prickly. A fox is red. A wolf is grey. A bear is big. A mouse is small. I like animals.",
      sound_path: "/sounds/animals/text/en_animals.mp3",
      title: "Animals"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_text_animals`],
      language_id: languageMap.fi,
      value: "Meillä on lemmikkejä kotona: minulla on hamsteri ja siskollani on koira. Minun tädillä on kissa. Myös monet eläimet elävät metsissä. Orava on pieni ja se asuu puussa. Jänis on harmaa ja se juoksee nopeasti. Siili on piikikäs. Kettu on punainen. Susi on harmaa. Karhu on iso. Hiiri on pieni. Pidän eläimistä.",
      sound_path: "/sounds/animals/text/fi_animals.mp3",
      title: "Eläimet"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_text_animals`],
      language_id: languageMap.uk,
      value: "У нас вдома є домашні тварини: у мене є хом’як, а у моєї сестри є собака. У моєї тітки є кішка. Багато тварин також живуть у лісах. Білка маленька і живе на дереві. Заєць сірий і швидко бігає. Їжак колючий. Лисиця руда. Вовк сірий. Ведмідь великий. Миша маленька. Я люблю тварин.",
      sound_path: "/sounds/animals/text/uk_animals.mp3",
      title: "Тварини"
    },
    {
      content_id: contentMap[`${categoryMap.animals}_text_animals`],
      language_id: languageMap.ru,
      value: "У нас дома есть домашние животные: у меня есть хомяк, а у моей сестры есть собака. У моей тёти есть кошка. Многие животные также живут в лесах. Белка маленькая и живёт на дереве. Заяц серый и быстро бегает. Ёж колючий. Лиса рыжая. Волк серый. Медведь большой. Мышь маленькая. Я люблю животных.",
      sound_path: "/sounds/animals/text/ru_animals.mp3",
      title: "Животные"
    },
])
  .onConflict(["content_id", "language_id"])
  .merge([ "value", "answer_value", "sound_path", "title" ]);
};