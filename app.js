const express = require("express")
const app = express()
const mongoose = require('mongoose')
var ejsMate = require('ejs-mate')
var methodOverride = require('method-override')
const path = require('path')
const projectroutes = require('./routes/project');
const billroutes = require('./routes/bill');
const progressroutes = require('./routes/progress')
const Project = require('./model/projectSchema')

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

app.use(methodOverride('_method'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/project',projectroutes);
app.use('/project/:id/bill',billroutes)
app.use('/project/:id/progress',progressroutes)


app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/dashboard',async(req,res)=>{
    const projects = await Project.find({})
    var ongoing = 0
    var completed = 0
    for(let i = 0;i<projects.length;i++){
        const s_date = projects[i].startDate
        const e_date = projects[i].expectedDate
        var curr_date = new Date()
        if (curr_date<e_date && curr_date>s_date) {
            ongoing+=1
        }
        if (curr_date>e_date) {
            completed+=1
        }
        console.log(`Start date : ${s_date}, End date : ${e_date}`)
    }

    res.render('dashboard',{ongoing,completed})
})

app.get('/drawings', (req, res) => {
  res.render('drawings');
});


app.listen(3000,()=>{
    console.log("Server started on port 3000!")
})