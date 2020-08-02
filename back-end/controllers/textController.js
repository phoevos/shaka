const {Meta} = require('../models/meta')
const {Text} = require('../models/text')

async function getTexts (req, res) {
    let result = await Meta.find(
      { $text:
          {
            $search: req.params.drug
          }
      }, {score: {$meta: "textScore"}, __v: 0})
      .sort({ score: { $meta: "textScore" } })
      
    res.send(result)
}

exports.getTexts = getTexts

async function getTextBody (req, res) {
  let result = await Meta.findOne({text_id: req.params.text}, {_id: 0, __v: 0})
    .populate('text_id', 'text')
    
  res.send(result)
}

exports.getTextBody = getTextBody