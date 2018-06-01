var mongoose = require("mongoose");
var words = require("../schema/word");

module.exports = mongoose.model("Words",words);
