import { query } from "../Database/db.js";


// melihat semua data
export const getBooks = async (req, res) => {
  try {
    const books = await query(`SELECT * FROM login_user`);
    return res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};



// tambah data
export const addBook = async (req, res) => {
    const {  nama, email, password } = req.body;
    try {
      await query(`INSERT INTO login_user ( nama, email, password) VALUES ( ?, ?, ?)`, [
        nama,
        email,
        password
      ]);
      console.log("Data yang diterima:", {  nama, email, password });
      return res.status(200).json({ msg: "data login ditambahkan" });
    } catch (error) {
      return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };
  
// update data
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { nama, email, password } = req.body;
    try {
      await query(`UPDATE login_user SET nama = ?, email = ?, password = ? WHERE idlogin_user = ?`, [
        nama,
        email,
        password,
        id,
      ]);
      console.log("Data yang didi:", { id});
      return res.status(200).json({ msg: "Data login diupdate" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };

  
//   hapus data
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
      await query("DELETE FROM login_user WHERE idlogin_user = ?", [id]);
      return res.status(200).json({ msg: "Data login Telah Di Hapus" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };
 
  

  
