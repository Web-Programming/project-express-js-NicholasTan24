var products = require('../../data/products.json');

const getProductById = (req, res) => {
 	const productId = parseInt(req.params.id); // tangkap id dari url
    const product = products.find(p => p.id === productId); // cari produk berdasarkan id

    if(!product){
        return res.status(404).send("Produk tidak ditemukan");
    }
    res.render("product-detail", 
        {
            title: product.name, 
            product: product
        }
    );
}; 
module.exports = { getProductById};