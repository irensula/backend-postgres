let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { sendPasswordResetEmail } = require("../utils/email");

router.post('/forgot-password', async(req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await knex('users')
            .where({ email: email.toLowerCase().trim() })
            .first();

        if (!user) {
            return res.json({ message: 'If an account with this email exists, a password reset link has been sent.' });
        }

        // delete old reset tokens
        await knex('password_reset_tokens')
            .where({ user_id: user.user_id })
            .del();

        // generate new token
        const token = crypto.randomBytes(32).toString('hex');

        // hash token
        const tokenHash = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // token expires in 30 min
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

        await knex('password_reset_tokens').insert({
            user_id: user.user_id,
            token_hash: tokenHash,
            expires_at: expiresAt
        })
        
        const resetUrl = `https://study-languages.up.railway.app/reset-password?token=${token}`;
        //const resetUrl = `https://example.com/reset-password?token=${token}`;
        
        // send email and token via Resend
        await sendPasswordResetEmail(user.email, resetUrl);

        return res.json({ message:  'If an account with this email exists, a password reset link has been sent.' });
    
    } catch (error) {
        console.log("Forgot password error", error);
        return res.status(500).json({ error: "Something went wrong" })
    }
})

router.post('/reset-password', async(req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ error: 'Token and password are required' });
        }

        // hash token received from the user
        const tokenHash = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // fixed existing reset token
        const resetToken = await knex('password_reset_tokens')
            .where({ token_hash: tokenHash })
            .first();

        if (!resetToken) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        // check token expiration
        if (new Date(resetToken.expires_at) < new Date()) {
            await knex('password_reset_tokens')
                .where({
                    password_reset_token_id: resetToken.password_reset_token_id
                })
                .del();

            return res.status(400).json({ error: 'Reset token has expired' });
        }

        // hash new password
        const passwordHash = await bcrypt.hash(password, 12);

        // update user's password
        await knex('users')
            .where({ user_id: resetToken.user_id })
            .update({ password: passwordHash });

        // delete used reset token
        await knex('password_reset_tokens')
            .where({ password_reset_token_id: resetToken.password_reset_token_id })
            .del();

        return res.json({ message: 'Password has been reset successfully' });
    
    } catch (error) {
        console.log("Forgot password error", error);
        return res.status(500).json({ error: "Something went wrong" })
    }
})

module.exports = router;