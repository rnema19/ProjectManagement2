const express = require('express');
const app = express()
const router = express.Router({ mergeParams: true });
const Progress = require('../model/progressSchema');
const Project = require('../model/projectSchema');

router.get('/', async (req, res) => {
    const projectId = req.params.id;

    try {
        // Fetch the project with populated progress
        const project = await Project.findById(projectId).populate('progresses');
        // const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).send('Project not found');
        }
        const s_date = project.startDate
        const e_date = project.expectedDate
        var curr_date = new Date()
        const total = e_date-s_date
        const total_days = Math.ceil(( total) / (1000 * 60 * 60 * 24));
        const e_curr = e_date-curr_date
        const time_spent = curr_date-s_date
        const timespent_days = Math.ceil(( time_spent) / (1000 * 60 * 60 * 24));
        const percent = ((timespent_days/total_days)*100).toFixed(2)
        if(curr_date>e_date){
            percent = 100
        }

        console.log(`Displaying progress page for project id: ${projectId}`);
        res.render('progress', {project,percent});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching project');
    }
});

router.get('/addprogress', async (req, res) => {
    const projectId = req.params.id;

    try {
        // Fetch the project with populated progress
        const project = await Project.findById(projectId);
        // const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).send('Project not found');
        }

        res.render('addprogress', {project});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching project');
    }
});

router.post('/addprogress', async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send('Project not found');
        }

        const progress = new Progress(req.body);
        console.log(req.body);
        await progress.save();
        project.progresses.push(progress._id);        
        await project.save();

        
        res.redirect(`/project/${projectId}/progress`);
        console.log(`Progress made: ${project.progresses}`)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding bill');
    }
});

module.exports = router;

