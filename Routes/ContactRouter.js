const express = require('express');

const router = express.Router();

const {CreateContact, getContacts, DeleteContact} = require('../controllers/ContactControllers');

router.route('/').get(getContacts).post(CreateContact)
router.route('/:id').delete(DeleteContact)

module.exports = router;