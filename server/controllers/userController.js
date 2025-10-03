const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register
exports.registerUser = async (req,res,next) => {
try {
const { name, email, phone, password, role } = req.body;
const existing = await User.findOne({ email });
if(existing) return res.status(400).json({ message: 'User already exists' });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);


const user = await User.create({ name, email, phone, password: hashed, role });
res.status(201).json(user);
} catch(err){ next(err); }
};


// Login
exports.loginUser = async (req,res,next) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if(!user) return res.status(400).json({ message: 'Invalid credentials' });


const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id:user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn:'1d' });
res.json({ token, user });
} catch(err){ next(err); }
};


// Get profile
exports.getProfile = async (req,res,next) => {
try {
const user = await User.findById(req.user.id).select('-password');
res.json(user);
} catch(err){ next(err); }
};


// Update user
exports.updateUser = async (req,res,next) => {
try {
const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true }).select('-password');
if(!user) return res.status(404).json({ message: 'User not found' });
res.json(user);
} catch(err){ next(err); }
};


// Delete user
exports.deleteUser = async (req,res,next) => {
try {
await User.findByIdAndDelete(req.params.id);
res.json({ message: 'User deleted' });
} catch(err){ next(err); }
};