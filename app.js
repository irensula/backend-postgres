let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let Ajv = require("ajv");
let cors = require("cors");

let app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Схемы и middleware
let userschema = require("./schemas/userschema.json");
let validateSchema = require("./middleware/validate");
let isAuthenticated = require("./middleware/auth");

app.use("/avatars", require("./routes/avatarsRouter"));
app.use("/login", require("./routes/loginRouter"));

app.use(
  "/register",
  validateSchema(userschema),
  require("./routes/registerRouter")
);
app.use("/users", isAuthenticated, require("./routes/usersRouter"));
app.use("/courses", isAuthenticated, require("./routes/coursesRouter"));
app.use("/", require("./routes/index"));

module.exports = app;