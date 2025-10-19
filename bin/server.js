require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const connectDB = require("../src/config/db");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("../src/routes");
const errorHandler = require("../src/middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to Nextwear API");
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
