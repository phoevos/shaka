const mongoose = require('mongoose')

const Meta = mongoose.model('Meta', new mongoose.Schema({
    title: {
        type: String
    },
    abstract: {
        type: String
    },
    publish_time: {
        type: String
    },
    authors: {
        type: String
    },
    text_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Text'
    }
}), 'Meta')

exports.Meta = Meta