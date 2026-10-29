/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    const user = await knex('users').where({ email: 'test@gmail.com' }).first();

    if (!user) {
        throw new Error('Demo user not found — run users seed first');
    }

  await knex("user_sessions")
    .insert([
        {   
            user_id: 1, 
            refresh_token_hash: "refresh_token_hash_123", 
            device_id: "123456789", 
            expires_at: knex.raw("NOW() + INTERVAL '30 days'") 
        },
    ])
    .onConflict("refresh_token_hash")
    .merge(["device_id", "expires_at"]);
};