const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');


router.post('/', ticketController.createTicket);
router.get('/service/:serviceId', ticketController.getTicketsByService);
router.post('/call-next', ticketController.callNextTicket);
router.put('/:id/complete', ticketController.completeTicket);
router.put('/:id/cancel', ticketController.cancelTicket);


module.exports = router;