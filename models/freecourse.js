const mongoose = require("mongoose");

const freecourseSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:[2,"Title should be minimum 5 charector"],
        maxlength:[100,"Title should be under 100 charector"],
    },
    discription:{
        type:String,
        required:true,
        trim:true,
        minlength:[10,"Mininum 10 charector"],
        maxlength:[400,"maximin charector allowed 400"],

    },
    author:{
        type:String,
        minlength:[2,"name should be minimum 2 charector"],
        maxlength:[100,"Title should be under 100 charector"],
        trim:true,

    },
    duration:{
        type:Number,
        required:true,
        
    },
    language:{
        type:String,
        trim:true,
        default:"English",


    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:Array,
        required:true,
    },
    keyword:{
        type:Array,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    download:{
        type:Number,

    },
    trend:{
        type:Array,

    },
    comment:{
        type:Array,

    },
    uploadtime:{
        type:Date,
        default:Date.now(),
    }
})

// Models 

const Course = new mongoose.model("course",freecourseSchema);

module.exports = Course;