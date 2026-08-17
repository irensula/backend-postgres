/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  const categories = await knex("categories")
    .select("category_id", "slug");

  const categoryMap = Object.fromEntries(
    categories.map((category) => [
      category.slug,
      category.category_id,
    ])
  );
  
  const content = await knex("content")
    .select("content_id", "category_id", "type", "slug");

  const contentMap = Object.fromEntries(
    content.map((item) => [
      `${item.category_id}_${item.type}_${item.slug}`,
      item.content_id,
    ])
  );

  const languages = await knex("languages")
  .select("language_id", "code");

  const languageMap = Object.fromEntries(
    languages.map(language => [
      language.code,
      language.language_id
    ])
  );
  
  const content_translations = await knex('content_translations').insert([
    // FAMILY (WORDS)

    // family
    { content_id: contentMap[`${categoryMap.family}_word_family`], language_id: languageMap.en, value: "family", sound_path: "/sounds/family/words/en/family.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_family`], language_id: languageMap.fi, value: "perhe", sound_path: "/sounds/family/words/fi/perhe.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_family`], language_id: languageMap.uk, value: "сім'я", sound_path: "/sounds/family/words/uk/сім'я.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_family`], language_id: languageMap.ru, value: "семья", sound_path: "/sounds/family/words/ru/семья.mp3" },
    // mother
    { content_id: contentMap[`${categoryMap.family}_word_mother`], language_id: languageMap.en, value: "mother", sound_path: "/sounds/family/words/en/mother.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_mother`], language_id: languageMap.fi, value: "äiti", sound_path: "/sounds/family/words/fi/äiti.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_mother`], language_id: languageMap.uk, value: "мама", sound_path: "/sounds/family/words/uk/мама.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_mother`], language_id: languageMap.ru, value: "мама", sound_path: "/sounds/family/words/ru/мама.mp3" },
    // father
    { content_id: contentMap[`${categoryMap.family}_word_father`], language_id: languageMap.en, value: "father", sound_path: "/sounds/family/words/en/father.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_father`], language_id: languageMap.fi, value: "isä", sound_path: "/sounds/family/words/fi/isä.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_father`], language_id: languageMap.uk, value: "тато", sound_path: "/sounds/family/words/uk/тато.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_father`], language_id: languageMap.ru, value: "папа", sound_path: "/sounds/family/words/ru/папа.mp3" },
    // son
    { content_id: contentMap[`${categoryMap.family}_word_son`], language_id: languageMap.en, value: "son", sound_path: "/sounds/family/words/en/son.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_son`], language_id: languageMap.fi, value: "poika", sound_path: "/sounds/family/words/fi/poika.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_son`], language_id: languageMap.uk, value: "син", sound_path: "/sounds/family/words/uk/син.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_son`], language_id: languageMap.ru, value: "сын", sound_path: "/sounds/family/words/ru/сын.mp3" },
    // daughter
    { content_id: contentMap[`${categoryMap.family}_word_daughter`], language_id: languageMap.en, value: "daughter", sound_path: "/sounds/family/words/en/daughter.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_daughter`], language_id: languageMap.fi, value: "tytär", sound_path: "/sounds/family/words/fi/tytär.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_daughter`], language_id: languageMap.uk, value: "донька", sound_path: "/sounds/family/words/uk/донька.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_daughter`], language_id: languageMap.ru, value: "дочь", sound_path: "/sounds/family/words/ru/дочь.mp3" },
    // sister
    { content_id: contentMap[`${categoryMap.family}_word_sister`], language_id: languageMap.en, value: "sister", sound_path: "/sounds/family/words/en/sister.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_sister`], language_id: languageMap.fi, value: "sisko", sound_path: "/sounds/family/words/fi/sisko.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_sister`], language_id: languageMap.uk, value: "сестра", sound_path: "/sounds/family/words/uk/сестра.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_sister`], language_id: languageMap.ru, value: "сестра", sound_path: "/sounds/family/words/ru/сестра.mp3" },
    // brother
    { content_id: contentMap[`${categoryMap.family}_word_brother`], language_id: languageMap.en, value: "brother", sound_path: "/sounds/family/words/en/brother.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_brother`], language_id: languageMap.fi, value: "veli", sound_path: "/sounds/family/words/fi/veli.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_brother`], language_id: languageMap.uk, value: "брат", sound_path: "/sounds/family/words/uk/брат.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_brother`], language_id: languageMap.ru, value: "брат", sound_path: "/sounds/family/words/ru/брат.mp3" },
    // grandmother
    { content_id: contentMap[`${categoryMap.family}_word_grandmother`], language_id: languageMap.en, value: "grandmother", sound_path: "/sounds/family/words/en/grandmother.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_grandmother`], language_id: languageMap.fi, value: "isoäiti", sound_path: "/sounds/family/words/fi/isoäiti.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_grandmother`], language_id: languageMap.uk, value: "бабуся", sound_path: "/sounds/family/words/uk/бабуся.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_grandmother`], language_id: languageMap.ru, value: "бабушка", sound_path: "/sounds/family/words/ru/бабушка.mp3" },
    // grandfather
    { content_id: contentMap[`${categoryMap.family}_word_grandfather`], language_id: languageMap.en, value: "grandfather", sound_path: "/sounds/family/words/en/grandfather.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_grandfather`], language_id: languageMap.fi, value: "isoisä", sound_path: "/sounds/family/words/fi/isoisä.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_grandfather`], language_id: languageMap.uk, value: "дідусь", sound_path: "/sounds/family/words/uk/дідусь.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_grandfather`], language_id: languageMap.ru, value: "дедушка", sound_path: "/sounds/family/words/ru/дедушка.mp3" },
    // aunt
    { content_id: contentMap[`${categoryMap.family}_word_aunt`], language_id: languageMap.en, value: "aunt", sound_path: "/sounds/family/words/en/aunt.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_aunt`], language_id: languageMap.fi, value: "täti", sound_path: "/sounds/family/words/fi/täti.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_aunt`], language_id: languageMap.uk, value: "тітка", sound_path: "/sounds/family/words/uk/тітка.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_aunt`], language_id: languageMap.ru, value: "тётя", sound_path: "/sounds/family/words/ru/тётя.mp3" },
    // uncle
    { content_id: contentMap[`${categoryMap.family}_word_uncle`], language_id: languageMap.en, value: "uncle", sound_path: "/sounds/family/words/en/uncle.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_uncle`], language_id: languageMap.fi, value: "eno / setä", sound_path: "/sounds/family/words/fi/eno_setä.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_uncle`], language_id: languageMap.uk, value: "дядько", sound_path: "/sounds/family/words/uk/дядько.mp3" },
    { content_id: contentMap[`${categoryMap.family}_word_uncle`], language_id: languageMap.ru, value: "дядя", sound_path: "/sounds/family/words/ru/дядя.mp3" },
    
    // FAMILY (SENTENCES)

    // family
    { content_id: contentMap[`${categoryMap.family}_sentence_family`], language_id: languageMap.en, value: "This is my {{answer}}.", answer_value: "family", sound_path: "/sounds/family/sentences/en/family.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_family`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}.", answer_value: "perhe", sound_path: "/sounds/family/sentences/fi/perhe.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_family`], language_id: languageMap.uk, value: "Це моя {{answer}}.", answer_value: "сім'я", sound_path: "/sounds/family/sentences/uk/сім'я.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_family`], language_id: languageMap.ru, value: "Это моя {{answer}}.", answer_value: "семья", sound_path: "/sounds/family/sentences/ru/семья.mp3" },

    // mother
    { content_id: contentMap[`${categoryMap.family}_sentence_mother`], language_id: languageMap.en, value: "This is my {{answer}}. Her name is Jane.", answer_value: "mother", sound_path: "/sounds/family/sentences/en/mother.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_mother`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Jane.", answer_value: "äiti", sound_path: "/sounds/family/sentences/fi/äiti.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_mother`], language_id: languageMap.uk, value: "Це моя {{answer}}. Її звуть Джейн.", answer_value: "мама", sound_path: "/sounds/family/sentences/uk/мама.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_mother`], language_id: languageMap.ru, value: "Это моя {{answer}}. Ее зовут Джейн.", answer_value: "мама", sound_path: "/sounds/family/sentences/ru/мама.mp3" },

    // father
    { content_id: contentMap[`${categoryMap.family}_sentence_father`], language_id: languageMap.en, value: "This is my {{answer}}. His name is John.", answer_value: "father", sound_path: "/sounds/family/sentences/en/father.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_father`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on John.", answer_value: "isä", sound_path: "/sounds/family/sentences/fi/isä.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_father`], language_id: languageMap.uk, value: "Це мій {{answer}}. Його звати Джон.", answer_value: "тато", sound_path: "/sounds/family/sentences/uk/тато.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_father`], language_id: languageMap.ru, value: "Это мой {{answer}}. Его зовут Джон.", answer_value: "папа", sound_path: "/sounds/family/sentences/ru/папа.mp3" },

    // son
    { content_id: contentMap[`${categoryMap.family}_sentence_son`], language_id: languageMap.en, value: "This is my {{answer}}. His name is Mikael.", answer_value: "son", sound_path: "/sounds/family/sentences/en/son.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_son`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Mikael.", answer_value: "poika", sound_path: "/sounds/family/sentences/fi/poika.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_son`], language_id: languageMap.uk, value: "Це мій {{answer}}. Його звати Мікаель.", answer_value: "син", sound_path: "/sounds/family/sentences/uk/син.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_son`], language_id: languageMap.ru, value: "Это мой {{answer}}. Его зовут Микаэль.", answer_value: "сын", sound_path: "/sounds/family/sentences/ru/сын.mp3" },

    // daughter
    { content_id: contentMap[`${categoryMap.family}_sentence_daughter`], language_id: languageMap.en, value: "This is my {{answer}}. Her name is Penny.", answer_value: "daughter", sound_path: "/sounds/family/sentences/en/daughter.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_daughter`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Penny.", answer_value: "tytär", sound_path: "/sounds/family/sentences/fi/tytär.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_daughter`], language_id: languageMap.uk, value: "Це моя {{answer}}. Її звати Пенні.", answer_value: "донька", sound_path: "/sounds/family/sentences/uk/донька.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_daughter`], language_id: languageMap.ru, value: "Это моя {{answer}}. Ее зовут Пенни.", answer_value: "дочь", sound_path: "/sounds/family/sentences/ru/дочь.mp3" },

    // sister
    { content_id: contentMap[`${categoryMap.family}_sentence_sister`], language_id: languageMap.en, value: "This is my {{answer}}. Her name is Johanna.", answer_value: "sister", sound_path: "/sounds/family/sentences/en/sister.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_sister`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Johanna.", answer_value: "sisko", sound_path: "/sounds/family/sentences/fi/sisko.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_sister`], language_id: languageMap.uk, value: "Це моя {{answer}}. Її звати Йоганна.", answer_value: "сестра", sound_path: "/sounds/family/sentences/uk/сестра.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_sister`], language_id: languageMap.ru, value: "Это моя {{answer}}. Её зовут Йоханна.", answer_value: "сестра", sound_path: "/sounds/family/sentences/ru/сестра.mp3" },

    // brother
    { content_id: contentMap[`${categoryMap.family}_sentence_brother`], language_id: languageMap.en, value: "This is my {{answer}}. His name is Jack.", answer_value: "brother", sound_path: "/sounds/family/sentences/en/brother.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_brother`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Jack.", answer_value: "veli", sound_path: "/sounds/family/sentences/fi/veli.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_brother`], language_id: languageMap.uk, value: "Це мій {{answer}}. Його звати Джек.", answer_value: "брат", sound_path: "/sounds/family/sentences/uk/брат.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_brother`], language_id: languageMap.ru, value: "Это мой {{answer}}. Его зовут Джек.", answer_value: "брат", sound_path: "/sounds/family/sentences/ru/брат.mp3" },

    // grandmother
    { content_id: contentMap[`${categoryMap.family}_sentence_grandmother`], language_id: languageMap.en, value: "This is my {{answer}}. Her name is Lily.", answer_value: "grandmother", sound_path: "/sounds/family/sentences/en/grandmother.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_grandmother`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Lily.", answer_value: "isoäiti", sound_path: "/sounds/family/sentences/fi/isoäiti.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_grandmother`], language_id: languageMap.uk, value: "Це моя {{answer}}. Її звати Лілі.", answer_value: "бабуся", sound_path: "/sounds/family/sentences/uk/бабуся.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_grandmother`], language_id: languageMap.ru, value: "Это моя {{answer}}. Ее зовут Лили.", answer_value: "бабушка", sound_path: "/sounds/family/sentences/ru/бабушка.mp3" },

    // grandfather
    { content_id: contentMap[`${categoryMap.family}_sentence_grandfather`], language_id: languageMap.en, value: "This is my {{answer}}. His name is Leonard.", answer_value: "grandfather", sound_path: "/sounds/family/sentences/en/grandfather.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_grandfather`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Leonard.", answer_value: "isoisä", sound_path: "/sounds/family/sentences/fi/isoisä.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_grandfather`], language_id: languageMap.uk, value: "Це мій {{answer}}. Його звати Леонард.", answer_value: "дідусь", sound_path: "/sounds/family/sentences/uk/дідусь.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_grandfather`], language_id: languageMap.ru, value: "Это мой {{answer}}. Его зовут Леонард.", answer_value: "дедушка", sound_path: "/sounds/family/sentences/ru/дедушка.mp3" },

    // aunt
    { content_id: contentMap[`${categoryMap.family}_sentence_aunt`], language_id: languageMap.en, value: "This is my {{answer}}. Her name is Emily.", answer_value: "aunt", sound_path: "/sounds/family/sentences/en/aunt.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_aunt`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Emily.", answer_value: "täti", sound_path: "/sounds/family/sentences/fi/täti.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_aunt`], language_id: languageMap.uk, value: "Це моя {{answer}}. Її звати Емілі.", answer_value: "тітка", sound_path: "/sounds/family/sentences/uk/тітка.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_aunt`], language_id: languageMap.ru, value: "Это моя {{answer}}. Её зовут Эмили.", answer_value: "тетя", sound_path: "/sounds/family/sentences/ru/тетя.mp3" },

    // uncle
    { content_id: contentMap[`${categoryMap.family}_sentence_uncle`], language_id: languageMap.en, value: "This is my {{answer}}. His name is Bill.", answer_value: "uncle", sound_path: "/sounds/family/sentences/en/uncle.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_uncle`], language_id: languageMap.fi, value: "Tämä on minun {{answer}}. Hänen nimi on Bill.", answer_value: "setä", sound_path: "/sounds/family/sentences/fi/eno_setä.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_uncle`], language_id: languageMap.uk, value: "Це мій {{answer}}. Його звати Білл.", answer_value: "дядько", sound_path: "/sounds/family/sentences/uk/дядько.mp3" },
    { content_id: contentMap[`${categoryMap.family}_sentence_uncle`], language_id: languageMap.ru, value: "Это мой {{answer}}. Его зовут Билл.", answer_value: "дядя", sound_path: "/sounds/family/sentences/ru/дядя.mp3" },

    // FAMILY (TEXT)
    // English
    { 
      content_id: contentMap[`${categoryMap.family}_text_family`], 
      language_id: languageMap.en, 
      value: "Hi! My name is Emma. I have a big family. This is my mother. Her name is Jane. This is my father. His name is John. This is my brother. His name is Mikael. This is my sister. Her name is Penny. This is my grandmother. Her name is Lily. This is my grandfather. His name is Leonard. This is my aunt. Her name is Emily. This is my uncle. His name is Bill. I love my family.", 
      sound_path: "/sounds/family/text/en_family.mp3",
      title: "My family"  
    },
    // Finnish
    { 
      content_id: contentMap[`${categoryMap.family}_text_family`], 
      language_id: languageMap.fi, 
      value: "Hei! Minun nimi on Emma. Minulla on suuri perhe. Tämä on minun äiti. Hänen nimi on Jane. Tämä on minun isä. Hänen nimi on John. Tämä on minun veli. Hänen nimi on Mikael. Tämä on minun sisko. Hänen nimi on Penny. Tämä on minun isoäiti. Hänen nimi on Lily. Tämä on minun isoisä. Hänen nimi on Leonard. Tämä on minun täti. Hänen nimi on Emily. Tämä on minun setä. Hänen nimi on Bill. Rakastan minun perhettä.", 
      sound_path: "/sounds/family/text/fi_family.mp3",
      title: "Minun perhe" 
    },
    // Ukrainian
    { 
      content_id: contentMap[`${categoryMap.family}_text_family`], 
      language_id: languageMap.uk, 
      value: "Привіт! Мене звати Емма. У мене велика родина. Це моя мама. Її звати Джейн. Це мій батько. Його звати Джон. Це мій брат. Його звати Мікаель. Це моя сестра. Її звати Пенні. Це моя бабуся. Її звати Лілі. Це мій дідусь. Його звати Леонард. Це моя тітка. Її звати Емілі. Це мій дядько. Його звати Білл. Я люблю свою сім'ю.", 
      sound_path: "/sounds/family/text/uk_family.mp3",
      title: "Моя сім'я" 
    },
    // Russian
    { 
      content_id: contentMap[`${categoryMap.family}_text_family`], 
      language_id: languageMap.ru, 
      value: "Привет! Меня зовут Эмма. У меня большая семья. Это моя мама. Ее зовут Джейн. Это мой отец. Его зовут Джон. Это мой брат. Его зовут Микаэль. Это моя сестра. Ее зовут Пенни. Это моя бабушка. Ее зовут Лили. Это мой дедушка. Его зовут Леонард. Это моя тетя. Ее зовут Эмили. Это мой дядя. Его зовут Билл. Я люблю свою семью.", 
      sound_path: "/sounds/family/text/ru_family.mp3",
      title: "Моя семья"
    },
  ])
  .onConflict(["content_id", "language_id"])
  .merge([
    "value",
    "answer_value",
    "sound_path",
    "title",
  ]);
};