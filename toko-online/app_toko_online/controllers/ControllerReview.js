// var products = require('../../data/products.json');

// const getReview = (req, res) => {
//  	const productId = req.params.productId;
//     const reviewId = req.params.reviewId;
//     // Kirim kedua parameter ke view untuk ditampilkan
//     res.render('review-detail', {
//         title: `Ulasan ${reviewId} untuk Produk ${productId}`,
//         productId: productId,
//         reviewId: reviewId
//     });
// };
// module.exports = {getReview};

const Product = require('../models/products');

const getReview = async (req, res) => {
  try {
    const productId = req.params.productId; 
    const reviewId = req.params.reviewId;   

    // cari produk berdasarkan ObjectId dari MongoDB
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Produk tidak ditemukan");
    }

    const review = product.reviews?.id(reviewId);

    if (!review) {
      return res.status(404).send("Review tidak ditemukan");
    }

    res.render('review-detail', {
      title: `Ulasan ${reviewId} untuk Produk ${productId}`,
      product,
      review
    });

  } catch (err) {
    res.status(500).send("Gagal memuat review produk");
  }
};

module.exports = { getReview };
