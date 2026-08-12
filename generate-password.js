const bcrypt = require("bcryptjs");

async function generate() {
  const password = "12345678";

  const hash = await bcrypt.hash(password, 10);

  console.log("Password:", password);
  console.log("Hash:", hash);
}

generate();