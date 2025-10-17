var User = require('../models/users');


const detail = async (req, res) => {
 	try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).send("User tidak ditemukan");
        }
        res.render("user-detail", 
            {
                title: user.username, 
                user: user
            }
        );
    } catch (err) {
        res.status(404).send("Gagal memuat detail user");
    }
}; 


//membuat rest api
const allUser = async (req, res) => {
 	try {
        const user = await User.find({}); 
        res.status(200).json(
            {
                status: true,
                message: "Data user berhasil diambil",
                data: user
            });
    }catch(err){
        res.status(500).json({
            status : false,
            message: "Gagal memuat user"
        });
    }
}; 

//Create/insert data
const createUser = async (req, res) => {
    try {
        //1. ambil data dari request body
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            isAdmin: req.body.isAdmin
        });
        //2. simpan data ke mongodb melalui model
        const user = await newUser.save();
        //3. kirim response berhasil ke user
        res.status(200).json({
            status : true,
            message: "User berhasil disimpan",
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status : false,
            message: "Internal server error"
        });
    }
};

//read one-detail
const userDetail = async (req, res) => {
    try {
        const userId = req.params.id; // tangkap id dari url
        const user = await User.findById(userId); // cari produk berdasarkan id
        res.status(201).json({
            status : true,
            message: "Data user berhasil diambil",
            data: user
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            res.status(400).json({
            status: false,
            message: err.message
            });
        }else{
            res.status(500).json({
            status : false,
            message: "Internal server error"
        });
        }
    }
};

//update
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true, //mengembalikan dokumen yang telah diupdate
                runValidators: true // menjalankan validasi schema saat update
            });
        if(!user){
            res.status(404).json({
                status: false,
                message: "User tidak ditemukan"
            });
        }
        //kirim respon sukses
        res.status(200).json({
            status: true,
            message: "User berhasil diupdate",
            data: user
        });

    } catch (err) {
        if (err.name === "CastError") {
            res.status(400).json({
                status: false,
                message: "Format ID tidak valid"
            });
        }else if (err.name === "ValidationError") {
            res.status(400).json({
                status: false,
                message: err.message
            });
        }else{
            res.status(500).json({
            status : false,
            message: "Internal server error"
        });
        }
    }
};

//delete
const removeUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                status: false,
                message: "User tidak ditemukan"
            });
        }else{
            //kirim respon sukses
            res.status(200).json({
            status: true,
            message: "User berhasil dihapus",
        });
        }
        
    } catch (err) {
        if (err.name === "CastError") {
            res.status(400).json({
                status: false,
                message: "Format ID tidak valid"
            });
        }else{
            res.status(500).json({
            status : false,
            message: "Internal server error"
        }); 
    }
}
};
module.exports ={ detail, allUser, createUser, userDetail, updateUser, removeUser };