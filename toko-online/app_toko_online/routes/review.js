var express = require('express');
var router = express.Router();
var reviewController = require('../controllers/ControllerReview');

router.get('/:reviewId', reviewController.getReview);

module.exports = router;