var express = require("express");
var router = express.Router();

const config = require("../utils/config");
const options = config.DATABASE_OPTIONS;
const knex = require('../knex');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  const user = req.body;
  try {
    // find user
    const dbUsers = await knex("users")
      .select("users.*", "avatars.avatar_path")
      .leftJoin("avatars", "users.avatar_id", "avatars.avatar_id")
      .where("email", "=", user.email)

      if (dbUsers.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
        
      const tempUser = dbUsers[0];
      // check password
      const passwordCorrect = await bcrypt.compare(
        user.password, 
        tempUser.password
      );
        
      if (!passwordCorrect) {
        return res.status(401).json({ error: "Tarkista käyttäjätunnus tai salasana" });
      }
      // create token payload
      const userForToken = {
        id: tempUser.user_id,
        username: tempUser.username,
        email: tempUser.email,
        avatar_id: tempUser.avatar_id,
        avatar_path: tempUser.avatar_path,
      };
      // create JWT
      const token = jwt.sign(userForToken, config.SECRET, { expiresIn: "7d" });
      // response
      return res.status(200).json({
        token,
        user: userForToken
      });
  } catch(error) {
      console.error(
        "Error fetching user from database for email:",
        user.email,
        error
      );
      res.status(500).json({ error: "Database query failed" });
  };
})

module.exports = router;