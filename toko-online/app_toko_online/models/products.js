const mongoose = require('mongoose');

//buat skema produk dari products.json
const ProductSchema = new mongoose.Schema({
    //tidak perlu membuat properti id karena akan dibuat otomatis
    //dengan nama _id
    name: {
        type: String,
        //required ini adalah validasi untuk memastikan data harus diisi
        //kalau  tidak maka akan muncul pesan error nama produk harus diisi
        required: [true, "Nama produk harus diisi"],
        //trim adalah untuk menghilangkan spasi diawal dan diakhir
        trim:true
    },
    price: {
        type: Number,
        required: [true, "Harga produk harus diisi"],
        min: [1000, "Harga produk minimal 1000"],
        // max: [1000, "Harga produk maksimal 1000"],
    },
    description:{
        type: String,
        required: false,
    },
    stok: {
        type: Number,
        //default adalah memberikan nilai bawaan
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

//buat model dari skema produk
//ketika membuat model diawali huruf kapital
const Product = mongoose.model('Product', ProductSchema,'products');
//params1 adalah nama modelnya
//params2 adalah skema yang digunakan
//params3 adalah nama koleksi di database
module.exports = Product;
