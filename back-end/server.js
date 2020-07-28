const app = require('./app')
const mongoose = require('mongoose')
const config = require('config')

// Configuring the database
const db = config.get('db')

// Connecting to the database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database.");   
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit();
});

// Listening for requests
app.listen(8765, () => {
    console.log("Server is listening on port 8765.")
});