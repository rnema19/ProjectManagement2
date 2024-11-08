const express = require('express');
const app = express()
const router = express.Router({ mergeParams: true });
const Progress = require('../model/progressSchema');
const Project = require('../model/projectSchema');

router.get('/', async (req, res) => {
    const projectId = req.params.id;

    try {
        // Fetch the project with populated bills
        // const project = await Project.findById(projectId).populate('tender');
        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).send('Project not found');
        }

        console.log(`Displaying progress page for project id: ${projectId}`);
        res.render('progress', { project});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching project');
    }
});

module.exports = router;

