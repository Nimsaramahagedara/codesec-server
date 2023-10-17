import express from 'express'
import { filterByCategory, getCategories, getProductDetails } from '../dao/recipeDao.js';

const recipeRoutes = express.Router();


recipeRoutes.get('/',getCategories); //GET ALL CATEGORIES
recipeRoutes.get('/:c',filterByCategory); //GET ALL PRODUCTS UNDER CATEGORY
recipeRoutes.get('/product/:id',getProductDetails); //GET SINGLE PRODUCT BY ID

export default recipeRoutes;