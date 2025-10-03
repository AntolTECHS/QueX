const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true },
phone: String,
password: String,
role: { type: String, enum: ['customer','agent','admin'], default: 'customer' },
assignedCounterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' }
});


module.exports = mongoose.model('User', UserSchema);