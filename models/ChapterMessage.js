var mongoose = require("mongoose");
var ChapterMessage = require("../schema/ChapterMessage");


module.exports = mongoose.model("ChapterMessage",ChapterMessage);
