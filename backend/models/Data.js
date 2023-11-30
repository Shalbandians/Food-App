const mongoose = require('mongoose')

const { Schema } = mongoose;

const dataSchema = new Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    Option: {
        half: String,
        full: String,
    },
    description: {
        type: String,
        required: true
    },


})
module.exports = mongoose.model('food_Data', dataSchema)