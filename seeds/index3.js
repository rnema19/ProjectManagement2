const mongoose = require('mongoose');
const Bill = require('../model/billSchema'); // Reference to the Bill model
const Project = require('../model/projectSchema'); // Reference to the Project model
const bill_data = require('./bill_list'); // Import bill data
const proj_data = require('./proj_list');

mongoose.connect('mongodb://localhost:27017/projectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log("Database connected");

    try {
        
        // Fetch the "CRC Classroom" project and populate its bills
        const projectToUpdate = await Project.findOne({ title: 'PG Classroom Complex' }).populate('bills');

        if (projectToUpdate && projectToUpdate.bills.length > 0) {
            console.log(`Displaying bills for ${projectToUpdate.title}:`);
            for(let bill of projectToUpdate.bills) {
                console.log(`Bill ID: ${bill.bill_id}`);
                console.log(`Bill Name: ${bill.Bill_Name}`);
                // console.log(`Date: ${bill.date}`);
                // console.log(`Total Amount: ${bill.total_amount}`);
                console.log('------------------------');
                for(let item of bill.items){
                    console.log(`Item Name: ${item.name}`)
                    console.log(`Quantity: ${item.quantity}`)
                    console.log(`Units: ${item.units}`)
                    console.log(`rate: ${item.rate}`)
                    console.log(`amount: ${item.amount}`)
                    console.log('------------------------');
                }
                
            };
        } else {
            console.log('No bills found for CRC Classroom.');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        mongoose.connection.close();
    }
})
.catch(error => {
    console.error("Connection error:", error);
});
