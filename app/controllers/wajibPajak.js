const wp = require('../models/wajibPajak')

exports.findOne = (req, res) => {
    wp.findById(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Wajib Pajak with npwpd ${req.params.Id}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving  pembayaran with npwpd " + req.params.Id
            });
        }
        } else res.send(data);
    });
    };