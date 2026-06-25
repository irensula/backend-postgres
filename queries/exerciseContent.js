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
      )
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
        `MAX(CASE WHEN ct.language_id = ? THEN ct.value END) as study`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN at.language_id = ? THEN at.value END) as answer`,
        [course.language_id]
      ),
      knex.raw(
        `MAX(CASE WHEN ct.language_id = ? THEN ct.sound_path END) as study_sound`,
        [course.language_id]
      )
    );
};

module.exports = {
  buildWordQuery,
  buildSentenceQuery
};