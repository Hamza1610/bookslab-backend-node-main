import { listCategory, createCategory, deleteCategory } from '../controllers/category'
import { Router } from 'express'

const categoriesRoute = Router()
categoriesRoute.get('/categories', listCategory)
categoriesRoute.post('/category', createCategory)
categoriesRoute.delete('/category/:id', deleteCategory)

export default categoriesRoute
