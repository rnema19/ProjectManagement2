const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = {
    title: String,
    overview: String,
    location: String,
    duration: String,
    status: String,
    startDate: Date,
    endDate: Date,
    progress: Number
}

module.exports = projectSchema