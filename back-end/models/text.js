const mongoose = require('mongoose')

let text = new mongoose.Schema({
    text: {
        type: String
    }
})

text.index({text: 'text'})

const Text = mongoose.model('Text', text, 'Text')

exports.Text = Text