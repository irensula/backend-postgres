/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {  
  const languages = await knex("languages")
    .select("language_id", "code");

  const categories = await knex("categories")
    .select("category_id", "slug");

  const languageMap = Object.fromEntries(
    languages.map((language) => [
      language.code,
      language.language_id,
    ])
  );

  const categoryMap = Object.fromEntries(
    categories.map((category) => [
      category.slug,
      category.category_id,
    ])
  );

  await knex("category_translations")
    .insert([
      // Family
      {
        category_id: categoryMap.family,
        language_id: languageMap.en,
        name: "Family",
      },
      {
        category_id: categoryMap.family,
        language_id: languageMap.fi,
        name: "Perhe",
      },
      {
        category_id: categoryMap.family,
        language_id: languageMap.uk,
        name: "Сім'я",
      },
      {
        category_id: categoryMap.family,
        language_id: languageMap.ru,
        name: "Семья",
      },

      // School
      {
        category_id: categoryMap.school,
        language_id: languageMap.en,
        name: "School",
      },
      {
        category_id: categoryMap.school,
        language_id: languageMap.fi,
        name: "Koulu",
      },
      {
        category_id: categoryMap.school,
        language_id: languageMap.uk,
        name: "Школа",
      },
      {
        category_id: categoryMap.school,
        language_id: languageMap.ru,
        name: "Школа",
      },

      // Food
      {
        category_id: categoryMap.food,
        language_id: languageMap.en,
        name: "Food",
      },
      {
        category_id: categoryMap.food,
        language_id: languageMap.fi,
        name: "Ruoka",
      },
      {
        category_id: categoryMap.food,
        language_id: languageMap.uk,
        name: "Їжа",
      },
      {
        category_id: categoryMap.food,
        language_id: languageMap.ru,
        name: "Еда",
      },

      // Transport
      {
        category_id: categoryMap.transport,
        language_id: languageMap.en,
        name: "Transport",
      },
      {
        category_id: categoryMap.transport,
        language_id: languageMap.fi,
        name: "Liikenne",
      },
      {
        category_id: categoryMap.transport,
        language_id: languageMap.uk,
        name: "Транспорт",
      },
      {
        category_id: categoryMap.transport,
        language_id: languageMap.ru,
        name: "Транспорт",
      },

      // Numbers
      {
        category_id: categoryMap.numbers,
        language_id: languageMap.en,
        name: "Numbers",
      },
      {
        category_id: categoryMap.numbers,
        language_id: languageMap.fi,
        name: "Numerot",
      },
      {
        category_id: categoryMap.numbers,
        language_id: languageMap.uk,
        name: "Числа",
      },
      {
        category_id: categoryMap.numbers,
        language_id: languageMap.ru,
        name: "Числа",
      },
      
      // Colors
      {
        category_id: categoryMap.colors,
        language_id: languageMap.en,
        name: "Colors",
      },
      {
        category_id: categoryMap.colors,
        language_id: languageMap.fi,
        name: "Värit",
      },
      {
        category_id: categoryMap.colors,
        language_id: languageMap.uk,
        name: "Кольори",
      },
      {
        category_id: categoryMap.colors,
        language_id: languageMap.ru,
        name: "Цвета",
      },

      // Animals
      {
        category_id: categoryMap.animals,
        language_id: languageMap.en,
        name: "Animals",
      },
      {
        category_id: categoryMap.animals,
        language_id: languageMap.fi,
        name: "Eläimet",
      },
      {
        category_id: categoryMap.animals,
        language_id: languageMap.uk,
        name: "Тварини",
      },
      {
        category_id: categoryMap.animals,
        language_id: languageMap.ru,
        name: "Животные",
      },

      // Days
      {
        category_id: categoryMap.days,
        language_id: languageMap.en,
        name: "Days",
      },
      {
        category_id: categoryMap.days,
        language_id: languageMap.fi,
        name: "Päivät",
      },
      {
        category_id: categoryMap.days,
        language_id: languageMap.uk,
        name: "Дні",
      },
      {
        category_id: categoryMap.days,
        language_id: languageMap.ru,
        name: "Дни",
      },

      // Months
      {
        category_id: categoryMap.months,
        language_id: languageMap.en,
        name: "Months",
      },
      {
        category_id: categoryMap.months,
        language_id: languageMap.fi,
        name: "Kuukaudet",
      },
      {
        category_id: categoryMap.months,
        language_id: languageMap.uk,
        name: "Місяці",
      },
      {
        category_id: categoryMap.months,
        language_id: languageMap.ru,
        name: "Месяцы",
      },

      // Nature
      {
        category_id: categoryMap.nature,
        language_id: languageMap.en,
        name: "Nature",
      },
      {
        category_id: categoryMap.nature,
        language_id: languageMap.fi,
        name: "Luonto",
      },
      {
        category_id: categoryMap.nature,
        language_id: languageMap.uk,
        name: "Природа",
      },
      {
        category_id: categoryMap.nature,
        language_id: languageMap.ru,
        name: "Природа",
      }
    ])
    .onConflict(["category_id", "language_id"])
    .merge(["name"]);
};