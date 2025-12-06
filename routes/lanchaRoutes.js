const express = require('express');
const router = express.Router();
const lanchaController = require('../controllers/lanchaController');

router.get('/lanchas', lanchaController.getLanchas);
router.post('/lanchas', lanchaController.addLancha);
router.put('/lanchas', lanchaController.updateLancha);

module.exports = router;
