const fs = require('fs')
const fastcsv = require('fast-csv')
const mongoose = require('mongoose')
const JSONStream = require('JSONStream')

const url = 'mongodb://localhost:27017/cord19'
let stream = fs.createReadStream('./import/metadata.csv')

let cor = 0 

function extractData (data) {
    let path = './import/'
    let flag = false

    // metadata.csv doesn't include paths for every paper
    if (data[16] && fs.existsSync(path + data[16].split(';')[0])) {
        path += data[16].split(';')[0]
        flag = true
    }
    else if (data[15] && fs.existsSync(path + data[15].split(';')[0])) {
        path += data[15].split(';')[0]
        flag = true
    }
    else {
        mongoose.connection.collection('Article').insertOne({
            title: data[3],
            abstract: data[8],
            publish_time: data[9],
            authors: data[10],
            text: null,
            textExists: false
        }, (err) => {
            if (err) throw err
            return
        })
    }

    if(flag) {
        try {
            let inStream = fs.createReadStream(path)
            let body = ""
    
            inStream.pipe(JSONStream.parse('body_text..text'))
                .on("data", (data) => {
                    body = body + data + " " 
                })               
                .on("end", () => {
                    mongoose.connection.collection('Article').insertOne({
                        title: data[3],
                        abstract: data[8],
                        publish_time: data[9],
                        authors: data[10],
                        text: body,
                        textExists: true
                    }, (err) => {
                        if (err) throw err
                    })
                })
        } catch (error) {
            cor++
        }
    }
}

function parseRows () {
    console.log("Saving article texts to MongoDB...\nThis usually takes around 12 minutes.")

    let csvStream = fastcsv
        .parse({ delimiter: ',', skipLines:1})
        .on("error", (error) => {
            console.log(error)
        })
        .on("data", (data) => {
            extractData(data)    
        })
        .on("end", () => {
            console.log('Creating text index...')
            mongoose.connection.collection('Article').createIndex({text: 'text', abstract: 'text', title: 'text'}, () => {
                console.log('Documents saved successfully.')
                const msg = cor + ' text files were corrupt.'
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
    console.log("Successfully connected to the database. \nDropping Articles collection if it already exists...")
    mongoose.connection.collection('Article').drop(parseRows)
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
}) 
