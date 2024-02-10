import { Request, Response } from "express"
import { prisma } from "../utils/db"
import { books } from "@prisma/client"
import { generateUUID } from "../utils/helpers"


export const addBook = async (req: Request, res: Response) => {
  const { title, level, author, category_id }: books = req.body;
  const uploaderId = req.user.id;
  try {
    const newBook = await prisma.books.create({
      data: {
        title,
        level,
        author,
        uploader: uploaderId,
        category_id,
        id: generateUUID(),
      },
    });
    res.status(201).json({
      message: "Created!",
      data: { title, author, level, category_id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.books.findMany();
    res.status(200).json({
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await prisma.books.update({
      where: {
        id: id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    res.status(200).json({
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const getBooksByUploader = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const books = await prisma.books.findMany({
      where: {
        uploader: id,
      },
    });
    res.status(200).json({
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const filterBooks = async (req: Request, res: Response) => {
  try {
    const { level, author, category } = req.query;
    const books = await prisma.books.findMany({
      where: {
        author: String(author),
        category_id: parseInt(String(category!)),
        level: parseInt(String(level)),
      },
    });
    res.status(200).json({
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

// Update book function
export const updateBooks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, level, author, category_id }: books = req.body;

    // Check if the book with given ID exists
    const existingBook = await prisma.books.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingBook) {
      return res.status(401).json({
        error: "Book not found",
      });
    }

    // Update the book with the provided data
    const updatedBook = await prisma.books.update({
      where: {
        id: id,
      },
      data: {
        title,
        level,
        author,
        category_id,
      },
    });

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await prisma.books.delete({
      where: {
        id: id,
      },
    });

    res.status(204).json({
      message: "book deleted",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};
