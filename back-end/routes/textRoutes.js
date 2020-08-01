module.exports = (app) => {
   const {getTexts, getTextBody} = require('../controllers/textController')

   app.get('/appathon/api/:drug', getTexts)
   app.get('/appathon/api/text/:text', getTextBody)
}