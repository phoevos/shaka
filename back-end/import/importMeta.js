const fs = require('fs')
const fastcsv = require('fast-csv')
const mongoose = require('mongoose')
const {Meta} = require('../models/meta')

let url = 'mongodb://localhost:27017/cord19'
let stream = fs.createReadStream('metadata.csv')

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
                else console.log('Metadata saved successfully.')
                process.exit()
            })
        })
    
    stream.pipe(csvStream)
   
}

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Successfully connected to the database.")
    await Meta.deleteMany({})
    console.log("Parsing CSV...")
    parseRows()    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})
