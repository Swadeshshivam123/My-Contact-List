const express = require('express');
const router = express.Router();

console.log('Home Router loaded...');

const homeController = require('../controllers/homeController');

router.get('/', homeController.home);

router.use('/create-contact', require('./newContact'));

module.exports = router;
