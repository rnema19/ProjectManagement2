const mongoose = require('mongoose')
const {Schema} = mongoose

const billSchema = new Schema({
    "bill_id": Number,
    "date": Date,
    "Bill_Name" :  String,

    "items": [
        {
            "item_id": Number,
            "name": String,
            "quantity": Number,
            "rate": Number,
            "amount": Number
        }
    ],
    "total_amount": Number
}
);

module.exports = mongoose.model('Bill',billSchema)