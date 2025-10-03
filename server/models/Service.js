const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema({
name: { type: String, required: true },
code: { type: String, required: true, unique: true },
averageServiceTime: { type: Number, default: 300 }, // in seconds
priorityRules: { type: Object, default: {} },
});


module.exports = mongoose.model('Service', ServiceSchema);