const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');


router.get('/',facultyController.view);
router.post('/',facultyController.find);
router.get('/addfaculty',facultyController.form);
router.post('/addfaculty',facultyController.create);
router.get('/editfaculty/:id',facultyController.edit);
router.post('/editfaculty/:id',facultyController.update);
router.get('/:id',facultyController.delete);

module.exports = router;