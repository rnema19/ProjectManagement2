const express = require('express');
const app = express()
var router = express.Router({mergeParams:true})
const Project = require('../model/projectSchema')

router.get('/', async(req, res) => {
  const projects = await Project.find({})
//   const s_date = projects.startDate
//     const e_date = projects.expectedDate
//     var curr_date = new Date()
//     const total = e_date-s_date
//     const total_days = Math.ceil(( total) / (1000 * 60 * 60 * 24));
//     const e_curr = e_date-curr_date
//     const time_spent = curr_date-s_date
//     const timespent_days = Math.ceil(( time_spent) / (1000 * 60 * 60 * 24));
//     const percent = ((timespent_days/total_days)*100).toFixed(2)
//     if(curr_date>e_date){
//         percent = 100
//     }
  res.render('listofprojects', { projects });
//   console.log('Projects',projects)
});

router.get('/:id', async (req, res) => {
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

module.exports = router

