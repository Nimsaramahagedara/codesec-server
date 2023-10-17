import request from 'request'
import axios from 'axios';


//GET ALL THE CATEGORIES AVAILABLE
export const getCategories = async (req, res) => {
    try {
        const result = await axios.get('http://www.themealdb.com/api/json/v1/1/categories.php');
        if(result){
            res.status(200).json(result.data);
        }
    } catch (error) {
        console.log(error);
    }
}

//GET ALL THE PRODUCTS BELONGS TO A CATEGORY
export const filterByCategory = async (req, res) => {
    const {c} = req.params;
    const url = `http://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`;
    try {
        const result = await axios.get(url);
        if(result){
            res.status(200).json(result.data.meals);
        }
    } catch (error) {
        console.log(error);
    }
}
//GET A SINGLE PRODUCT
export const getProductDetails = async(req,res)=>{
    const {id} = req.params;
    const url = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
        const result = await axios.get(url);
        if(result){
            res.status(200).json(result.data.meals)
        }
    } catch (error) {
        console.log(error);
    }
}
