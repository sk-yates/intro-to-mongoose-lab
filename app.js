const prompt = require('prompt-sync')();

/*--------------------------------------------------------------*/

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

// Importing the model
const Modone = require('./models/modone')

const connect = async () => {
    // Connect to MongoDB using the MONGODB_URI specified in our .env file.
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log('Connected to MongoDB');

    // Call the chooseOption function, which will show the user the choose option menu
    chooseOption();
};

const createCRM = async () => {
    console.log("");
    console.log('Type "exit" to return to the main menu')
    console.log("");
    const name = prompt('Enter the name of customer: ');
    if (name === 'exit') {
        return chooseOption();
    };

    const age = prompt('Enter the age of the customer: ');
    if (age === 'exit') {
        return chooseOption();
    };

    const crmData = {
        name: name,
        age: age,
    };

    const crmEntry = await Modone.create(crmData);

    console.log('New customer:', crmEntry)
    chooseOption();
};

const findCRMs = async () => {
    const crmEntries = await Modone.find({});

    console.log('Below is a list of all current customers:', crmEntries);
    chooseOption();
};

const findEntryByID = async () => {
    console.log("");
    console.log('Type "exit" to return to the main menu');
    console.log("");
    const pastedID = prompt('Copy and paste the id of the customer you would like to find here: ');
    if (pastedID === 'exit') {
        return chooseOption();
    };
    const crmEntry = await Modone.findById(pastedID);



    console.log('One customer found by ID:', crmEntry)
    chooseOption();
};

const updateCRM = async () => {
    console.log("");
    console.log('Type "exit" to return to the main menu');
    console.log("");
    const pastedID = prompt('Copy and paste the id of the customer you would like to update here: ');

    if (pastedID === 'exit') {
        return chooseOption();
    };

    const id = pastedID;
    const newName = prompt('Enter the new name of customer: ');
    const newAge = parseInt(prompt('Enter the new age of the customer: '));
    const updatedCRM = await Modone.findByIdAndUpdate(
        id,
        {
            name: newName,
            age: newAge,
        },
        { new: true });

    console.log("Updated customer:", updatedCRM);
    chooseOption();
};

const deleteCRM = async () => {
    console.log("");
    console.log('Type "exit" to return to the main menu');
    console.log("");
    const pastedID = prompt('Copy and paste the id of the customer you would like to delete here: ');

    if (pastedID === 'exit') {
        return chooseOption();
    };

    const id = pastedID;
    const removedCRM = await Modone.findByIdAndDelete(id);
    console.log('Deleted customer:', removedCRM);
    chooseOption();
};

const exitCRM = async () => {
    mongoose.connection.close();
    console.log("");
    console.log("");
    console.log('exiting...');
    console.log("");
    console.log("");
    console.log("CRM Closed");
    console.log("");
};

const chooseOption = () => {
    console.log("");
    console.log("Welcome to the CRM");
    console.log("");
    console.log("What would you like to do?");
    console.log("");
    console.log("");
    console.log("1. Create a customer");
    console.log("2. View all customers");
    console.log("3. Find a customer by ID");
    console.log("4. Update a customer");
    console.log("5. Delete a customer");
    console.log("6. Quit");
    console.log("");
    console.log("");
    const optionSelect = parseInt(prompt('Please key one of the options above: '));

    if (optionSelect === 1) {
        createCRM();
    } else if (optionSelect === 2) {
        findCRMs();
    } else if (optionSelect === 3) {
        findEntryByID();
    } else if (optionSelect === 4) {
        updateCRM();
    } else if (optionSelect === 5) {
        deleteCRM();
    } else if (optionSelect === 6) {
        exitCRM();
    } else {
        console.log("")
        console.log("")
        console.log("Key not recognised, please choose from the options provided")
        console.log("")
        console.log("")
        chooseOption();
    }

};







connect()