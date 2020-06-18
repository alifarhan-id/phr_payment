const Pajak = require("../models/pembayaranPajak.js")

exports.findAll = (req, res) => {
    Pajak.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
Pajak.findById(req.params.id, (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
        res.status(404).send({
        message: `Not found pembayaran with id ${req.params.Id}.`
        });
    } else {
        res.status(500).send({
        message: "Error retrieving  pembayaran with id " + req.params.Id
        });
    }
    } else res.send(data);
});
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const pembayaran = new Pajak({
    no_transaksi: req.body.no_transaksi,
    npwpd: req.body.npwpd,
    tgl_pembayaran: req.body.tgl_pembayaran,
    bulan: req.body.bulan,
    tahun: req.body.tahun,
    pendapatan: req.body.pendapatan,
    pajak_terhutang: req.body.pajak_terhutang,
    denda: req.body.denda,
    total_bayar: req.body.total_bayar,
    user_id: req.body.user_id,
    kode_pajak: req.body.kode_pajak,
    kode_pajak_detail: req.body.kode_pajak_detail,
    nomor_rekening: req.body.nomor_rekening,
    kode_golongan: req.body.kode_golongan,
    status: req.body.status,
    no_arsip:req.body.status,
    tgl_expired: req.body.tgl_expired,
    keterangan: req.body.keterangan,
    keterangan_kegiatan: req.body.keterangan_kegiatan
  });

  Pajak.create(pembayaran, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payment."
      });
    else res.send(data);
  });
  
};

exports.delete = (req, res) => {
  Pajak.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete payment with id " + req.params.id
        });
      }
    } else res.send({ message: `payment was deleted successfully!` });
  });
};
