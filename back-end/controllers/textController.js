const {Article} = require('../models/article')

async function getTexts (req, res) {
  const drug = req.params.drug
  let result = await Article.find(
    { 
      $text: { $search: drug }
    }, 
    { 
      score: { $meta: "textScore" }, text: 0
    })
    .sort( {score: { $meta: "textScore" } } )
    .skip(req.params.page * 10 - 10)
    .limit(10)

  res.send(result)
}

exports.getTexts = getTexts

async function getTextBody (req, res) {
  const objID = req.params.text
  let result = await Article.findOne({_id: objID}, {abstract: 0})
  res.send(result)
}

exports.getTextBody = getTextBody

async function getCount (req, res) {
  const drug = req.params.drug

  let result = await Article.aggregate( [
    {
      $match : { $text: { $search: drug } }
    },
    {
      $group: {
         _id: '$publish_time',
         count: { $sum: 1 }
      }
    },
    { $sort: {_id: -1} }
  ] )

  res.send(result)

}

exports.getCount = getCount