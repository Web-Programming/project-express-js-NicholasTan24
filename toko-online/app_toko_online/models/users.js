const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username harus diisi"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email harus diisi"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Harap isi alamat email yang valid'],//regex untu validasi format email
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password harus diisi"],
        minlength: [6, "Kata sandi minimal 6 karakter"],
        select: false //Penting: jangan sertakan password saat query GET
    },
    address:{
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
    }
});
const Users = mongoose.model('Users', UserSchema,'users');
module.exports = Users;