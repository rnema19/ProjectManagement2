const express = require('express');
const app = express()
var router = express.Router({mergeParams:true})
const path = require('path');
const bill = require('../model/billSchema')
const project = require('../model/projectSchema')

router.get('/',async(req,res)=>{
    const project_id = req.params.id
    console.log(`Displaying billing page for project id: ${project_id}`)
    res.render('billing',{project_id})
})    

router.get('/addbill',async(req,res)=>{
    const project_id = req.params.id
    // console.log(`Displaying billing page for project id: ${project_id}`)
    res.render('addbill',{project_id})
}) 

// router.post('/',async(req,res)=>{
//     const project_id = req.params.id
//     console.log(`Displaying billing page for project id: ${project_id}`)

//     res.redirect('billing',{project_id})
// })    

module.exports = router

