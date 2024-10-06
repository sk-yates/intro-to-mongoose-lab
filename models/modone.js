const mongoose = require('mongoose');

const modoneSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

// Let's compile the schema into a model

const Modone = mongoose.model('Modone', modoneSchema);

// lastly, let's export the compiled model

module.exports = Modone;