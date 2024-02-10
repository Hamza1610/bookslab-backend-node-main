import { Router } from "express";
import {
  addBook,
  deleteBook,
  filterBooks,
  getBook,
  getBooks,
  getBooksByUploader,
  updateBooks,
} from "../controllers/books";

const booksRoutes = Router();

booksRoutes.post("/book", addBook);
booksRoutes.get("/book", getBook);
booksRoutes.get("/books", getBooks);
booksRoutes.get("/books/:id", getBooksByUploader);
booksRoutes.get("/books?", filterBooks);
booksRoutes.put("/books/:id", updateBooks);
booksRoutes.delete("/books/:id", deleteBook);

export default booksRoutes;
