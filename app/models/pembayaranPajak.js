const sql = require("../config/db")
const moment = require('moment')



var tgl_bayar = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
var durations = moment.duration(1, 'minutes');
var tgl_expired =  moment(Date.now()).add(1, 'h').format('YYYY-MM-DD HH:mm:ss');

const pembayaranPajak = function(data){
    this.no_transaksi = data.no_transaksi,
    this.npwpd = data.npwpd,
    this.tgl_pembayaran = tgl_bayar,
    this.bulan = data.bulan,
    this.tahun = data.tahun,
    this.pendapatan = data.pendapatan,
    this.pajak_terhutang = data.pajak_terhutang,
    this.denda = data.denda,
    this.total_bayar = data.total_bayar,
    this.user_id = data.user_id,
    this.kode_pajak = data.kode_pajak,
    this.kode_pajak_detail = data.kode_pajak_detail,
    this.nomor_rekening = data.nomor_rekening,
    this.kode_golongan =data.kode_golongan,
    this.status = data.status,
    this.no_arsip = data.no_arsip,
    this.tgl_expired = tgl_expired,
    this.keterangan = data.keterangan,
    this.keterangan_kegiatan = data.keterangan_kegiatan

};

pembayaranPajak.getAll = result => {
    sql.query("SELECT * FROM pembayaran_pajak LIMIT 10", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }
  
      console.log("customers: ", res);
      result(res);
    });
  };

pembayaranPajak.findById = (npwpd, result) => {
  sql.query('SELECT * FROM pembayaran_pajak WHERE npwpd = ?',[npwpd], (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
    }

    if (res.length) {
    console.log("found customer: ", res);
    result(null, res);
    return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);    
    });
};

//post
pembayaranPajak.create = (newData, result) =>{
  sql.query("INSERT INTO pembayaran_pajak SET ?", newData, (err, res) =>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created payment: ", { id: res.insertId, ...newData });
    result(null, { id: res.insertId, ...newData});
  });
};

pembayaranPajak.remove = (id, result) => {
  sql.query("DELETE FROM pembayaran_pajak WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pembayaran with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pembayaran with id: ", id);
    result(null, res);
  });
};

module.exports = pembayaranPajak;


