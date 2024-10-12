const express = require('express');
const app = express()
var Router = require('routes');
var router = express.Router()
const path = require('path');
const {billSchema} = require('../model/billSchema')
const {projectSchema} = require('../model/projectSchema')


app.set('views',path.join(__dirname,'../views'))
app.use(express.static(path.join(__dirname,'./public')))

router.get('/bill',async(req,res)=>{
    res.render('billing')
})    

module.exports = router

