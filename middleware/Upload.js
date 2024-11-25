import express from "express";
import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan dan nama file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images'); // Direktori penyimpanan file
    },
    filename: (req, file, cb) => {
        // Memberi nama file dengan timestamp untuk menghindari konflik
        const timestamp = new Date().getTime();
        console.log(timestamp)
        const filename = file.originalname;
        cb(null, `${timestamp}-${filename}`);
    }
});

// fungsi untuk upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Maksimum file 2 MB
    fileFilter: (req, file, cb) => {
        // Validasi tipe file (hanya menerima gambar .jpg, .jpeg, .png)
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only images (jpg, jpeg, png) are allowed!'));
        }
    }
});




export default upload;
