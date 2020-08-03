module.exports = (app) => {
   const {getTexts, getCount, getTextBody} = require('../controllers/textController')

   app.get('/appathon/api/chart/:drug', getCount)
   app.get('/appathon/api/text/:text', getTextBody)
   app.get('/appathon/api/:drug/:page', getTexts)
}