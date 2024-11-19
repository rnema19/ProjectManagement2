const express = require('express');
const app = express()
const router = express.Router({ mergeParams: true });
const Progress = require('../model/progressSchema');
const Project = require('../model/projectSchema');
const {storage} = require('../cloudinary/index')
const multer = require('multer')
const upload = multer({ storage})


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
        // const e_curr = e_date-curr_date
        const time_spent = curr_date-s_date
        const timespent_days = Math.ceil(( time_spent) / (1000 * 60 * 60 * 24));

        let percent = ((timespent_days/total_days)*100).toFixed(2)
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

router.get('/:progressId/viewprogress', async (req, res) => {
    const { progressId } = req.params;

    try {
        // Fetch the progress by ID
        const progress = await Progress.findById(progressId);
        if (!progress) {
            return res.status(404).send('Progress not found');
        }

        // Optionally, fetch the associated project if needed for context
        const project = await Project.findOne({ progresses: progressId });
        if (!project) {
            console.warn(`Project containing progress ID ${progressId} not found`);
        }

        res.render('viewprog_task', { project, progress });
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).send('Error fetching progress');
    }
});

router.put('/:progressId/editprogress', async (req, res) => {
     const { id: projectId, progressId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send('Project not found');
        }

        const updatedProgress = await Progress.findByIdAndUpdate(
            progressId,
            { $set: req.body.progress }, // Update the progress data
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedProgress) {
            return res.status(404).send('Progress not found');
        }

        console.log(`Progress updated: ${updatedProgress.task}`);
        res.redirect(`/project/${projectId}/progress/${progressId}/viewprogress`); // Redirect to the updated bill's page
    } catch (error) {
        console.error('Error updating the bill:', error);
        res.status(500).send('Error updating the bill');
    }
})

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

router.post('/addprogress', upload.array('image', 3), async (req, res) => {
    const projectId = req.params.id;
    console.log(projectId)

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send('Project not found');
        }

// /*
        // Extract only the expected fields from req.body
        const { task, initial_date, final_date, percentage, completed, description } = req.body;
        const progress = new Progress({
            task,
            initial_date,
            final_date,
            percentage,
            completed,
            description
        });

        const img = req.files;
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);

        progress.image = img.map(f => ({ fileName: f.filename, url: f.path }));
        await progress.save();

        project.progresses.push(progress._id);
        await project.save();

        res.redirect(`/project/${projectId}/progress`);
        console.log(`Progress made: ${project.progresses}`);
        // */
    } catch (error) {
        console.error('Error adding progress:', error);
        res.status(500).send('Error adding progress');
    }
});




module.exports = router;

