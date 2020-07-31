module.exports = (app) => {
   const {getTexts} = require('../controllers/textController')

   app.get('/appathon/api/:drug', getTexts)
}