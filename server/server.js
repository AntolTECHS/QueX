const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const ticketRoutes = require('./routes/tickets');
const serviceRoutes = require('./routes/services');
const counterRoutes = require('./routes/counters');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');


dotenv.config();


const app = express();
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error(err));


// HTTP + Socket server
const server = http.createServer(app);
const io = new Server(server, { cors:{ origin:'*' } });


// Attach io to req for controllers
app.use((req,res,next)=>{ req.io = io; next(); });


// Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/counters', counterRoutes);
app.use('/api/users', userRoutes);


// Error handler
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));