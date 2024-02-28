// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Database Conncetion
mongoose.connect(process.env.DB_URI);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected successfully"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: 'my secret key',
  saveUninitialized: true,
  resave: false,
}));

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// Set 
app.use(express.static("uploads"));

// Set template 
app.set('view engine', 'ejs');

// Route prefix
app.use("", require("./routes/routes"))

app.listen(PORT, () => {
  console.log(`Server Connected and Started at http://localhost:${PORT}`);
});