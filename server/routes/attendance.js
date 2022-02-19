const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');


router.get('/',attendanceController.view);
router.post('/',attendanceController.find);
router.get('/addattendance',attendanceController.form);
router.post('/addattendance',attendanceController.create);
router.get('/editattendance/:id',attendanceController.edit);
router.post('/editattendance/:id',attendanceController.update);
router.get('/:id',attendanceController.delete);

module.exports = router;