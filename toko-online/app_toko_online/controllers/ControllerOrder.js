const Order = require('../models/orders');
const Product = require('../models/products');

const createOrder = async (req, res) => {
  try {
    // 1. Ambil data dari request body
    const user = req.body.user;
    const orderItems = req.body.orderItems;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Order Items tidak boleh kosong",
      });
    }

    const newOrderItems = [];
    let totalAmount = 0; // inisialisasi total harga semua item

    // 2. Validasi dan proses setiap item
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          status: false,
          message: `Produk dengan ID ${item.product} tidak ditemukan`
        });
      }

      const priceAtOrder = product.price;
      const itemTotal = priceAtOrder * item.quantity;
      totalAmount = totalAmount + itemTotal;

      newOrderItems.push({
        product: item.product,
        quantity: item.quantity,
        priceAtOrder: priceAtOrder,
        totalAmount: totalAmount
      });
    }

    // 3. Buat dokumen order baru
    const newOrder = new Order({
      user: user,
      orderItems: newOrderItems,
      totalAmount: totalAmount
    });

    // 4. Simpan ke database
    const createdOrder = await newOrder.save();

    // 5. Kirim response ke client
    res.status(201).json({
      status: true,
      message: "Order berhasil dibuat",
      data: createdOrder
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const user = req.body.user;
    const orderItems = req.body.orderItems;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order tidak ditemukan"
      });
    }

    // update user jika dikirim
    if (user) {
      order.user = user;
    }

    // kalau ada orderItems baru, validasi ulang semua
    if (orderItems && orderItems.length > 0) {
      const updatedItems = [];
      let totalAmount = 0;

      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({
            status: false,
            message: `Produk dengan ID ${item.product} tidak ditemukan`
          });
        }

        const priceAtOrder = product.price;
        const itemTotal = priceAtOrder * item.quantity;
        totalAmount += itemTotal;

        updatedItems.push({
          product: item.product,
          quantity: item.quantity,
          priceAtOrder: priceAtOrder,
          totalAmount: itemTotal,
          status: item.status || "Pending"
        });
      }

      order.orderItems = updatedItems;
      order.totalAmount = totalAmount;
    }

    const updatedOrder = await order.save();

    res.status(200).json({
      status: true,
      message: "Order berhasil diperbarui",
      data: updatedOrder
    });

  } catch (err) {
    console.error("Error updateOrder:", err);
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    res.status(200).json({
      status: true,
      message: "Berhasil mengambil semua order",
      data: orders
    });
  } catch (err) {
    console.error("Error getAllOrders:", err);
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order tidak ditemukan"
      });
    }

    res.status(200).json({
      status: true,
      message: "Detail order ditemukan",
      data: order
    });
  } catch (err) {
    console.error("Error getOrderDetail:", err);
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Order tidak ditemukan"
      });
    }

    res.status(200).json({
      status: true,
      message: "Order berhasil dihapus"
    });
  } catch (err) {
    console.error("Error deleteOrder:", err);
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

module.exports = {createOrder, updateOrder, getAllOrders, getOrderDetail, deleteOrder};
