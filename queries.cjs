// move all code here and export to server 
const { Pool } = require('pg')
const { database, password } = require('pg/lib/defaults')

const pool = new Pool ({
    user: 'pmdev',
    database: 'petshop',
    host: 'localhost',
    port: 5432, 
    password: 'laly1985'
})

// CREATE a whole new pet to database
const addPet =  async (req, res) => {  
    try{
    const {age, kind, name} = req.body
   const add = await pool.query('INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3)', [age, kind, name,])
    res.send(add)
   }catch(err){
    console.log(err)
    res.statusCode = 500;
    console.log(`Pet NOT added`)
   }
}

// READ all the pets 
const getPets = async (req, res) => {
    try{   
        // gets back all table data
        //const result = await pool.query('SELECT * FROM pets') 
        const {rows} = await pool.query('SELECT * FROM pets')
        res.send(rows)
    } catch(err) {
        console.log(err) 
        res.statusCode = 500;
        res.json(err)
    }
}

// READ individual pets
const getById = async (req, res) => { 
    try{ 
        const { id } = req.params
        const {rows} = await pool.query('SELECT * FROM pets WHERE id = $1', [id])
        res.send(rows[0])

    }catch(err){
        console.log(err)
        res.statusCode = 500;
        res.json(err);

    }
}

// update any part of the pets object 
const update = async(req, res) =>{
    try{
            const body = req.body 
            const id = req.params.id
        
            let query = ['UPDATE pets SET']
            let set =[]
            let altered = []

            Object.keys(body).forEach(function (key, i){
            set.push(key + ' = ($'+ ( i + 1) + ')');
            altered.push(req.body[key])
            });

            query.push(set.join(','));
            query.push('WHERE id = ' + id);
            
            const include = await pool.query(query.join(' '), altered);
            res.send(include)

    }catch(err){
        console.log(err)
        res.statusCode = 500;
        console.log(`patch NOT complete`)
    }
}

//  Delete whole pets 
const remove = async (req, res) =>{
    try{ 
        const { id } = req.params
        const {rows} = await pool.query('DELETE FROM pets WHERE id = $1', [id])
        res.send(rows[0])

    }catch(err){
        console.log(err)
        res.statusCode = 500;
        console.log('did not work')

    }
}

module.exports = {
    addPet,
    getPets,
    getById,
    update,
    remove

};