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

// schemas and middleware
let userschema = require("./schemas/userschema.json");
let validateSchema = require("./middleware/validate");
let isAuthenticated = require("./middleware/auth");
// pre-auth routes
app.use("/avatars", require("./routes/avatarsRouter"));
// auth routes
app.use("/login", require("./routes/loginRouter"));
app.use("/register", validateSchema(userschema), require("./routes/registerRouter"));
// app routes
app.use("/users", isAuthenticated, require("./routes/usersRouter"));
app.use("/languages", isAuthenticated, require("./routes/languagesRouter"));
app.use("/courses", isAuthenticated, require("./routes/coursesRouter"));
app.use("/categories", isAuthenticated, require("./routes/categoriesRouter"));
app.use("/progress", isAuthenticated, require("./routes/progressRouter"));
app.use("/", require("./routes/index"));

module.exports = app;