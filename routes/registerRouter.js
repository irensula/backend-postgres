var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('../knex');
const bcrypt = require('bcryptjs')

router.post('/', async (req, res, next) => {
    try {
        const user = req.body;
        const saltRounds = 10;

        console.log({ username: user.username, email: user.email });
        // validation
        if (!user.username || !user.email || !user.avatar_id || !user.password  ) {
            return res.status(400).json({ error: "All fields are required." });
        }
        if (!user.password.trim()) {
            return res.status(400).json({ error: "Password is required." });
        }
        // check existing user
        const existingUser = await knex('users')
            .where('email', user.email)
            .first()
            
        if (existingUser) {
            return res.status(400).json({ error: "Sähköpostiosoite on jo rekisteröity." });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const newUser = {
            username: user.username,
            email: user.email,
            avatar_id: user.avatar_id,
            password: hashedPassword,
            ui_language_id: 1
        }
        // insert
        await knex('users').insert(newUser);
        
        console.log("register onnistui")
        
        return res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
        console.error("Register error: ", error);
        res.status(500).json({ error: "Internal server error" });
    };
})

module.exports = router;