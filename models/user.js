const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        reequied:true,
        minimum:8,

    },
    enrolled_course:{
        type:Array,

    }

})

const User = new mongoose.model("user",userSchema);

module.exports = User;