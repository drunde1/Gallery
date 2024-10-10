const {Schema, model} = require('mongoose')

const Work = new Schema({
    name: {type: String, unique: true},
    author: {type: String, required: true},
    date: {type: String, required: true},
    genre: {type: String, required: true},
    imageURL: {type: String, required: true}
})

module.exports = model('Work', Work)