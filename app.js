const express = require("express")
const app = express()
const mongoose = require('mongoose')
var ejsMate = require('ejs-mate')
const path = require('path')
const Project = require('./model/projectSchema')
const Bill = require('./model/billSchema')
const billroutes = require('./routes/bill');

mongoose.connect('mongodb://localhost:27017/projectDB').
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/project/:id/bill',billroutes)

// app.get('/viewbill',(req,res)=>{
//     res.render('viewbill')
// })

app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

app.get('/projects', async(req, res) => {
  const projects = await Project.find({})
  res.render('listofprojects', { projects });
  // console.log('Projects',projects)
});

app.get('/project/:id', async (req, res) => {
  const projectId = req.params.id; 
  try {
    const project = await Project.findById(projectId); 

    if (!project) {
      return res.status(404).send('Project not found'); 
    }

    res.render('project_details', {project});
  } catch (error) {
    console.error(error); 
    res.status(500).send('Error fetching project details'); 
  }
});


app.get('/drawings', (req, res) => {
  res.render('drawings');
});


app.listen(3000,()=>{
    console.log("Server started on port 3000!")
})