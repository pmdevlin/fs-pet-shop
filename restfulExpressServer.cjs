const express = require('express');
const app = express()
const fs = require('fs');
const { regexpToText } = require('nodemon/lib/utils');
const PATH = require('path')
const PORT = 5555;

const petsPath = PATH.join(__dirname, "pets.json") 
console.log(petsPath)

app.use(express.json())



// able to add information to pets.json 
app.post('/pets', (req, res) => {
    const pet = Object.assign({age:req.body['age'], kind: req.body['kind'], name: req.body['name'] });
    getPetData(pet, res)
})

// able to access the pet data at the given id 
app.get('/pets/:id', (req, res) => {
    fs.readFile(petsPath, 'utf8' ,(err, data) => {
        if(err){
            FiveHundredError(err)
        }else { 
            let petData = JSON.parse(data)
            let index = req.params.id
            if(index < 0 || index > petData.length-1){
               fourOhFour(res)
            }
            if(index){
                let takeIndex = petData[index]
                res.send(JSON.stringify(takeIndex))
            }else { 
             
            res.send(petData)
            }
        }
    })
})


// able to change pet data at the given id 
app.patch('/pets/:id', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, data) => {
        if(err){
            FiveHundredError(err);
        } else{ 
            let petData = JSON.parse(data)
            let index = req.params.id;
            let petObj = petData[index]

            console.log(petObj)

            for( let key in req.body){
                petObj[key] = req.body[key]
            }

            let updatedPets = JSON.stringify(petData)

            fs.writeFile(petsPath, updatedPets, (err) => {
                if(err){
                    console.log(err);
                }else{
                    res.json(petData)
                    res.statusCode = 200;
                    console.log(`patch update complete`)
                }
            })
                        
        }
        
    })
})

app.delete('/pets/:id', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, data) => {
        if(err){
            FiveHundredError(err);
        } else{ 
            let petData = JSON.parse(data)
            let index = req.params.id;
            let petObj = petData[index]
             
            if(petObj === undefined) {
                fourOhFour(res)
            }else{

                petData.splice(index, 1)
                let updatedPets = JSON.stringify(petData)
                fs.writeFile(petsPath, updatedPets, (err) => {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(petData)
                        res.statusCode = 200;
                        console.log(`deleted a pet`)

                    }
                })
            }
        }
    })
})


app.get('/pets',  (req, res) => {
    fs.readFile(petsPath,'utf8', (err, data) => {
        if(err){
            FiveHundredError(res)
        }else{
            res.setHeader('content-type', 'application/json')
            res.statusCode = 200;
            console.log('all pet data found')
            res.end(data)
        }
        
    })
    

})


const getPetData = (pet, res) =>{
    fs.readFile(petsPath, 'utf8', (err, data) => {
        if(err){
            FiveHundredError(err)
        }
        else{
            let pets = JSON.parse(data);
            pets.push(pet)
            let updatedPets = JSON.stringify(pets)

            fs.writeFile(petsPath, updatedPets, (err) => {
                if(err){
                    console.log(err);
                }else{
                    res.json(pet)
                    res.statusCode = 200;
                    console.log(`Pet roster updated`)
                }
            })
        }
    })

}

const FiveHundredError = (res) => {
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain');
    console.error(error.stack);
    res.end('internal server error');
}

const fourOhFour = (res) => {
    res.statusCode = 404;
    res.setHeader('content-type','text/plain')
    res.send('page not found')
}




app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})