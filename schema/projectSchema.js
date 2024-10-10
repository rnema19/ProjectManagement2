const mongoose = require('mongoose')
const bill = require('./billSchema')
const { Schema } = mongoose

const projectSchema = new Schema({
    title: {type:String,required : true},
    supervisor : {type:Boolean,required : true},
    company : {type:Boolean,required : true},
    overview: {type:String,required : true},
    location: {type:String,required : true},
    duration: {type:String,required : true},
    status: {type:String,required : true},
    startDate: Date,
    progress: Number
})

module.exports = mongoose.model('Project',projectSchema)