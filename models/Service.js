const {Schema, model} = require('mongoose')

const schema = new Schema({
    id: {type: String, required: true, unique: true},
    service_name: {type: String, required: true, unique: true},
    price: {type: String, required: true},
})

module.exports = model('service', schema)