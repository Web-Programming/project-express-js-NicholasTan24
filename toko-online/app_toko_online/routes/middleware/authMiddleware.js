//middleware ini adalah hanya untuk mengecek apakah admin atau bukan
//kalau admin boleh akses, kalau bukan admin tidak boleh akses
exports.adminOnly = (req, res, next) => {
    const isAdmin = req.body.isAdmin;
    if (isAdmin === true) {
        console.log("Middleware: Akses Admin Diberikan");
        next();
    }else{
        // 403 forbidden
        return res.status(403).json({
            success: false,
            message: "Akses ditolak. Endpoint ini membutuhkan hak admin."
        });
    }
};