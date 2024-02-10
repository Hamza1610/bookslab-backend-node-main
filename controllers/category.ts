import { Request, Response } from "express"
import { prisma } from "../utils/db"

export const listCategory = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany()
        res.status(200).json({
            data: categories,
        })
    }
    catch (err) {
        console.log('error ', err)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        const category = await prisma.category.create({
            data: {
                category_name: req.body.name,
            },
        })
        res.status(201).json({
            data: category
        })
    }
    catch (err: any) {
        res.status(500).json({
            error: err.message,
        })
    }
}


export const deleteCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        if (!id) {
            throw new Error('id does not exist')
        }
        const deleteCategory = await prisma.category.delete({
            where: {
                category_id: id
            },
        })
        return res.status(200).json({
            message: `${deleteCategory.category_id} deleted successfully`
        })
    }
    catch (err: any) {
        res.status(500).json({
            error: err.message,
        })
    }
}