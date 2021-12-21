'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')
const { type } = require('os')


const PORT = 5555
const dataPath = path.join(__dirname, 'pets.json');


const server = http.createServer((req, res)=>{
    let userUrl = req.url
    const petRegExp = new RegExp(/^\/pets(\/\d*)/);

    const found = petRegExp.test(userUrl) //true

    if(req.method === 'GET' && req.url === '/pets'){
        fs.readFile(dataPath, 'utf8', (err, dataJSON)=>{
            if(err){FiveHundredError(res)}
            else {
                petDataFound(res, dataJSON)
            }
        })
    }
    else if(found){
        let petSearch = petRegExp.exec(userUrl); //object => {alksdjo, /123, 12948jkl, aksjdakjf}
        let petNum = parseInt(petSearch[1].substr(1)) // /123

        fs.readFile(dataPath,'utf8', (err, dataJSON)=>{
            if(err){FiveHundredError(res)}
            else{
                let pets = JSON.parse(dataJSON);
                let pet = JSON.stringify(pets[petNum]);
                if(pet === undefined){fourOhFour(res)}
                else{
                    petDataFound(res, pet)
                }
            }
        })
    }

    else{
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Page not found')
    }
    
})



server.listen(PORT,()=>{
    console.log('Listening on', PORT)
})


function FiveHundredError(res){
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain')
    console.error(error.stack)
    res.end('Internal Server Error')
}

function petDataFound(res, data){
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    console.log(`Pet data found`)
    res.end(data)
}

function fourOhFour(res){
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain')
    // console.error(error.stack)
    res.end('Page not found')
}


module.exports = server;


