import { NextFunction, Request, Response } from "express"
import { prisma } from "../utils/db"

export const createStack = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const stack = await prisma.stacks.create({ data: { name } });
    return res.status(201).json({ stack });
  } catch (error) {
    console.error('Prisma Error:', error);
    return res.status(500).json({ error: 'Error creating stack' });
  }
};


export const getStacks = async (req: Request, res: Response) => {
  try {
    const stacks = await prisma.stacks.findMany();

    res.status(200).json({ data: stacks });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stacks' });
  }
};


export const deleteStack = async (req: Request, res: Response) => {

  const { id } = req.params;
  try {
    const stacks = await prisma.stacks.delete({
      where: { id: parseInt(id) },
    });
    if (!stacks) {
      return res.status(500).json(`No stacks with ID ${id}`)
    };
    res.json({ message: 'Stack deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting stack' });
  }
};