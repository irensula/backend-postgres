/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    const user = await knex('users').where({ email: 'test@gmail.com' }).first();

    if (!user) {
        throw new Error('Demo user not found — run users seed first');
    }

  await knex("user_push_tokens")
    .insert([
        {   
            user_id: user.user_id, 
            expo_push_token: "ExponentPushToken[111]"
        },
    ])
    .onConflict(["user_id", "expo_push_token"])
    .ignore();
};