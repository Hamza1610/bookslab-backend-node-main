import { NextFunction, Request, Response } from "express"
import { prisma } from "../utils/db"

export const testExample = async (req: Request, res: Response) => {
    console.log("This is an example controller")
    console.log("All controller must follow this pattern")
    return res.status(200).json({
        response: res.getHeaders(),
        request: req.headers
    })
}

export const anotherExample = async (req: Request, res: Response) => {
    // wrap in a try-catch for easy error handling
    try {
        const users = await prisma.users.findMany()
        return res.status(200).json({
            data: users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Server error"
        })
    }
}