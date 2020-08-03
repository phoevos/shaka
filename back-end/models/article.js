const mongoose = require('mongoose')

let article = new mongoose.Schema({
    title: String,
    abstract: String,
    publish_time: String,
    authors: String,
    text: String,
    textExists: Boolean
})

article.index({text: 'text', abstract: 'text', title: 'text' })

const Article = mongoose.model('Article', article, 'Article')

exports.Article = Article