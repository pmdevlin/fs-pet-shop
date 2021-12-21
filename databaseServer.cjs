const express = require('express')
const app = express()
const db = require('./queries.cjs')

const PORT = 7878

// this gives us ability to take in the body data for a post route
app.use(express.json())
app.use(express.static('client'))




app.get('/pets', db.getPets)
app.get('/pets/:id', db.getById)
app.post('/pets', db.addPet)
app.patch('/pets/:id', db.update)
app.delete('/pets/:id', db.remove)

app.listen(PORT, ()=> {
    console.log(`PORT is listening on ${PORT}`)
})

