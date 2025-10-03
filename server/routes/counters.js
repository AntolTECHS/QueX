const express = require('express');
const router = express.Router();
const counterController = require('../controllers/counterController');


router.post('/', counterController.createCounter);
router.get('/', counterController.getCounters);
router.get('/:id', counterController.getCounter);
router.put('/:id', counterController.updateCounter);
router.delete('/:id', counterController.deleteCounter);


module.exports = router;