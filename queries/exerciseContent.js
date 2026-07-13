const buildWordQuery = ({ knex, course, categoryId }) => {
  return knex("content as c")
    .join("content_translations as t", "t.content_id", "c.content_id")
    .where("c.category_id", categoryId)
    .where("c.type", "word")
    .groupBy("c.content_id", "c.type")
    .select(
      "c.content_id",
      "c.type",
      "c.image_path",
      knex.raw(
        `MAX(CASE WHEN t.language_id = ? THEN t.value END) as study`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN t.language_id = ? THEN t.sound_path END) as study_sound`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN t.language_id = ? THEN t.value END) as translation`,
        [course.translation_language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN t.language_id = ? THEN t.sound_path END) as translation_sound`,
        [course.translation_language_id]
      ),
    );
};

const buildSentenceQuery = ({ knex, course, categoryId }) => {
  return knex("content as sentence")
    // sentence - answer pivot
    .leftJoin(
      "sentence_answers as sa",
      "sa.sentence_content_id",
      "sentence.content_id"
    )

    // correct answer word
    .leftJoin(
      "content as answer",
      "answer.content_id",
      "sa.correct_word_content_id"
    )

    // sentence translations
    .leftJoin(
      "content_translations as ct",
      "ct.content_id",
      "sentence.content_id"
    )

    // answer word translations
    .leftJoin(
      "content_translations as at",
      "at.content_id",
      "answer.content_id"
    )

    .where("sentence.category_id", categoryId)
    .where("sentence.type", "sentence")

    .groupBy(
      "sentence.content_id",
      "answer.content_id"
    )

    .select(
      "sentence.content_id",
      "sentence.type",
      "sentence.image_path",

      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.value END) as study_sentence`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN at.language_id = ? THEN at.value END) as answer`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.sound_path END) as study_sound`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.value END) as translation_sentence`,
        [course.translation_language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN at.language_id = ? THEN at.value END) as translation_answer`,
        [course.translation_language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.sound_path END) as translation_sound`,
        [course.translation_language_id]
      )
    )
    .orderBy("sentence.content_id");
};

const buildWholeSentenceQuery = async ({ knex, course, categoryId }) => {
  const rows = await knex("content as sentence")
    // sentence - answer pivot
    .leftJoin("sentence_answers as sa", "sa.sentence_content_id", "sentence.content_id")

    // correct answer word
    .leftJoin("content as answer", "answer.content_id", "sa.correct_word_content_id")

    // sentence translations
    .leftJoin("content_translations as ct", "ct.content_id", "sentence.content_id")

    // answer word translations
    .leftJoin("content_translations as at", "at.content_id", "answer.content_id")

    .where("sentence.category_id", categoryId)
    .where("sentence.type", "sentence")

    .groupBy(
      "sentence.content_id",
      "answer.content_id"
    )

    .select(
      "sentence.content_id",
      "sentence.type",
      "sentence.image_path",

      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.value END) as study_sentence`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN at.language_id = ? THEN at.value END) as answer`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.sound_path END) as study_sound`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.value END) as translation_sentence`,
        [course.translation_language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN at.language_id = ? THEN at.value END) as translation_answer`,
        [course.translation_language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.sound_path END) as translation_sound`,
        [course.translation_language_id]
      )
    )
    .orderBy("sentence.content_id");

    return rows.map(row => ({
      content_id: row.content_id,
      type: row.type,
      image_path: row.image_path,

      study: row.study_sentence.replace(
        "{{answer}}",
        row.answer
      ),

      study_sound: row.study_sound,

      translation: row.translation_sentence.replace(
        "{{answer}}",
        row.translation_answer
      ),

      translation_sound: row.translation_sound,
    }));
};

const buildTextQuery = ({ knex, course, categoryId }) => {
    return knex("content")
      .join("content_translations as study", "study.content_id", "content.content_id")
      .join("content_translations as translation", "translation.content_id", "content.content_id")
      
      .where("content.category_id", categoryId)
      .where("content.type", "text")
      .where("study.language_id", course.language_id)
      .where("translation.language_id", course.translation_language_id)      
      .select(
        "content.content_id",
        "content.type",
        "content.category_id",
        "content.image_path",

        "study.title as study_title",
        "study.value as study",
        "study.sound_path as study_sound",

        "translation.title as translation_title", 
        "translation.value as translation",
        "translation.sound_path as translation_sound"
      );
};

module.exports = {
  buildWordQuery,
  buildSentenceQuery,
  buildWholeSentenceQuery,
  buildTextQuery
};