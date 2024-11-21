import express from "express";
import {
    addBook,
    deleteBook,
    getBooks,
    updateBook,
} from "../Controllers/Books.js";

const router = express.Router();

router.get("/books", getBooks);
router.post("/books", addBook);
router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
