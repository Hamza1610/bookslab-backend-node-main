import { Router } from 'express'
import { anotherExample, testExample } from '../controllers/example'
const exampleRoutes = Router()
//queries, parameters and middleware are declared here
exampleRoutes.get("/example", testExample)
exampleRoutes.get("/another", anotherExample)

export default exampleRoutes