const Ticket = require('../models/Ticket');
const Service = require('../models/Service');
const Counter = require('../models/Counter');


// Create a ticket
exports.createTicket = async (req,res,next) => {
try {
const { serviceId, customer, priority } = req.body;
const service = await Service.findById(serviceId);
if(!service) return res.status(404).json({ message: 'Service not found' });


const today = new Date(); today.setHours(0,0,0,0);
const count = await Ticket.countDocuments({ serviceId, issuedAt: { $gte: today } });
const number = `${service.code}-${String(count+1).padStart(3,'0')}`;


const ticket = await Ticket.create({ serviceId, number, customer, priority });
req.io.emit('ticket:created', ticket);
res.status(201).json(ticket);
} catch(err){ next(err); }
};


// Get tickets by service
exports.getTicketsByService = async (req,res,next) => {
try {
const tickets = await Ticket.find({ serviceId: req.params.serviceId, status:'waiting' }).sort('issuedAt');
res.json(tickets);
} catch(err){ next(err); }
};


// Call next ticket
exports.callNextTicket = async (req,res,next) => {
try {
const { counterId } = req.body;
const counter = await Counter.findById(counterId);
if(!counter) return res.status(404).json({ message: 'Counter not found' });


const ticket = await Ticket.findOne({ serviceId: { $in: counter.supportedServices }, status: 'waiting' }).sort({ priority: -1, issuedAt: 1 });
if(!ticket) return res.status(404).json({ message: 'No tickets in queue' });


ticket.status = 'called';
ticket.calledAt = new Date();
ticket.counterAssignedId = counter._id;
await ticket.save();


req.io.emit('ticket:called', { ticket, counter });
res.json(ticket);
} catch(err){ next(err); }
};


// Complete a ticket
exports.completeTicket = async (req,res,next) => {
try {
const ticket = await Ticket.findById(req.params.id);
if(!ticket) return res.status(404).json({ message: 'Ticket not found' });


ticket.status = 'completed';
ticket.completedAt = new Date();
await ticket.save();


req.io.emit('ticket:completed', ticket);
res.json(ticket);
} catch(err){ next(err); }
};


// Cancel a ticket
exports.cancelTicket = async (req,res,next) => {
try {
const ticket = await Ticket.findById(req.params.id);
if(!ticket) return res.status(404).json({ message: 'Ticket not found' });


ticket.status = 'cancelled';
await ticket.save();


req.io.emit('ticket:cancelled', ticket);
res.json(ticket);
} catch(err){ next(err); }
};