// if(process.env.NODE_ENV === 'development')
require("dotenv").config({
  path: "./config/config.env",
});
require("./config/database")();

const express = require("express");
require("colors");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const router = require("./routers");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());

// Router API
router(app);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`.rainbow);
});

// Handle UnhandledPromiseRejectionWarning
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server
  server.close(() => process.exit(1));
});
