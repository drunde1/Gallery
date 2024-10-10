const {Schema, model} = require('mongoose')

const Exhibition = new Schema({
    name: {type: String, unique: true},
    date_start: {type: String, required: true},
    date_end: {type: String, required: true},
    info:{type: String},
    cost:{type: String},
    works: [{type: String, ref: 'Work'}]
})

module.exports = model('Exhibition', Exhibition)