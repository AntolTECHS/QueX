const Counter = require('../models/Counter');


// Create counter
exports.createCounter = async (req,res,next) => {
try {
const counter = await Counter.create(req.body);
res.status(201).json(counter);
} catch(err){ next(err); }
};


// Get all counters
exports.getCounters = async (req,res,next) => {
try {
const counters = await Counter.find().populate('supportedServices');
res.json(counters);
} catch(err){ next(err); }
};


// Get one counter
exports.getCounter = async (req,res,next) => {
try {
const counter = await Counter.findById(req.params.id).populate('supportedServices');
if(!counter) return res.status(404).json({ message: 'Counter not found' });
res.json(counter);
} catch(err){ next(err); }
};


// Update counter
exports.updateCounter = async (req,res,next) => {
try {
const counter = await Counter.findByIdAndUpdate(req.params.id, req.body, { new:true });
if(!counter) return res.status(404).json({ message: 'Counter not found' });
res.json(counter);
} catch(err){ next(err); }
};


// Delete counter
exports.deleteCounter = async (req,res,next) => {
try {
await Counter.findByIdAndDelete(req.params.id);
res.json({ message: 'Counter deleted' });
} catch(err){ next(err); }
};