const express = require('express');
const app = express()
var router = express.Router({mergeParams:true})
const path = require('path');
const project = require('../model/projectSchema')

router.get('/',async(req,res)=>{
    const project_id = req.params.id
    res.render('project_details',{project_id})
})    

module.exports = router

