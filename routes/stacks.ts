import { Router } from 'express'
import { createStack, getStacks, deleteStack } from '../controllers/stacks'
const stackRoutes = Router()
//queries, parameters and middleware are declared here
stackRoutes.get("/stacks", getStacks);
stackRoutes.post("/stack", createStack);
stackRoutes.delete("/stack/:id", deleteStack);

export default stackRoutes