const express = require('express');
const app = express()
// var Router = require('routes');
var router = express.Router({mergeParams:true})
const path = require('path');
const bill = require('../model/billSchema')
const project = require('../model/projectSchema')


// app.set('views',path.join(__dirname,'../views'))
// app.use(express.static(path.join(__dirname,'./public')))

router.get('/',async(req,res)=>{
    const project_id = req.params.id
    console.log(`Displaying billing page for project id: ${project_id}`)
    res.render('billing',{project_id})
})    

module.exports = router

