import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Memuat konfigurasi dari file .env
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD || '';  // Kosongkan password jika tidak ada
const DB_NAME = process.env.DB_NAME;

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
});

// Fungsi untuk menguji koneksi
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log("Koneksi ke database berhasil!");
        connection.release();  // Pastikan untuk melepaskan koneksi
    } catch (error) {
        console.error("Gagal terhubung ke database:", error.code);
        console.error("Pesan error:", error.message);
    }
}

// Fungsi untuk menjalankan query
async function query(command, values) {
    try {
        const [value] = await db.query(command, values ?? []);
        return value;
    } catch (error) {
        console.error("Error saat menjalankan query:", error);
        throw error;  // Lempar ulang error jika perlu
    }
}

export { query, testConnection };
