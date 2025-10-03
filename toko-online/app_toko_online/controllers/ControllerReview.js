var products = require('../../data/products.json');

exports.getReview = (req, res) => {
 	const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    // Kirim kedua parameter ke view untuk ditampilkan
    res.render('review-detail', {
        title: `Ulasan ${reviewId} untuk Produk ${productId}`,
        productId: productId,
        reviewId: reviewId
    });
};