const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./config/db');
const rootDir = require('./utils/rootDir');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/tips",(req,res)=>{
    res.render("tips")
})
app.get("/gallery",(req,res)=>{
    res.render("gallery",{
        title: "SaveWater - Every Drop Counts"
  })
})

app.get("/tracker",(req,res)=>{
    res.render("tracker")
})


app.use(require("./routes/home"));//home routes
app.use(require("./routes/contact"));//about routes
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));

