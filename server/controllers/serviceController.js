const Service = require('../models/Service');


// Create a service
exports.createService = async (req,res,next) => {
try {
const service = await Service.create(req.body);
res.status(201).json(service);
} catch(err){ next(err); }
};


// Get all services
exports.getServices = async (req,res,next) => {
try {
const services = await Service.find();
res.json(services);
} catch(err){ next(err); }
};


// Get one service
exports.getService = async (req,res,next) => {
try {
const service = await Service.findById(req.params.id);
if(!service) return res.status(404).json({ message: 'Service not found' });
res.json(service);
} catch(err){ next(err); }
};


// Update a service
exports.updateService = async (req,res,next) => {
try {
const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new:true });
if(!service) return res.status(404).json({ message: 'Service not found' });
res.json(service);
} catch(err){ next(err); }
};


// Delete a service
exports.deleteService = async (req,res,next) => {
try {
await Service.findByIdAndDelete(req.params.id);
res.json({ message: 'Service deleted' });
} catch(err){ next(err); }
};