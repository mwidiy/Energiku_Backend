import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./Database/db.js";
import booksRouter from "./Routes/Books.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`http://localhost:${process.env.APP_PORT}`);
});

app.use("/api", booksRouter); // Path prefix "/api" untuk booksRouter

// Misalnya, di booksRouter.js
booksRouter.get("/", async (req, res) => {
  try {
    const books = await getBooks(); // Mengambil buku dari DB
    res.json(books); // Mengirimkan respons JSON
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

