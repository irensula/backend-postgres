var express = require('express');
var router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/email");

router.post('/', async (req, res, next) => {
    try {
        const { username, email, avatar_id, password } = req.body;

        const normalizedUsername = typeof username === "string" ? username.trim() : "";

        const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

        // 1. Validate input
        if (
            !normalizedUsername ||
            !normalizedEmail ||
            !avatar_id ||
            typeof password !== "string" ||
            !password.trim()
        ) {
            return res.status(400).json({ error: "All fields are required." });
        }
        
        // 2. Check existing user
        const existingUser = await knex('users')
            .where({email: normalizedEmail})
            .first()
            
        if (existingUser) {
            return res.status(409).json({ 
                error: "Email address is already registered",
                code: "EMAIL_ALREADY_REGISTERED"
             });
        }
        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Generate verification token
        const token = crypto.randomBytes(32).toString("hex");

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // 5. Create user and token
        const newUser = await knex.transaction(async (trx) => {
            const [createdUser] = await trx("users")
                .insert({
                    username: normalizedUsername,
                    email: normalizedEmail,
                    avatar_id,
                    password: hashedPassword,
                    ui_language_id: 1,
                    email_verified: false
                })
                .returning(["user_id"]);

            await trx("email_verification_tokens").insert({
                user_id: createdUser.user_id,
                token_hash: tokenHash,
                expires_at: expiresAt
            });

            return createdUser;
        });

        // 6. Send verification email
        const verificationUrl =
            `https://study-languages.up.railway.app/verify-email?token=${token}`;

        try {
            await sendVerificationEmail(
                normalizedEmail,
                verificationUrl
            );
        } catch (emailError) {
            console.error(
                "Verification email could not be sent:",
                emailError.message
            );

            // The account exists; the user can request another email.
            return res.status(201).json({
                message: "Account created, but verification email could not be sent.",
                code: "VERIFICATION_EMAIL_FAILED",
                emailSent: false
            });
        }

        return res.status(201).json({
            message: "Registration successful. Please verify your email.",
            emailSent: true
        });

    } catch (error) {
        console.error("Register error: ", error);
        res.status(500).json({ error: "Internal server error" });
    };
})

module.exports = router;