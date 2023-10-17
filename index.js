import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import morgan from "morgan";
import { dbConfig } from "./utils/dbConfig.js";
import userRouter from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const port = 10000 || process.env.PORT

//Routes
app.use('/',userRouter);
app.use('/recipe', recipeRoutes)

//Connect to the MongoDb Database
dbConfig()

//Create The Server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

