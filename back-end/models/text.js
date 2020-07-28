const mongoose = require('mongoose')

const Text = mongoose.model('Text', new mongoose.Schema({
    text: {
        type: String
    }
}), 'Text')

exports.Text = Text