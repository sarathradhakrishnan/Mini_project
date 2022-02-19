const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');


router.get('/',subjectController.view);
router.post('/',subjectController.find);
router.get('/addsubject',subjectController.form);
router.post('/addsubject',subjectController.create);
router.get('/editsubject/:id',subjectController.edit);
router.post('/editsubject/:id',subjectController.update);
router.get('/:id',subjectController.delete);

module.exports = router;