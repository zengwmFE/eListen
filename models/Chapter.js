var mongoose = require("mongoose");
var Chapter = require("../schema/Chapter");


module.exports = mongoose.model("Chapter",Chapter);
