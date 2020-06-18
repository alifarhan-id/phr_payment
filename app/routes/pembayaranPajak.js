module.exports = app => {
    const pembayaranPajak = require("../controllers/pembayaranPajak")
    const wp = require('../controllers/wajibPajak')

    app.get("/phr_payment/pembayaran/:id", pembayaranPajak.findOne);
    app.get("/phr_payment/wajibpajak/:id", wp.findOne);
    // app.get("/phr_payment/pembayaran", pembayaranPajak.findAll)
    app.post("/phr_payment/pembayaran/create", pembayaranPajak.create);
    app.delete("/phr_payment/pembayaran/delete/:id", pembayaranPajak.delete);
}