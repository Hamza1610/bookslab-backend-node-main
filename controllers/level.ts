import { NextFunction, Request, Response } from "express"
import { prisma } from "../utils/db"


// this is to find all the levels in the application
export const listLevels = async (req: Request, res: Response) => {
    try {

        const levels = await prisma.levels.findMany()
        res.status(200).json({
            data: levels,
        })
    }
    catch (err) {
        console.log('error ', err)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

//this is to find a specific level 
export const getLevel = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const level = await prisma.levels.findUnique({
            where: {
                id: parseInt(id)
            },
        })
        res.status(200).json({
            data: level,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

//create a level to add books to 
export const createLevel = async (req: Request, res: Response) => {
    const { name } = req.body

    //This are the valid levels for the books 
    const validLevels = ['beginner', 'intermediate', 'advanced', 'expert']

    //to check if the level is valid 
    if (!validLevels.includes(name)) {
        return res.status(400).json({
            error: "Sorry level does not exist!!"
        })
    }

    try {
        const createdLevel = await prisma.levels.create({
            data: {
                name: name
            }
        });
        res.status(201).json({
            message: 'added successfully',
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }

}

//this is to delete a level 
export const deleteLevel = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        if (!id) {
            throw new Error('id does not exist')
        }
        const deleteLevel = await prisma.levels.delete({
            where: {
                id: id
            },
        })
        return res.status(200).json({
            message: `${deleteLevel} deleted successfully`
        })
    }
    catch (err: any) {
        res.status(500).json({
            error: err.message,
        })
    }
}