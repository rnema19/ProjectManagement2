const express = require("express")
const app = express()
const mongoose = require('mongoose')
var ejsMate = require('ejs-mate')
const path = require('path')

mongoose.connect('mongodb://localhost:27017/bill').
    then(() => {
        console.log("Connection Successful!!!")
    })
    .catch(error => {
      console.log("Oh no error")
      console.log(error)
    
})

const db = mongoose.connection
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",() =>{
    console.log("Database connected")
})

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./views'))
app.use(express.static(path.join(__dirname,'./public')))

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

app.get('/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      name: "PG Classroom Complex",
      supervisor: "Dr. Abhay Tawalare",
      company: "Mana Constructions",
      completion: 10,
    },
    // ... other projects
  ];
  res.render('listofprojects', { projects });
});

app.get('/projectdetails', (req, res) => {
  const project = {
    title: "PG Classroom CRC Project",
    overview: "The PG Classroom CRC project aims to construct a state-of-the-art classroom for postgraduate students.",
    location: "Visvesvaraya National Institute of Technology, Nagpur",
    duration: "15 months (Expected completion: May 2025)",
    status: "The project is currently in the initial construction phase. Foundation work has been completed, and the structural frame is being erected.",
  };

  const projectLinks = [
    { name: "Drawing", url: "https://drive.google.com/file/d/1lXZuO1jUawBBq-8PyVt6vQBNkGVujQWk/view?usp=sharing" },
    { name: "Tender", url: "https://drive.google.com/file/d/1b5tlf2VyGhGH2Fb8K7yxRBrFVkJ87tBf/view?usp=sharing" },
    { name: "Bill", url: "https://example.com/bill" },
    { name: "Progress", url: "https://example.com/progress" },
    { name: "Extra Stuff", url: "https://example.com/extra-stuff" },
  ];

  res.render('project_details', { project, projectLinks });
});

app.get('/drawings', (req, res) => {
  const drawings = [
    { name: 'Drawing Name 1', imageUrl: 'drawing1.jpg' },
    { name: 'Drawing Name 2', imageUrl: 'drawing2.jpg' },
    { name: 'Drawing Name 3', imageUrl: 'drawing3.jpg' },
    // ...more drawings
  ];
  res.render('drawings', { drawings });
});


app.listen(3000,()=>{
    console.log("Server started on port 3000!")
})