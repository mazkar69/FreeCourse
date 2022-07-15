const express = require("express");
const app = express();
const mongodb = require("mongodb");
const path = require("path");
require("./db/conn");
const User = require("./models/user");
const port = process.env.PORT || 5000;

// for url parser
app.use(express.json());
app.use(express.urlencoded());


// Setting the stati files .
app.use("/static", express.static("static"));

// Setting the template engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));



app.get("/", async (req, res) => {
    res.render("index");


})
app.get("/course", async (req, res) => {
    res.render("course");

})
app.get("/login", async (req, res) => {
    res.render("login");

})
app.post("/login", async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        responce = await User.findOne({email});
        if(responce)
        {
            if(responce.password === password)
            {
                res.redirect("/course");
            }
            else{
                res.send("Wrong password")
            }
        }
        else{
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

app.get("*", (req, res) => {
    res.send("page not found!");

})



/*-----------------------------
    Server listening here...
-------------------------------*/

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})



