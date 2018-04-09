const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ArticleSchema = new Schema({
    // TODO
    // All the Data Types that you need

    title: String,

    link: String,

    saved: Boolean
});


const Article = mongoose.model("Article", ArticleSchema); // register your Schema


module.exports = Article;