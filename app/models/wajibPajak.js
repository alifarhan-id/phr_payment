const sql = require("../config/db")

const wajibPajak = function(data){
    this.npwpd = data.npwpd

};

wajibPajak.findById = (npwpd, result) => {
    sql.query('SELECT data_umum.npwpd,data_umum.penanggung_pajak,data_detail.nama_usaha,data_detail.alamat_usaha,data_detail.no_telpon_usaha,pajak_detail.nomor_rekening,pajak_detail.kode_golongan,pajak_detail.persentase_pajak FROM data_umum INNER JOIN data_detail ON data_umum.npwpd = data_detail.npwpd LEFT JOIN pajak_detail ON pajak_detail.kode_pajak_detail = data_umum.kode_pajak_detail WHERE data_umum.npwpd = ?',[npwpd], (err, res) => {
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

    module.exports = wajibPajak; 