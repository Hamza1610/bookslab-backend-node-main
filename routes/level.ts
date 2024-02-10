import express from "express";

import { listLevels, getLevel, createLevel, deleteLevel } from "../controllers/level";

const levelRouter = express.Router();

//GET: to get the levels within the app
levelRouter.get('/levels', listLevels) // to get all the levels
levelRouter.get('/level/:id', getLevel) //to get a single level
levelRouter.post('/level', createLevel) // to create a level
levelRouter.delete('/level/:id', deleteLevel) // to delete a level

export default levelRouter