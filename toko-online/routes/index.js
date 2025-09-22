var express = require('express');
//fungsi require bisa untuk mengimpor resource selain import dari jsnya
var router = express.Router();
var products = require('../data/products.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Toko Online Sederhana', 
    products: products});
});

module.exports = router;
