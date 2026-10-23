let express = require("express");
let router = express.Router();

const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const crypto = require('crypto');

router.post("/", async (req, res) => {
    try {
        const { token } = req.body;

        if (typeof token !== "string" || !token) {
            return res.status(400).json({
                error: "Verification token is missing",
                code: "INVALID_TOKEN"
            });
        }
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const verificationToken = await knex("email_verification_tokens")
            .where({ token_hash: tokenHash })
            .first();

        if (!verificationToken) {
            return res.status(400).json({
                error: "This verification link is invalid or has already been used.",
                code: "INVALID_OR_USED_TOKEN"
            });
        }

        if (new Date(verificationToken.expires_at) < new Date()) {
            await knex("email_verification_tokens")
                .where({
                    email_verification_token_id: verificationToken.email_verification_token_id
                })
                .del();

            return res.status(400).json({
                error: "This verification link has expired.",
                code: "TOKEN_EXPIRED",
            });
        }

        await knex.transaction(async (trx) => {
            await trx("users")
                .where({ user_id: verificationToken.user_id })
                .update({ email_verified: true });

            await trx("email_verification_tokens")
                .where({ email_verification_token_id: verificationToken.email_verification_token_id })
                .del();
        });

        return res.status(200).json({
            message: "Email verified successfully",
            code: "EMAIL_VARIFIED"
        });

    } catch (error) {
        console.error("Email verification API error:", error);

        return res.status(500).json({
            error: "We couldn't verify your email right now. Please try again later.",
            code: "VERIFICATION_FAILD"
        });
    }
})

module.exports = router;