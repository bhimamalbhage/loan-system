const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    loan: [
        {
            name:{
                type : String,
                required: true
            },
            address: {
                type : String,
                required: true
            },
            contactno:{
                type: Number,
                required: true
            },
            email:{
                type : String,
                required: true
            },
            loanamt:{
                type : Number,
                required: true
            },
            startdate:{
                type : Date,
                required: true
            },
            enddate:{
                type : Date,
                required: true
            },
            installments:{
                type : Number,
                required: true
            },
        }
    ]
})

module.exports = User = mongoose.model('user', UserSchema);