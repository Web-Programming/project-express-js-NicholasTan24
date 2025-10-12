var Product = require('../models/products');

// const index = (req, res) => {
//  	res.render('index', {
//     title: 'Toko Online Sederhana', 
//     products: products,
//     isSearch: false,
//     keyword: req.query.q
// });
const index = async (req, res)=>{
    try{
        //gunakan find({})
        //untuk mengambil seluruh data dari collection
        const prod = await Product.find({});//mengambil seluruh data dari colletion
        res.render("index",{
            title: "Toko Online Sederhana",
            products: prod,
            isSearch: false,
            keyword: req.query.q
        });
    } catch (err){
        res.status(500).send("Gagal memuat produk");
    };

}; 
module.exports = {index};