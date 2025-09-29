var express = require('express');
//router adalah class express untuk membuat modul route
var router = express.Router();


// router.get("/:id", function(req, res, next){
//     const productId = parseInt(req.params.id); // tangkap id dari url
//     const product = products.find(p => p.id === productId); // cari produk berdasarkan id

//     if(!product){
//         return res.status(404).send("Produk tidak ditemukan");
//     }
//     res.render("product-detail", 
//         {
//             title: product.name, 
//             product: product
//         }
//     );
// });
module.exports = router;