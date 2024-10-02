const express = require('express');
const router = express.Router();    

const { createEvent, getAllEvents, UpdateEvent, DeleteEvent } = require('../controllers/EventController');

router.route('/').post(createEvent).get(getAllEvents);
router.route('/:id').put(UpdateEvent).delete(DeleteEvent);

module.exports = router;