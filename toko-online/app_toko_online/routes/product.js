var express = require('express');
//router adalah class express untuk membuat modul route
var router = express.Router();
var productController = require('../controllers/ControllerProduct');
var reviewController = require('../controllers/ControllerReview.js');

router.get('/:id', productController.getProductById);
router.get('/:productId/review/:reviewId', reviewController.getReview);

module.exports = router;
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

// 1. Modifikasi Route Detail: Di routes/products.js, buat route baru untuk melihat ulasan produk, yang memerlukan ID Produk dan ID Ulasan.

// // Contoh Route
// router.get('/:productId/review/:reviewId', function(req, res, next) {
//     const productId = req.params.productId;
//     const reviewId = req.params.reviewId;
//     // Kirim kedua parameter ke view untuk ditampilkan
//     res.render('review-detail', {
//         title: Ulasan ${reviewId} untuk Produk ${productId},
//         productId: productId,
//         reviewId: reviewId
//     });
// });
