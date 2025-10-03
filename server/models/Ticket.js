const mongoose = require('mongoose');


const TicketSchema = new mongoose.Schema({
serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
number: { type: String, required: true },
status: { type: String, enum: ['waiting','called','serving','completed','cancelled'], default: 'waiting' },
issuedAt: { type: Date, default: Date.now },
calledAt: Date,
servedAt: Date,
completedAt: Date,
customer: { name: String, phone: String, email: String },
priority: { type: Number, default: 0 },
counterAssignedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' },
});


module.exports = mongoose.model('Ticket', TicketSchema);