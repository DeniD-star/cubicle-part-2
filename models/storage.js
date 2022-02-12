// load and parse data file, 
// provide ability to 
// -- read all entries
// --read single entry By Id
// -- add new entry
// * get matching entries by search criteria 

const fs = require('fs/promises');
const uniqId = require('uniqid')
let data = {};

/*model structure*/
/*
{
    "name" : "string",
    "description" : "string",
    "imageUrl" : "string",
    "difficulty" : "number"
}

*/

async function init() {
    try {
        data = JSON.parse(await fs.readFile('./models/data.json'));
    } catch (err) {
        console.error('Error reading database')
    }

    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create
        }

        next();
    }
}

async function getAll() {
    return Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v))
}

async function getById(id) {
    return data[id];
}

async function create(cube) {
    const id = uniqId();
    data[id] = cube;
    try {
        await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2));
        console.log('>>> Created new record');
    } catch (err) {
        console.error('Error writing out database');
    }
}

module.exports = {
    init,
    getAll,
    getById,
    create
};