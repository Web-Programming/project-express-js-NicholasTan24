var products = require('../../data/products.json');

exports.index = (req, res) => {
 	res.render('index', {
    title: 'Toko Online Sederhana', 
    products: products,
    isSearch: false,
    keyword: req.query.q
});
}; 
