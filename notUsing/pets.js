import process from 'process';
import fs from 'fs';

const args = process.argv
const command = args[2]
const FILE = 'pets.json'
const INDEX = args[3]

switch (command) {
        case undefined:{ 
            error('Usage: node pets.js [read | create | update | destroy]');
            break;
        }
        case 'read':{
           
            const data = parseJSON(FILE);
            printJSON(data, INDEX);
            break;
        }
        case 'create':{
            const obj = {
                age: parseInt(args[3]),
                kind: args[4],
                name: args[5],
            };
            create(FILE, obj);
            break;
        }
        case 'update':{
            
            const obj = {
                age: parseInt(args[4]),
                kind: args[5],
                name: args[6],
            };
            update(FILE, INDEX, obj)    
            break;  
        }

}

function error (message) {
    process.exitCode = 1
    console.error(message);
    process.exit(1);
}

function parseJSON (FILE) {
    const data = fs.readFileSync(FILE,'utf8')
    return JSON.parse(data)  
}

function printJSON (parsedJSON, index) {
    const output = (index) ? parsedJSON[index] : parsedJSON;
    if(!output) error('Usage: node pets.js read INDEX')
    console.log(output);
}

function create(FILE, obj) {
    const json = parseJSON(FILE)
    json.push(obj)
    fs.writeFileSync(FILE, JSON.stringify(json))
}

function update (file, index, obj) { 
    const json = parseJSON(file);
    json[index] = obj
    fs.writeFileSync(FILE, JSON.stringify(json))
}