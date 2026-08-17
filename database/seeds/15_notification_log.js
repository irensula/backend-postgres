/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    const user = await knex('users').where({ email: 'test@gmail.com' }).first();

    if (!user) {
        throw new Error('Demo user not found — run users seed first');
    }

    const existing = await knex('notification_log')
    .where({ user_id: user.user_id, type: 'system', title: 'Update' })
    .first();

    if (existing) {
        return;
    }
    
    await knex("notification_log")
        .insert([
            {   
                user_id: user.user_id, 
                type: "system",
                title: "Update",
                body: "The app has been updated. Please, update your app.", 
                data: JSON.stringify({ version: "1.2.0" }),
                read: false,
            },
        ]);
};