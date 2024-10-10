    const {Schema, model} = require('mongoose')

    const Feedback = new Schema({
        exh:{type: String, ref: 'Exhibition'},
        username: {type: String, ref: 'User'},
        value: {type: String, required: true},
        mark: {type: String,  required: true}
    })

    module.exports = model('Feedback', Feedback)