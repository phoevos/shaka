const fs = require('fs')
const fastcsv = require('fast-csv')
const mongoose = require('mongoose')
const JSONStream = require('JSONStream')
const {Text} = require('../models/text')

const url = 'mongodb://localhost:27017/cord19'
let stream = fs.createReadStream('./import/metadata.csv')

let cor = 0 
let notFound = 0

function extractData (id, data) {
    const objID = mongoose.Types.ObjectId.createFromHexString(('000000000000000000000000' + id).substr(-24))

    let path = './import/'

    // metadata.csv doesn't include paths for every paper
    if (data.pmc && fs.existsSync(path + data.pmc.split(';')[0])) {
        path += data.pmc.split(';')[0]
    }
    else if (data.pdf && fs.existsSync(path + data.pdf.split(';')[0])) {
        path += data.pdf.split(';')[0]
    }
    else {
        notFound++
        return
    }

    try {
        let inStream = fs.createReadStream(path)
        let body = ""

        inStream.pipe(JSONStream.parse('body_text..text'))
            .on("data", (data) => {
                body = body + " " + data
            })               
            .on("end", () => {
                Text.create({
                    _id: objID,
                    text: body
                }, (err) => {
                    if (err) throw err
                })
            })
    } catch (error) {
        cor++
    }
    
}

function parseRows () {
    console.log("Saving article texts to MongoDB...\nThis might take a few minutes.")
    let id = 1

    let csvStream = fastcsv
        .parse({ delimiter: ',', headers: [,,,,,,,,,,,,,,'pdf','pmc',,,,],skipLines:1})
        .on("error", (error) => {
            console.log(error)
        })
        .on("data", (data) => {
            extractData(id, data)          
            id++
        })
        .on("end", () => {
            console.log('Creating text index...')
            mongoose.connection.collection('Text').createIndex({text: 'text'}, () => {
                console.log('Documents saved successfully.')
                const msg = 'Full article text was not found for ' + notFound + ' of the papers and ' +  cor + ' files were corrupt.'
                console.log(msg)
                process.exit()
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
    console.log("Successfully connected to the database. \nDropping Text collection if it already exists...")
    mongoose.connection.collection('Text').drop(parseRows)
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
}) 
