const {Meta} = require('../models/meta')
const {Text} = require('../models/text')

async function getTexts (req, res) {
    let result = await Meta.find(
      { $text:
          {
            $search: req.params.drug
          }
      }, {score: {$meta: "textScore"}, _id: 0, __v: 0})
      .sort({ score: { $meta: "textScore" } })
      .populate('text_id', 'text')
      
    res.send(result)
}

exports.getTexts = getTexts

async function getTextBody (req, res) {

  let result = await Text.findById(req.params.text, {__v: 0})
    
  res.send(result)
}

exports.getTextBody = getTextBody