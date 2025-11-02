require("dotenv").config();
require("../config/db")();

require("../src/workers/categoryWorker");
