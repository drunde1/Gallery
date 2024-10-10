const {Schema, model} = require('mongoose')

const Ticket = new Schema({
    user: {type: String, ref: 'User'},
    exh: {type: String,  ref: 'Exhibition'},
    name: {type: String}, 
    surname: {type: String}, 
    phone: {type: String}
})

module.exports = model('Ticket', Ticket)