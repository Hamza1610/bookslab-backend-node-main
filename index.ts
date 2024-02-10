import express, { Express, Request, Response } from 'express'
import 'dotenv/config'
import exampleRoutes from './routes/example'
import stackRoutes from './routes/stacks'
import categoriesRoute from './routes/category'
import levelRouter from './routes/level'
import { database } from './utils/db'
import booksRoutes from './routes/books'

const app: Express = express()
const port = process.env.PORT || 8080
app.use(express.json()); // Parse JSON requests

// middlewares
app.use("/api/v1", exampleRoutes)
app.use('/api/v1', categoriesRoute)
app.use('/api/v1', levelRouter)
app.use('/api/v1', stackRoutes)
app.use('/api/v1', booksRoutes)
database()


app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to bookslab")
})

app.listen(port, () => {
    console.log("[server] listening on port: http://localhost:" + port)
})