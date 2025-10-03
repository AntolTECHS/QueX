const mongoose = require('mongoose');


const CounterSchema = new mongoose.Schema({
name: { type: String, required: true },
location: String,
status: { type: String, enum: ['open','closed','busy','idle'], default: 'closed' },
supportedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
});


module.exports = mongoose.model('Counter', CounterSchema);