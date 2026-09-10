/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

    const categories = await knex('categories')
        .select("category_id", "slug");

    const categoryMap = Object.fromEntries(
        categories.map((category) => [
            category.slug,
            category.category_id,
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

    await knex('content').insert([
        // WORDS
        { type: "word", slug: "school", image_path: "/images/school/school.png", category_id: categoryMap.school, },
        { type: "word", slug: "classroom", image_path: "/images/school/classroom.png", category_id: categoryMap.school, },
        { type: "word", slug: "teacher", image_path: "/images/school/teacher.png", category_id: categoryMap.school, },
        { type: "word", slug: "student", image_path: "/images/school/student.png", category_id: categoryMap.school, },
        { type: "word", slug: "book", image_path: "/images/school/book.png", category_id: categoryMap.school, },
        { type: "word", slug: "notebook", image_path: "/images/school/notebook.png", category_id: categoryMap.school, },
        { type: "word", slug: "pen", image_path: "/images/school/pen.png", category_id: categoryMap.school, },
        { type: "word", slug: "pencil", image_path: "/images/school/pencil.png", category_id: categoryMap.school, },
        { type: "word", slug: "desk", image_path: "/images/school/desk.png", category_id: categoryMap.school, },
        { type: "word", slug: "lesson", image_path: "/images/school/lesson.png", category_id: categoryMap.school, },
        { type: "word", slug: "break", image_path: "/images/school/break.png", category_id: categoryMap.school, },
        // SENTENCES
        { type: "sentence", slug: "school", image_path: "/images/school/school.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "classroom", image_path: "/images/school/classroom.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "teacher", image_path: "/images/school/teacher.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "student", image_path: "/images/school/student.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "book", image_path: "/images/school/book.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "notebook", image_path: "/images/school/notebook.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "pen", image_path: "/images/school/pen.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "pencil", image_path: "/images/school/pencil.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "desk", image_path: "/images/school/desk.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "lesson", image_path: "/images/school/lesson.png", category_id: categoryMap.school, },
        { type: "sentence", slug: "break", image_path: "/images/school/break.png", category_id: categoryMap.school, },
        // TEXT
        { type: "text", slug: "school", image_path: "/images/texts/school_image.png", category_id: categoryMap.school, },
    ])
    .onConflict(["category_id", "type", "slug"])
    .merge(["image_path"]);

    const content = await knex('content')
        .select("content_id", "category_id", "type", "slug")
        .where("category_id", categoryMap.school);

    const contentMap = Object.fromEntries(
        content.map((item) => [
        `${item.category_id}_${item.type}_${item.slug}`,
        item.content_id,
        ])
    );

    await knex('content_translations').insert([
        // SCHOOL (WORDS)

        // school
        { content_id: contentMap[`${categoryMap.school}_word_school`], language_id: languageMap.en, value: "school", sound_path: "/sounds/school/words/en/school.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_school`], language_id: languageMap.fi, value: "koulu", sound_path: "/sounds/school/words/fi/koulu.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_school`], language_id: languageMap.uk, value: "школа", sound_path: "/sounds/school/words/uk/школа.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_school`], language_id: languageMap.ru, value: "школа", sound_path: "/sounds/school/words/ru/школа.mp3" },
        // classroom
        { content_id: contentMap[`${categoryMap.school}_word_classroom`], language_id: languageMap.en, value: "classroom", sound_path: "/sounds/school/words/en/classroom.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_classroom`], language_id: languageMap.fi, value: "luokkahuone", sound_path: "/sounds/school/words/fi/luokkahuone.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_classroom`], language_id: languageMap.uk, value: "клас", sound_path: "/sounds/school/words/uk/клас.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_classroom`], language_id: languageMap.ru, value: "класс", sound_path: "/sounds/school/words/ru/класс.mp3" },
        // teacher
        { content_id: contentMap[`${categoryMap.school}_word_teacher`], language_id: languageMap.en, value: "teacher", sound_path: "/sounds/school/words/en/teacher.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_teacher`], language_id: languageMap.fi, value: "opettaja", sound_path: "/sounds/school/words/fi/opettaja.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_teacher`], language_id: languageMap.uk, value: "вчитель", sound_path: "/sounds/school/words/uk/вчитель.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_teacher`], language_id: languageMap.ru, value: "учитель", sound_path: "/sounds/school/words/ru/учитель.mp3" },
        // student
        { content_id: contentMap[`${categoryMap.school}_word_student`], language_id: languageMap.en, value: "student", sound_path: "/sounds/school/words/en/student.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_student`], language_id: languageMap.fi, value: "oppilas", sound_path: "/sounds/school/words/fi/oppilas.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_student`], language_id: languageMap.uk, value: "учень", sound_path: "/sounds/school/words/uk/учень.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_student`], language_id: languageMap.ru, value: "ученик", sound_path: "/sounds/school/words/ru/ученик.mp3" },
        // book
        { content_id: contentMap[`${categoryMap.school}_word_book`], language_id: languageMap.en, value: "book", sound_path: "/sounds/school/words/en/book.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_book`], language_id: languageMap.fi, value: "kirja", sound_path: "/sounds/school/words/fi/kirja.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_book`], language_id: languageMap.uk, value: "книга", sound_path: "/sounds/school/words/uk/книга.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_book`], language_id: languageMap.ru, value: "книга", sound_path: "/sounds/school/words/ru/книга.mp3" },
        // notebook
        { content_id: contentMap[`${categoryMap.school}_word_notebook`], language_id: languageMap.en, value: "notebook", sound_path: "/sounds/school/words/en/notebook.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_notebook`], language_id: languageMap.fi, value: "vihko", sound_path: "/sounds/school/words/fi/vihko.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_notebook`], language_id: languageMap.uk, value: "зошит", sound_path: "/sounds/school/words/uk/зошит.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_notebook`], language_id: languageMap.ru, value: "тетрадь", sound_path: "/sounds/school/words/ru/тетрадь.mp3" },
        // pen
        { content_id: contentMap[`${categoryMap.school}_word_pen`], language_id: languageMap.en, value: "pen", sound_path: "/sounds/school/words/en/pen.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_pen`], language_id: languageMap.fi, value: "kynä", sound_path: "/sounds/school/words/fi/kynä.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_pen`], language_id: languageMap.uk, value: "ручка", sound_path: "/sounds/school/words/uk/ручка.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_pen`], language_id: languageMap.ru, value: "ручка", sound_path: "/sounds/school/words/ru/ручка.mp3" },
        // pencil
        { content_id: contentMap[`${categoryMap.school}_word_pencil`], language_id: languageMap.en, value: "pencil", sound_path: "/sounds/school/words/en/pencil.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_pencil`], language_id: languageMap.fi, value: "lyijykynä", sound_path: "/sounds/school/words/fi/lyijykynä.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_pencil`], language_id: languageMap.uk, value: "олівець", sound_path: "/sounds/school/words/uk/олівець.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_pencil`], language_id: languageMap.ru, value: "карандаш", sound_path: "/sounds/school/words/ru/карандаш.mp3" },
        // desk
        { content_id: contentMap[`${categoryMap.school}_word_desk`], language_id: languageMap.en, value: "desk", sound_path: "/sounds/school/words/en/desk.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_desk`], language_id: languageMap.fi, value: "pulpetti", sound_path: "/sounds/school/words/fi/pulpetti.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_desk`], language_id: languageMap.uk, value: "парта", sound_path: "/sounds/school/words/uk/парта.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_desk`], language_id: languageMap.ru, value: "парта", sound_path: "/sounds/school/words/ru/парта.mp3" },
        // lesson
        { content_id: contentMap[`${categoryMap.school}_word_lesson`], language_id: languageMap.en, value: "lesson", sound_path: "/sounds/school/words/en/lesson.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_lesson`], language_id: languageMap.fi, value: "oppitunti", sound_path: "/sounds/school/words/fi/oppitunti.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_lesson`], language_id: languageMap.uk, value: "урок", sound_path: "/sounds/school/words/uk/урок.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_lesson`], language_id: languageMap.ru, value: "урок", sound_path: "/sounds/school/words/ru/урок.mp3" },
        // break
        { content_id: contentMap[`${categoryMap.school}_word_break`], language_id: languageMap.en, value: "break", sound_path: "/sounds/school/words/en/break.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_break`], language_id: languageMap.fi, value: "välitunti", sound_path: "/sounds/school/words/fi/välitunti.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_break`], language_id: languageMap.uk, value: "перерва", sound_path: "/sounds/school/words/uk/перерва.mp3" },
        { content_id: contentMap[`${categoryMap.school}_word_break`], language_id: languageMap.ru, value: "перемена", sound_path: "/sounds/school/words/ru/перемена.mp3" },
        
        // SCHOOL (SENTENCES)

        // school
        { content_id: contentMap[`${categoryMap.school}_sentence_school`], language_id: languageMap.en, value: "I go to {{answer}}.", answer_value: "school", sound_path: "/sounds/school/sentences/en/school.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_school`], language_id: languageMap.fi, value: "Minä menen {{answer}}.", answer_value: "kouluun", sound_path: "/sounds/school/sentences/fi/koulu.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_school`], language_id: languageMap.uk, value: "Я ходжу до {{answer}}.", answer_value: "школи", sound_path: "/sounds/school/sentences/uk/школа.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_school`], language_id: languageMap.ru, value: "Я хожу в {{answer}}.", answer_value: "школу", sound_path: "/sounds/school/sentences/ru/школа.mp3" },

        // classroom
        { content_id: contentMap[`${categoryMap.school}_sentence_classroom`], language_id: languageMap.en, value: "Our {{answer}} is big and light.", answer_value: "classroom", sound_path: "/sounds/school/sentences/en/classroom.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_classroom`], language_id: languageMap.fi, value: "Meidän {{answer}} on suuri ja valoisa.", answer_value: "luokkahuone", sound_path: "/sounds/school/sentences/fi/luokkahuone.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_classroom`], language_id: languageMap.uk, value: "Наш {{answer}} великий і світлий.", answer_value: "клас", sound_path: "/sounds/school/sentences/uk/клас.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_classroom`], language_id: languageMap.ru, value: "Наш {{answer}} большой и светлый.", answer_value: "класс", sound_path: "/sounds/school/sentences/ru/класс.mp3" },

        // teacher
        { content_id: contentMap[`${categoryMap.school}_sentence_teacher`], language_id: languageMap.en, value: "We have a good {{answer}}.", answer_value: "teacher", sound_path: "/sounds/school/sentences/en/teacher.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_teacher`], language_id: languageMap.fi, value: "Meillä on hyvä {{answer}}.", answer_value: "opettaja", sound_path: "/sounds/school/sentences/fi/opettaja.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_teacher`], language_id: languageMap.uk, value: "У нас хороший {{answer}}.", answer_value: "вчитель", sound_path: "/sounds/school/sentences/uk/вчитель.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_teacher`], language_id: languageMap.ru, value: "У нас хороший {{answer}}.", answer_value: "учитель", sound_path: "/sounds/school/sentences/ru/учитель.mp3" },

        // student
        { content_id: contentMap[`${categoryMap.school}_sentence_student`], language_id: languageMap.en, value: "I am a {{answer}}.", answer_value: "student", sound_path: "/sounds/school/sentences/en/student.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_student`], language_id: languageMap.fi, value: "Minä olen {{answer}}.", answer_value: "oppilas", sound_path: "/sounds/school/sentences/fi/oppilas.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_student`], language_id: languageMap.uk, value: "Я {{answer}}.", answer_value: "учень", sound_path: "/sounds/school/sentences/uk/учень.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_student`], language_id: languageMap.ru, value: "Я {{answer}}.", answer_value: "ученик", sound_path: "/sounds/school/sentences/ru/ученик.mp3" },

        // book
        { content_id: contentMap[`${categoryMap.school}_sentence_book`], language_id: languageMap.en, value: "I read a {{answer}}.", answer_value: "book", sound_path: "/sounds/school/sentences/en/book.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_book`], language_id: languageMap.fi, value: "Minä luen {{answer}}.", answer_value: "kirjaa", sound_path: "/sounds/school/sentences/fi/kirja.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_book`], language_id: languageMap.uk, value: "Я читаю {{answer}}.", answer_value: "книгу", sound_path: "/sounds/school/sentences/uk/книга.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_book`], language_id: languageMap.ru, value: "Я читаю {{answer}}.", answer_value: "книгу", sound_path: "/sounds/school/sentences/ru/книга.mp3" },

        // notebook
        { content_id: contentMap[`${categoryMap.school}_sentence_notebook`], language_id: languageMap.en, value: "I write in my {{answer}}.", answer_value: "notebook", sound_path: "/sounds/school/sentences/en/notebook.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_notebook`], language_id: languageMap.fi, value: "Minä kirjoitan {{answer}}.", answer_value: "vihkoon", sound_path: "/sounds/school/sentences/fi/vihko.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_notebook`], language_id: languageMap.uk, value: "Я пишу в {{answer}}.", answer_value: "зошиті", sound_path: "/sounds/school/sentences/uk/зошит.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_notebook`], language_id: languageMap.ru, value: "Я пишу в {{answer}}.", answer_value: "тетради", sound_path: "/sounds/school/sentences/ru/тетрадь.mp3" },

        // pen
        { content_id: contentMap[`${categoryMap.school}_sentence_pen`], language_id: languageMap.en, value: "I write with a {{answer}}.", answer_value: "pen", sound_path: "/sounds/school/sentences/en/pen.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_pen`], language_id: languageMap.fi, value: "Minä kirjoitan {{answer}}.", answer_value: "kynällä", sound_path: "/sounds/school/sentences/fi/kynä.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_pen`], language_id: languageMap.uk, value: "Я пишу {{answer}}.", answer_value: "ручкою", sound_path: "/sounds/school/sentences/uk/ручка.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_pen`], language_id: languageMap.ru, value: "Я пишу {{answer}}.", answer_value: "ручкой", sound_path: "/sounds/school/sentences/ru/ручка.mp3" },

        // pencil
        { content_id: contentMap[`${categoryMap.school}_sentence_pencil`], language_id: languageMap.en, value: "I draw with a {{answer}}.", answer_value: "pencil", sound_path: "/sounds/school/sentences/en/pencil.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_pencil`], language_id: languageMap.fi, value: "Minä piirrän {{answer}}.", answer_value: "lyijykynällä", sound_path: "/sounds/school/sentences/fi/lyijykynä.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_pencil`], language_id: languageMap.uk, value: "Я малюю {{answer}}.", answer_value: "олівцем", sound_path: "/sounds/school/sentences/uk/олівець.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_pencil`], language_id: languageMap.ru, value: "Я рисую {{answer}}.", answer_value: "карандашом", sound_path: "/sounds/school/sentences/ru/карандаш.mp3" },

        // desk
        { content_id: contentMap[`${categoryMap.school}_sentence_desk`], language_id: languageMap.en, value: "We sit at {{answer}}.", answer_value: "desks", sound_path: "/sounds/school/sentences/en/desk.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_desk`], language_id: languageMap.fi, value: "Me istumme {{answer}}.", answer_value: "pulpettien ääressä", sound_path: "/sounds/school/sentences/fi/pulpetti.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_desk`], language_id: languageMap.uk, value: "Ми сидимо за {{answer}}.", answer_value: "партами", sound_path: "/sounds/school/sentences/uk/парта.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_desk`], language_id: languageMap.ru, value: "Мы сидим за {{answer}}.", answer_value: "партами", sound_path: "/sounds/school/sentences/ru/парта.mp3" },

        // lesson
        { content_id: contentMap[`${categoryMap.school}_sentence_lesson`], language_id: languageMap.en, value: "We have four {{answer}} every day.", answer_value: "lessons", sound_path: "/sounds/school/sentences/en/lesson.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_lesson`], language_id: languageMap.fi, value: "Meillä on neljä {{answer}} joka päivä.", answer_value: "oppituntia", sound_path: "/sounds/school/sentences/fi/oppitunti.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_lesson`], language_id: languageMap.uk, value: "У нас чотири {{answer}} щодня.", answer_value: "уроки", sound_path: "/sounds/school/sentences/uk/урок.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_lesson`], language_id: languageMap.ru, value: "У нас четыре {{answer}} каждый день.", answer_value: "урока", sound_path: "/sounds/school/sentences/ru/урок.mp3" },

        // break
        { content_id: contentMap[`${categoryMap.school}_sentence_break`], language_id: languageMap.en, value: "Students go outside on a {{answer}}.", answer_value: "break", sound_path: "/sounds/school/sentences/en/break.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_break`], language_id: languageMap.fi, value: "Oppilaat menevät ulos {{answer}}.", answer_value: "välitunnilla", sound_path: "/sounds/school/sentences/fi/välitunti.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_break`], language_id: languageMap.uk, value: "Учні виходять на вулицю на {{answer}}.", answer_value: "перерві", sound_path: "/sounds/school/sentences/uk/перерва.mp3" },
        { content_id: contentMap[`${categoryMap.school}_sentence_break`], language_id: languageMap.ru, value: "Ученики выходят на улицу на {{answer}}.", answer_value: "перемене", sound_path: "/sounds/school/sentences/ru/перемена.mp3" },

        // SCHOOL (TEXT)
        // English
        { 
            content_id: contentMap[`${categoryMap.school}_text_school`], 
            language_id: languageMap.en, 
            value: "Hello! My name is Emma. I am a student. Every morning I go to school. Our classroom is big and bright. My teacher is very kind. I have a book, a notebook, a pen, and a pencil in my school bag. I read my book and write in my notebook with a pen. I draw with a pencil. We sit at our desks and learn many new things. We have four lessons every day. During the break, my friends and I go outside and play together. I like my school very much.", 
            sound_path: "/sounds/school/text/en_school.mp3",
            title: "My school"  
        },
        // Finnish
        { 
            content_id: contentMap[`${categoryMap.school}_text_school`], 
            language_id: languageMap.fi, 
            value: "Hei! Minun nimi on Emma. Olen oppilas. Joka aamu menen kouluun. Meidän luokkahuone on suuri ja valoisa. Opettaja on erittäin ystävällinen. Minulla on koululaukussa kirja, vihko, kynä ja lyijykynä. Luen kirjaa ja kirjoitan vihkoon kynällä. Piirrän lyijykynällä. Istumme pulpettien ääressä ja opimme paljon uusia asioita. Meillä on neljä oppituntia joka päivä. Välitunnilla menemme kavereiden kanssa ulos ja leikimme yhdessä. Pidän koulusta todella paljon.", 
            sound_path: "/sounds/school/text/fi_school.mp3",
            title: "Minun koulu" 
        },
        // Ukrainian
        { 
            content_id: contentMap[`${categoryMap.school}_text_school`], 
            language_id: languageMap.uk, 
            value: "Привіт! Мене звати Емма. Я учениця. Щоранку я ходжу до школи. Наш клас великий і світлий. Моя вчителька дуже добра. У моєму шкільному рюкзаку є книга, зошит, ручка та олівець. Я читаю свою книгу і пишу в зошиті ручкою. Я малюю олівцем. Ми сидимо за партами і вивчаємо багато нового. У нас чотири уроки щодня. На перерві ми з друзями виходимо на вулицю і граємо разом. Мені дуже подобається моя школа.", 
            sound_path: "/sounds/school/text/uk_school.mp3",
            title: "Моя школа" 
        },
        // Russian
        { 
            content_id: contentMap[`${categoryMap.school}_text_school`], 
            language_id: languageMap.ru, 
            value: "Привет! Меня зовут Эмма. Я ученица. Каждое утро я хожу в школу. Наш класс большой и светлый. Моя учительница очень добрая. В моем школьном рюкзаке есть книга, тетрадь, ручка и карандаш. Я читаю свою книгу и пишу в тетради ручкой. Я рисую карандашом. Мы сидим за партами и узнаём много нового. У нас четыре урока каждый день. На перемене мы с друзьями выходим на улицу и играем вместе. Мне очень нравится моя школа.", 
            sound_path: "/sounds/school/text/ru_school.mp3",
            title: "Моя школа"
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