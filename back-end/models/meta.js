const mongoose = require('mongoose')

let meta = new mongoose.Schema({
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
})

meta.index({title: 'text', abstract: 'text'})

const Meta = mongoose.model('Meta', meta, 'Meta')

exports.Meta = Meta