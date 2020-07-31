const fs = require('fs')
const fastcsv = require('fast-csv')
const mongoose = require('mongoose')
const {Meta} = require('../models/meta')

const url = 'mongodb://localhost:27017/cord19'

function extractData (id, data, metaData) {
    const objID = mongoose.Types.ObjectId.createFromHexString(('000000000000000000000000' + id).substr(-24))

    metaData.push({
        title: data[3],
        abstract: data[8],
        publish_time: data[9],
        authors: data[10],
        text_id: objID
    })
}

function parseRows () {
    let metaData = []
    let id = 1
    console.log('Parsing CSV...')
    let stream = fs.createReadStream('./import/metadata.csv')

    let csvStream = fastcsv
        .parse({ delimiter: ',', skipLines:1})
        .on("error", (error) => {
            console.log(error)
        })
        .on("data", async (data) => {
            extractData(id, data, metaData)
            id++
        })
        .on("end", () => {
            Meta.insertMany(metaData, (err, res) => {
                if (err) console.log(err.message)
                else {
                    console.log('Creating text index...')
                    mongoose.connection.collection('Meta').createIndex({title: 'text', abstract: 'text'}, () => {
                        console.log('Metadata saved successfully.')
                        process.exit()
                    })
                } 
            })
        })
    
    stream.pipe(csvStream)
   
}

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database. \nDropping Meta collection if it already exists...")
    mongoose.connection.collection('Meta').drop(parseRows)
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})
