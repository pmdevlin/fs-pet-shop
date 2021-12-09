const PATH = require('path');
const fs = require('fs');
const http = require('http');
const PORT = 8000;

let server = http.createServer((req, res) => {
   
    if(req.method === 'GET' && req.url === "/pets"){
        let petsPath = PATH.join(__dirname, 'pets.json');
        fs.readFile(petsPath,'utf8', function (err, petsJson){
            if(err){
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain')
                return res.end('Internal server error')
            }
            res.statusCode = 200;
            res.setHeader('content-Type','application/json')
            res.end(petsJson)
        })
    } else if (req.method === 'GET' & req.url.substring(0,5) === "/pets"){
        let index = req.url.substring(6, req.url.length);
        let petsPath = PATH.join(__dirname, 'pets.json');
        

        fs.readFile(petsPath,'utf8', function (err, petsJson){
            if(err){
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain')
                return res.end('Internal server error')
            }
            let petsData = JSON.parse(petsJson)
            if( index < 0 || index > petsData.length-1){

                res.statusCode = 404;
                res.setHeader('content-Type', 'text/plain')
                res.end("NOT FOUND");

            }else{
             
                let singlePet = petsData[index]
                singlePet= JSON.stringify(singlePet)
                res.statusCode = 200;
                res.setHeader('content-Type','application/json')
                res.end(singlePet)
            }
        }) 
    } else {
        res.statusCode = 404;
        res.setHeader('content-Type', 'test/plain')
        res.end('NOT FOUND')
    }    
})

server.listen(PORT, function () {
    console.log(`listening on ${PORT}`)
})