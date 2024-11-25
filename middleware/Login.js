import { query } from '../Database/db.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await query('SELECT * FROM login_user WHERE email = ? AND password = ?', [email, password]);
    
    if (result.length > 0) {
      // Pengguna ditemukan
      const user = result[0];
      
      // Kamu dapat mengatur sesi pengguna atau mengirimkan detail pengguna sebagai respons
      req.session.user = user; // Contoh jika menggunakan session
      return res.status(200).json({ msg: 'Login berhasil', user });
    } else {
      // Pengguna tidak ditemukan
      return res.status(401).json({ msg: 'Kredensial tidak valid' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};


export default loginUser;
