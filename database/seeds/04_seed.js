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

    // TRANSPORT
    { type: "word", image_path: "/images/transport/transport.png", category_id: categories[3].category_id, }, // 79
    { type: "word", image_path: "/images/transport/bicycle.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/car.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/bus.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/trolleybus.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/metro.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/train.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/airplane.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/helicopter.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/motorcycle.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/road.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/sidewalk.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/crosswalk.png", category_id: categories[3].category_id, },
    { type: "word", image_path: "/images/transport/traffic_light.png", category_id: categories[3].category_id, }, // 92

    { type: "sentence", image_path: "/images/transport/transport.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/bicycle.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/car.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/bus.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/trolleybus.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/metro.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/train.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/airplane.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/helicopter.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/motorcycle.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/road.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/sidewalk.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/crosswalk.png", category_id: categories[3].category_id, },
    { type: "sentence", image_path: "/images/transport/traffic_light.png", category_id: categories[3].category_id, }, // 106

    { type: "text", image_path: "/images/texts/transport_image.png", category_id: categories[3].category_id, }, // 107 
    
  ]).returning('*');
  // 11. CONTENT TRANSLATIONS
  const content_translations = await knex('content_translations').insert([

    // TRANSPORT (WORDS)

    // transport
    { content_id: content[0].content_id, language_id: languageMap.en.language_id, value: "transport", sound_path: "/sounds/transport/words/en/transport.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.fi.language_id, value: "liikenne", sound_path: "/sounds/transport/words/fi/liikenne.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.uk.language_id, value: "транспорт", sound_path: "/sounds/transport/words/uk/транспорт.mp3" },
    { content_id: content[0].content_id, language_id: languageMap.ru.language_id, value: "транспорт", sound_path: "/sounds/transport/words/ru/транспорт.mp3" },

    // bicycle
    { content_id: content[1].content_id, language_id: languageMap.en.language_id, value: "bicycle", sound_path: "/sounds/transport/words/en/bicycle.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.fi.language_id, value: "polkupyörä", sound_path: "/sounds/transport/words/fi/polkupyörä.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.uk.language_id, value: "велосипед", sound_path: "/sounds/transport/words/uk/велосипед.mp3" },
    { content_id: content[1].content_id, language_id: languageMap.ru.language_id, value: "велосипед", sound_path: "/sounds/transport/words/ru/велосипед.mp3" },

    // car
    { content_id: content[2].content_id, language_id: languageMap.en.language_id, value: "car", sound_path: "/sounds/transport/words/en/car.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.fi.language_id, value: "auto", sound_path: "/sounds/transport/words/fi/auto.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.uk.language_id, value: "автомобіль", sound_path: "/sounds/transport/words/uk/автомобіль.mp3" },
    { content_id: content[2].content_id, language_id: languageMap.ru.language_id, value: "машина", sound_path: "/sounds/transport/words/ru/машина.mp3" },

    // bus
    { content_id: content[3].content_id, language_id: languageMap.en.language_id, value: "bus", sound_path: "/sounds/transport/words/en/bus.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.fi.language_id, value: "bussi", sound_path: "/sounds/transport/words/fi/bussi.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.uk.language_id, value: "автобус", sound_path: "/sounds/transport/words/uk/автобус.mp3" },
    { content_id: content[3].content_id, language_id: languageMap.ru.language_id, value: "автобус", sound_path: "/sounds/transport/words/ru/автобус.mp3" },

    // trolleybus
    { content_id: content[4].content_id, language_id: languageMap.en.language_id, value: "trolleybus", sound_path: "/sounds/transport/words/en/trolleybus.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.fi.language_id, value: "johdinauto", sound_path: "/sounds/transport/words/fi/johdinauto.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.uk.language_id, value: "тролейбус", sound_path: "/sounds/transport/words/uk/тролейбус.mp3" },
    { content_id: content[4].content_id, language_id: languageMap.ru.language_id, value: "троллейбус", sound_path: "/sounds/transport/words/ru/троллейбус.mp3" },

    // metro
    { content_id: content[5].content_id, language_id: languageMap.en.language_id, value: "metro", sound_path: "/sounds/transport/words/en/metro.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.fi.language_id, value: "metro", sound_path: "/sounds/transport/words/fi/metro.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.uk.language_id, value: "метро", sound_path: "/sounds/transport/words/uk/метро.mp3" },
    { content_id: content[5].content_id, language_id: languageMap.ru.language_id, value: "метро", sound_path: "/sounds/transport/words/ru/метро.mp3" },

    // train
    { content_id: content[6].content_id, language_id: languageMap.en.language_id, value: "train", sound_path: "/sounds/transport/words/en/train.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.fi.language_id, value: "juna", sound_path: "/sounds/transport/words/fi/juna.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.uk.language_id, value: "потяг", sound_path: "/sounds/transport/words/uk/потяг.mp3" },
    { content_id: content[6].content_id, language_id: languageMap.ru.language_id, value: "поезд", sound_path: "/sounds/transport/words/ru/поезд.mp3" },

    // airplane
    { content_id: content[7].content_id, language_id: languageMap.en.language_id, value: "airplane", sound_path: "/sounds/transport/words/en/airplane.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.fi.language_id, value: "lentokone", sound_path: "/sounds/transport/words/fi/lentokone.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.uk.language_id, value: "літак", sound_path: "/sounds/transport/words/uk/літак.mp3" },
    { content_id: content[7].content_id, language_id: languageMap.ru.language_id, value: "самолёт", sound_path: "/sounds/transport/words/ru/самолёт.mp3" },

    // helicopter
    { content_id: content[8].content_id, language_id: languageMap.en.language_id, value: "helicopter", sound_path: "/sounds/transport/words/en/helicopter.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.fi.language_id, value: "helikopteri", sound_path: "/sounds/transport/words/fi/helikopteri.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.uk.language_id, value: "гелікоптер", sound_path: "/sounds/transport/words/uk/гелікоптер.mp3" },
    { content_id: content[8].content_id, language_id: languageMap.ru.language_id, value: "вертолёт", sound_path: "/sounds/transport/words/ru/вертолёт.mp3" },

    // motorcycle
    { content_id: content[9].content_id, language_id: languageMap.en.language_id, value: "motorcycle", sound_path: "/sounds/transport/words/en/motorcycle.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.fi.language_id, value: "moottoripyörä", sound_path: "/sounds/transport/words/fi/moottoripyörä.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.uk.language_id, value: "мотоцикл", sound_path: "/sounds/transport/words/uk/мотоцикл.mp3" },
    { content_id: content[9].content_id, language_id: languageMap.ru.language_id, value: "мотоцикл", sound_path: "/sounds/transport/words/ru/мотоцикл.mp3" },

    // road
    { content_id: content[10].content_id, language_id: languageMap.en.language_id, value: "road", sound_path: "/sounds/transport/words/en/road.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.fi.language_id, value: "tie", sound_path: "/sounds/transport/words/fi/tie.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.uk.language_id, value: "дорога", sound_path: "/sounds/transport/words/uk/дорога.mp3" },
    { content_id: content[10].content_id, language_id: languageMap.ru.language_id, value: "дорога", sound_path: "/sounds/transport/words/ru/дорога.mp3" },

    // sidewalk
    { content_id: content[11].content_id, language_id: languageMap.en.language_id, value: "sidewalk", sound_path: "/sounds/transport/words/en/sidewalk.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.fi.language_id, value: "jalkakäytävä", sound_path: "/sounds/transport/words/fi/jalkakäytävä.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.uk.language_id, value: "тротуар", sound_path: "/sounds/transport/words/uk/тротуар.mp3" },
    { content_id: content[11].content_id, language_id: languageMap.ru.language_id, value: "тротуар", sound_path: "/sounds/transport/words/ru/тротуар.mp3" },

    // crosswalk
    { content_id: content[12].content_id, language_id: languageMap.en.language_id, value: "crosswalk", sound_path: "/sounds/transport/words/en/crosswalk.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.fi.language_id, value: "suojatie", sound_path: "/sounds/transport/words/fi/suojatie.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.uk.language_id, value: "пішохідний перехід", sound_path: "/sounds/transport/words/uk/пішохідний_перехід.mp3" },
    { content_id: content[12].content_id, language_id: languageMap.ru.language_id, value: "пешеходный переход", sound_path: "/sounds/transport/words/ru/пешеходный_переход.mp3" },

    // traffic light
    { content_id: content[13].content_id, language_id: languageMap.en.language_id, value: "traffic light", sound_path: "/sounds/transport/words/en/traffic_light.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.fi.language_id, value: "liikennevalo", sound_path: "/sounds/transport/words/fi/liikennevalo.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.uk.language_id, value: "світлофор", sound_path: "/sounds/transport/words/uk/світлофор.mp3" },
    { content_id: content[13].content_id, language_id: languageMap.ru.language_id, value: "светофор", sound_path: "/sounds/transport/words/ru/светофор.mp3" },

    // TRANSPORT (SENTENCES)

    // transport
    { content_id: content[14].content_id, language_id: languageMap.en.language_id, value: "We use {{answer}} every day.", answer_value: "transport", sound_path: "/sounds/transport/sentences/en/transport.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.fi.language_id, value: "Käytämme {{answer}} joka päivä.", answer_value: "liikennettä", sound_path: "/sounds/transport/sentences/fi/liikenne.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.uk.language_id, value: "Ми користуємося {{answer}} щодня.", answer_value: "транспортом", sound_path: "/sounds/transport/sentences/uk/транспорт.mp3" },
    { content_id: content[14].content_id, language_id: languageMap.ru.language_id, value: "Мы пользуемся {{answer}} каждый день.", answer_value: "транспортом", sound_path: "/sounds/transport/sentences/ru/транспорт.mp3" },

    // bicycle
    { content_id: content[15].content_id, language_id: languageMap.en.language_id, value: "I ride my {{answer}} to school.", answer_value: "bicycle", sound_path: "/sounds/transport/sentences/en/bicycle.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.fi.language_id, value: "Menen kouluun {{answer}}.", answer_value: "polkupyörällä", sound_path: "/sounds/transport/sentences/fi/polkupyörä.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.uk.language_id, value: "Я їду до школи на {{answer}}.", answer_value: "велосипеді", sound_path: "/sounds/transport/sentences/uk/велосипед.mp3" },
    { content_id: content[15].content_id, language_id: languageMap.ru.language_id, value: "Я езжу в школу на {{answer}}.", answer_value: "велосипеде", sound_path: "/sounds/transport/sentences/ru/велосипед.mp3" },

    // car
    { content_id: content[16].content_id, language_id: languageMap.en.language_id, value: "My father goes by {{answer}}.", answer_value: "car", sound_path: "/sounds/transport/sentences/en/car.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.fi.language_id, value: "Isäni menee {{answer}}.", answer_value: "autolla", sound_path: "/sounds/transport/sentences/fi/auto.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.uk.language_id, value: "Мій тато їде на {{answer}}.", answer_value: "машині", sound_path: "/sounds/transport/sentences/uk/автомобіль.mp3" },
    { content_id: content[16].content_id, language_id: languageMap.ru.language_id, value: "Мой папа ездит на {{answer}}.", answer_value: "машине", sound_path: "/sounds/transport/sentences/ru/машина.mp3" },

    // bus
    { content_id: content[17].content_id, language_id: languageMap.en.language_id, value: "My mother goes by {{answer}}.", answer_value: "bus", sound_path: "/sounds/transport/sentences/en/bus.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.fi.language_id, value: "Äitini menee {{answer}}.", answer_value: "bussilla", sound_path: "/sounds/transport/sentences/fi/bussi.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.uk.language_id, value: "Моя мама їде {{answer}}.", answer_value: "автобусом", sound_path: "/sounds/transport/sentences/uk/автобус.mp3" },
    { content_id: content[17].content_id, language_id: languageMap.ru.language_id, value: "Моя мама ездит на {{answer}}.", answer_value: "автобусе", sound_path: "/sounds/transport/sentences/ru/автобус.mp3" },

    // trolleybus
    { content_id: content[18].content_id, language_id: languageMap.en.language_id, value: "My sister goes by {{answer}}.", answer_value: "trolleybus", sound_path: "/sounds/transport/sentences/en/trolleybus.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.fi.language_id, value: "Siskoni menee {{answer}}.", answer_value: "johdinautolla", sound_path: "/sounds/transport/sentences/fi/johdinauto.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.uk.language_id, value: "Моя сестра їде {{answer}}.", answer_value: "тролейбусом", sound_path: "/sounds/transport/sentences/uk/тролейбус.mp3" },
    { content_id: content[18].content_id, language_id: languageMap.ru.language_id, value: "Моя сестра ездит на {{answer}}.", answer_value: "троллейбусе", sound_path: "/sounds/transport/sentences/ru/троллейбус.mp3" },

    // metro
    { content_id: content[19].content_id, language_id: languageMap.en.language_id, value: "My brother goes by {{answer}}.", answer_value: "metro", sound_path: "/sounds/transport/sentences/en/metro.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.fi.language_id, value: "Veljeni menee {{answer}}.", answer_value: "metrolla", sound_path: "/sounds/transport/sentences/fi/metro.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.uk.language_id, value: "Мій брат їде {{answer}}.", answer_value: "метро", sound_path: "/sounds/transport/sentences/uk/метро.mp3" },
    { content_id: content[19].content_id, language_id: languageMap.ru.language_id, value: "Мой брат ездит на {{answer}}.", answer_value: "метро", sound_path: "/sounds/transport/sentences/ru/метро.mp3" },

    // train
    { content_id: content[20].content_id, language_id: languageMap.en.language_id, value: "My family travels by {{answer}}.", answer_value: "train", sound_path: "/sounds/transport/sentences/en/train.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.fi.language_id, value: "Minun perhe matkustaa {{answer}}.", answer_value: "junalla", sound_path: "/sounds/transport/sentences/fi/juna.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.uk.language_id, value: "Моя сім'я подорожує {{answer}}.", answer_value: "потягом", sound_path: "/sounds/transport/sentences/uk/потяг.mp3" },
    { content_id: content[20].content_id, language_id: languageMap.ru.language_id, value: "Моя семья путешествует на {{answer}}.", answer_value: "поезде", sound_path: "/sounds/transport/sentences/ru/поезд.mp3" },

    // airplane
    { content_id: content[21].content_id, language_id: languageMap.en.language_id, value: "We travel by {{answer}}.", answer_value: "airplane", sound_path: "/sounds/transport/sentences/en/airplane.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.fi.language_id, value: "Me matkustamme {{answer}}.", answer_value: "lentokoneella", sound_path: "/sounds/transport/sentences/fi/lentokone.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.uk.language_id, value: "Ми подорожуємо {{answer}}.", answer_value: "літаком", sound_path: "/sounds/transport/sentences/uk/літак.mp3" },
    { content_id: content[21].content_id, language_id: languageMap.ru.language_id, value: "Мы путешествуем на {{answer}}.", answer_value: "самолёте", sound_path: "/sounds/transport/sentences/ru/самолёт.mp3" },

    // helicopter
    { content_id: content[22].content_id, language_id: languageMap.en.language_id, value: "My father travels by {{answer}}.", answer_value: "helicopter", sound_path: "/sounds/transport/sentences/en/helicopter.mp3" },
    { content_id: content[22].content_id, language_id: languageMap.fi.language_id, value: "Isäni matkustaa {{answer}}.", answer_value: "helikopterilla", sound_path: "/sounds/transport/sentences/fi/helikopteri.mp3" },
    { content_id: content[22].content_id, language_id: languageMap.uk.language_id, value: "Мій тато подорожує {{answer}}.", answer_value: "гелікоптером", sound_path: "/sounds/transport/sentences/uk/гелікоптер.mp3" },
    { content_id: content[22].content_id, language_id: languageMap.ru.language_id, value: "Мой папа путешествует на {{answer}}.", answer_value: "вертолёте", sound_path: "/sounds/transport/sentences/ru/вертолёт.mp3" },

    // motorcycle
    { content_id: content[23].content_id, language_id: languageMap.en.language_id, value: "My brother rides a {{answer}}.", answer_value: "motorcycle", sound_path: "/sounds/transport/sentences/en/motorcycle.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.fi.language_id, value: "Veljeni ajaa {{answer}}.", answer_value: "moottoripyörällä", sound_path: "/sounds/transport/sentences/fi/moottoripyörä.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.uk.language_id, value: "Мій брат їздить на {{answer}}.", answer_value: "мотоциклі", sound_path: "/sounds/transport/sentences/uk/мотоцикл.mp3" },
    { content_id: content[23].content_id, language_id: languageMap.ru.language_id, value: "Мой брат ездит на {{answer}}.", answer_value: "мотоцикле", sound_path: "/sounds/transport/sentences/ru/мотоцикл.mp3" },

    // road
    { content_id: content[24].content_id, language_id: languageMap.en.language_id, value: "The car is on the {{answer}}.", answer_value: "road", sound_path: "/sounds/transport/sentences/en/road.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.fi.language_id, value: "Auto on {{answer}}.", answer_value: "tiellä", sound_path: "/sounds/transport/sentences/fi/tie.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.uk.language_id, value: "Машина на {{answer}}.", answer_value: "дорозі", sound_path: "/sounds/transport/sentences/uk/дорога.mp3" },
    { content_id: content[24].content_id, language_id: languageMap.ru.language_id, value: "Машина на {{answer}}.", answer_value: "дороге", sound_path: "/sounds/transport/sentences/ru/дорога.mp3" },

    // sidewalk
    { content_id: content[25].content_id, language_id: languageMap.en.language_id, value: "I walk on the {{answer}}.", answer_value: "sidewalk", sound_path: "/sounds/transport/sentences/en/sidewalk.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.fi.language_id, value: "Kävelen {{answer}}.", answer_value: "jalkakäytävällä", sound_path: "/sounds/transport/sentences/fi/jalkakäytävä.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.uk.language_id, value: "Я йду {{answer}}.", answer_value: "тротуаром", sound_path: "/sounds/transport/sentences/uk/тротуар.mp3" },
    { content_id: content[25].content_id, language_id: languageMap.ru.language_id, value: "Я иду по {{answer}}.", answer_value: "тротуару", sound_path: "/sounds/transport/sentences/ru/тротуар.mp3" },

    // crosswalk
    { content_id: content[26].content_id, language_id: languageMap.en.language_id, value: "We cross the road at the {{answer}}.", answer_value: "crosswalk", sound_path: "/sounds/transport/sentences/en/crosswalk.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.fi.language_id, value: "Ylitämme tien {{answer}}.", answer_value: "suojatietä pitkin", sound_path: "/sounds/transport/sentences/fi/suojatie.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.uk.language_id, value: "Ми переходимо дорогу на {{answer}}.", answer_value: "пішохідному переході", sound_path: "/sounds/transport/sentences/uk/пішохідний_перехід.mp3" },
    { content_id: content[26].content_id, language_id: languageMap.ru.language_id, value: "Мы переходим дорогу по {{answer}}.", answer_value: "пешеходному переходу", sound_path: "/sounds/transport/sentences/ru/пешеходный_переход.mp3" },

    // traffic light
    { content_id: content[27].content_id, language_id: languageMap.en.language_id, value: "The {{answer}} is red.", answer_value: "traffic light", sound_path: "/sounds/transport/sentences/en/traffic_light.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.fi.language_id, value: "{{answer}} on punainen.", answer_value: "Liikennevalo", sound_path: "/sounds/transport/sentences/fi/liikennevalo.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.uk.language_id, value: "{{answer}} червоний.", answer_value: "Світлофор", sound_path: "/sounds/transport/sentences/uk/світлофор.mp3" },
    { content_id: content[27].content_id, language_id: languageMap.ru.language_id, value: "{{answer}} красный.", answer_value: "Светофор", sound_path: "/sounds/transport/sentences/ru/светофор.mp3" },

    // TRANSPORT (TEXT)

    // English
    {
      content_id: content[28].content_id,
      language_id: languageMap.en.language_id,
      value: "We use transport every day. I go to school by bicycle. My father goes to work by car, and my mother goes to work by bus. My aunt goes to work by trolleybus. My uncle goes to work by metro. Sometimes my family travels by train or airplane. My grandfather likes to travel by helicopter. My brother rides a motorcycle. We walk on the sidewalk and cross the road at the crosswalk. We stop when the traffic light is red. I like travelling with my family.",
      sound_path: "/sounds/transport/text/en_transport.mp3",
      title: "Transport"
    },

    // Finnish
    {
      content_id: content[28].content_id,
      language_id: languageMap.fi.language_id,
      value: "Käytämme kulkuvälineitä joka päivä. Menen kouluun polkupyörällä. Minun isä menee töihin autolla, ja minun äiti menee töihin bussilla. Täti menee töihin raitiovaunulla. Setä menee töihin metrolla. Joskus meidän perhee matkustaa junalla tai lentokoneella. Isoisä matkustaa mielellään helikopterilla. Veli ajaa moottoripyörällä. Kävelemme jalkakäytävällä ja ylitämme tien suojatiellä. Pysähdymme, kun liikennevalo on punainen. Pidän matkustamisesta minun perheen kanssa.",
      sound_path: "/sounds/transport/text/fi_transport.mp3",
      title: "Liikenne"
    },

    // Ukrainian
    {
      content_id: content[28].content_id,
      language_id: languageMap.uk.language_id,
      value: "Ми користуємося транспортом щодня. Я їду до школи на велосипеді. Мій тато їде на роботу машиною, а моя мама їде на роботу автобусом. Моя тітка їде на роботу тролейбусом. Мій дядько їде на роботу метро. Іноді моя сім'я подорожує потягом або літаком. Мій дідусь любить подорожувати гелікоптером. Мій брат їздить на мотоциклі. Ми ходимо тротуаром і переходимо дорогу на пішохідному переході. Ми зупиняємося, коли світлофор червоний. Я люблю подорожувати зі своєю сім'єю.",
      sound_path: "/sounds/transport/text/uk_transport.mp3",
      title: "Транспорт"
    },

    // Russian
    {
      content_id: content[28].content_id,
      language_id: languageMap.ru.language_id,
      value: "Мы пользуемся транспортом каждый день. Я езжу в школу на велосипеде. Мой папа ездит на работу на машине, а моя мама ездит на работу на автобусе. Моя тётя ездит на работу на троллейбусе. Мой дядя ездит на работу на метро. Иногда моя семья путешествует на поезде или самолёте. Мой дедушка любит путешествовать на вертолёте. Мой брат ездит на мотоцикле. Мы ходим по тротуару и переходим дорогу по пешеходному переходу. Мы останавливаемся, когда светофор красный. Я люблю путешествовать со своей семьёй.",
      sound_path: "/sounds/transport/text/ru_transport.mp3",
      title: "Еда"
    },
  ]).returning('*');
};