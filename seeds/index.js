const mongoose = require('mongoose');
const project = require('../schema/projectSchema');
const data = require('./proj_list');

mongoose.connect('mongodb://localhost:27017/projectDB')
  .then(async () => {
    console.log("Database connected");

    // Log the data to be inserted
    console.log('Data to be inserted:', data);

    try {
      // Optional: Clear existing data
      await project.deleteMany({});

      // Insert data
      const result = await project.insertMany(data);
      console.log(`${result.length} documents were inserted`);

      // Fetch and display projects
      const projects = await project.find({});
      console.log('Projects:', projects);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(error => {
    console.error("Connection error:", error);
  });

console.log('data: ',data)