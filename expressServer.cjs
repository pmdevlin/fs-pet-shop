const express = require('express');
const req = require('express/lib/request');
const app = express()
const fs = require('fs')
const PATH = require('path')
const http = require('http')
const PORT = 5555;
var bodyParser = require('body-parser')


app.get('/pets', getPetData)
app.get('/pets/:num',getPetData)
app.post('/', express.json(), addPetData),

app.use((err, req, res, next) => {

    res.status(err.status).json({error:err})

})

function getPetData (req, res, next){
    const petsPath = PATH.join(__dirname, "pets.json")
    const petsJSON = fs.readFileSync(petsPath, 'utf8')
    let petData = JSON.parse(petsJSON)
    let num;
    
    if(req.params.num){

        num = req.params.num
        
        if(num<0 || num > petData.length-1){
        next({status: 404, message: 'Number not found'})
        }

        let takeOnePet = petData[num]
        res.send(JSON.stringify(takeOnePet))  
    }else{
        res.send(petData)
    }
}

function addPetData (req, res, next) {
    const petsPath = PATH.join(__dirname, "pets.json")
    const petsJSON = fs.readFileSync(petsPath, 'utf8')
    let petData = JSON.parse(petsJSON)
    let num;
    let newPet = {}

    newPet.age = req.body.age
    newPet.kind = req.body.kind
    newPet.name = req.body.name

    if(req.params.num){
        num = req.params.num
        if(num<0 || num > petData.length-1){
            next({status: 404, message: 'Number not found'})
        }
        petData.splice(num, 0, newPet)
        
    }else {
         petData.push(newPet)
        fs.writeFileSync("./pets.json", JSON.stringify(petData))
    }
}


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})