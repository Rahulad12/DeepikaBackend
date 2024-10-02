const express = require('express');
const router = express.Router();

const {getNotice, CreateNotice, DeleteNotice,setShowNotice} = require('../controllers/NoticeControllers');
const { set } = require('mongoose');


router.route('/').get(getNotice).post(CreateNotice);
router.route('/:id').delete(DeleteNotice)
router.route('/:id').put(setShowNotice)

module.exports = router;