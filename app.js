const express = require("express");
const app = express();
const mongodb = require("mongodb");
const path = require("path");
const port = process.env.PORT || 5000;




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

app.get("*", (req, res) => {
    res.send("page not found!");

})



/*-----------------------------
    Server listening here...
-------------------------------*/

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})



