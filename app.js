const express = require("express");
const app = express();
const mongodb = require("mongodb");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const port = process.env.PORT || 5000;


// Databse Schema and models
require("./db/conn");
const User = require("./models/user");
const Course = require("./models/freecourse");

// for url parser
app.use(express.json());
app.use(express.urlencoded());


// Setting the stati files .
app.use("/static", express.static("static"));

// Setting the template engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//Multer Initialization
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
function fileFilter(req, file, cb) {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        //console.log("inside true");

        cb(null, true)
    }
    else {
        //console.log("inside false")
        cb(null, false)

    }


}
const maxSize = 5 * 1024 * 1024;
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: fileFilter
})

/*------------------------------------------------------
                ROUTE
---------------------------------------------------------*/
app.get("/", async (req, res) => {

    const result = await Course.find({trend:"top five"}).limit(5);
    // console.log(result)
    res.render("index",{result});


})
app.get("/course", async (req, res) => {
    const most_download = await Course.aggregate([{$match:{trend:{$in:["most downloaded", "most downloaded"]}}}]);
    const programming_courses = await Course.aggregate([{$match:{category:{$in:["programming", "coding","dsa"]}}}]);
    const hacking_courses = await Course.aggregate([{$match:{category:{$in:["hacking", "carding"]}}}]);

    // console.log(programming_courses);

    res.render("course",{most_download,programming_courses,hacking_courses});

})

app.get("/login", async (req, res) => {
    res.render("login");

})

app.post("/login", async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        responce = await User.findOne({ email });
        if (responce) {
            if (responce.password === password) {
                res.redirect("/course");
            }
            else {
                res.send("Wrong password")
            }
        }
        else {
            res.send("Invalid email address");
        }

    } catch (error) {
        res.send(error)

    }


})

app.get("/signup", async (req, res) => {
    res.render("register");

})
app.post("/signup", async (req, res) => {
    try {
        if (req.body.password === req.body.cnf_password) {
            const user = new User({ name: req.body.name, email: req.body.email, password: req.body.password })
            await user.save();
            res.redirect("/course");
        }
        else {
            res.send("both password should same and minim 8 charector");
        }
    } catch (error) {
        res.send(error)

    }


})



app.post("/uploadcourse", upload.single("imageFile"), async (req, res) => {
    let totalCourses = await Course.findOne().sort({c_id:-1});
    let totalcourse = totalCourses.c_id
    let c_id = totalcourse+1;
    let cat = req.body.category.split(",");
    let keyword = req.body.keyword.split(",");
    let trend = req.body.trends.split(",");
    try {
        const course = new Course({
            c_id:c_id,
            title: req.body.title,
            discription: req.body.description,
            author: req.body.author,
            duration: req.body.duration,
            language: req.body.language,
            image: req.file.path,
            category: cat,             //Array
            keyword: keyword,               //Array
            link: req.body.link,
            trend: trend,                   //Array

        }
        )

        await course.save()
        res.send("Course has been saved in database");

    } catch (error) {
        const filepath = path.join(__dirname,req.file.path);
        fs.unlink(req.file.path,function(err){
            if (err) throw err;
            //console.log("deleted");
        })
        if(error.code === 11000)
        {
            res.send(" Course title already exist, It should be unique");
        }
        else
        {

            console.log(error);
            res.send(`Error : ${error._message}`);
        }


    }

})
app.get("/admin",(req,res)=>{
    res.render("admin")
})
app.post("/upload", async (req, res) => {
    let totalCourses = await Course.findOne().sort({c_id:-1});
    let totalcourse = totalCourses.c_id
    res.render("upload",{c_id:totalcourse});
})

app.post("/allcourse", async (req, res) => {
    const courses = await Course.find();
    // console.log(courses)
    res.render("allcourse",{courses:courses});
})
app.post("/update", async (req, res) => {

    res.render("update",);
})

app.post("/updatecourse",async (req,res)=>{
    const course_id = req.body.c_id;
    try {
        const responce = await Course.findOne({c_id:course_id})
        if(responce)
        {
            // res.send(responce)
            res.render("updatecourse",{responce});

        }   
        else
        {
            res.send("No record found! please enter a valid code.")
        }                           

    } catch (error) {
        res.send(error)
        
    }
    
})

app.get("*", (req, res) => {
    res.send("page not found!");

})



/*-----------------------------
    Server listening here...
-------------------------------*/

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})



