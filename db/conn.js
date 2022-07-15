const mongoose = require('mongoose');

const DB = `mongodb+srv://azkar:dazzazkar@cluster0.qajn38z.mongodb.net/FreeCourse?retryWrites=true&w=majority`;
mongoose.connect(DB).then(()=>{
    console.log("Connection Successful");
}).catch(()=>{
    console.log("not connected")
})