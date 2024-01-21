const mongoose = require("mongoose");
const config = require("../config/db.config.js");

mongoose.connect(config.MONGODB_URI);

const db = {};

db.mongoose = mongoose;
db.user = require("../models/user.model.js");

module.exports = db;