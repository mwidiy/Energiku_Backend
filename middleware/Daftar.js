import { query } from '../Database/db.js';

const registerUser = async (req, res) => {
  const { nama, email, password } = req.body;

  try {
    // Periksa apakah email sudah terdaftar
    const existingUser = await query('SELECT * FROM login_user WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ msg: 'Email sudah terdaftar' });
    }

    // Tambahkan pengguna baru ke database
    await query('INSERT INTO login_user (nama, email, password) VALUES (?, ?, ?)', [nama, email, password]);
    res.status(201).json({ msg: 'Pendaftaran berhasil' });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};


export default registerUser;
