const express = require('express');
const router = express.Router();
const feesController = require('../controllers/feesController');


router.get('/',feesController.view);
router.post('/',feesController.find);
router.get('/addfees',feesController.form);
router.post('/addfees',feesController.create);
router.get('/editfees/:id',feesController.edit);
router.post('/editfees/:id',feesController.update);
router.get('/:id',feesController.delete);

module.exports = router;