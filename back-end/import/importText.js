const fs = require('fs')
const fastcsv = require('fast-csv')
const mongoose = require('mongoose')
const {Text} = require('../models/text')

let url = 'mongodb://localhost:27017/cord19'
let stream = fs.createReadStream('metadata.csv')
let text = []

function getTexts (total, i) {
    return total + " " + i.text
}

function saveTexts () {
    console.log("Parsing complete. Saving documents...")   
    let cor = 0     
    text.forEach(i => {
        if (i.text) {
            try {
                const file = require(i.text)
                Text.create({
                    _id: i._id,
                    text: file.body_text.reduce(getTexts, '')
                }, (err) => {
                    if (err) throw err
                })
            } catch (error) {
                cor++
            }
            
        }      
    })
    const msg = cor + ' file paths were corrupt.'
    console.log(msg)
    console.log('Documents saved successfully.')
    process.exit()
}

function extractData (id, data) {
    const objID = mongoose.Types.ObjectId.createFromHexString(('000000000000000000000000' + id).substr(-24))

    let path = ""
    if (data.pmc) {
        path = './' + data.pmc.split(';')[0]
    }
    else if (data.pdf) {
        path = './' + data.pdf.split(';')[0]
    }

    text.push({
        _id: objID,
        text: path
    })
}

function parseRows () {
    let id = 1

    let csvStream = fastcsv
        .parse({ delimiter: ',', headers: [,,,,,,,,,,,,,,'pdf','pmc',,,,],skipLines:1})
        .on("error", (error) => {
            console.log(error)
        })
        .on("data", (data) => {
            csvStream.pause()
            extractData(id, data)
            csvStream.resume()            
            id++
        })
        .on("end", saveTexts)
    
    stream.pipe(csvStream)
}

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async() => {
    console.log("Successfully connected to the database.")
    await Text.deleteMany({})
    console.log("Parsing CSV...")
    parseRows() 
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})
