import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./Database/db.js";
import booksRouter from "./Routes/Books.js";
import upload from "./middleware/Upload.js";
import registerUser from "./middleware/Daftar.js";
import loginUser from "./middleware/Login.js";
import session from "express-session";



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`http://localhost:${process.env.APP_PORT}`);
});

app.use("/api", booksRouter); // Path prefix "/api" untuk booksRouter
app.use('/asset',express.static('Public/Images'))
// Route untuk mengunggah file (single file)
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});
// error heandling
app.use((err, req, res, next) => {
  res.json({
    message: err.message
  })
});


app.post('/api/register', registerUser);

app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Atur menjadi true jika menggunakan HTTPS
}));

app.post('/api/login', loginUser);

// Misalnya, di booksRouter.js
booksRouter.get("/", async (req, res) => {
  try {
    const books = await getBooks(); // Mengambil buku dari DB
    res.json(books); // Mengirimkan respons JSON
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

