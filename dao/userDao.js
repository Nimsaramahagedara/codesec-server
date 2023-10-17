import e from "express";
import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import { verifyToken } from "../utils/varifyToken.js";
import request from 'request'
import axios from 'axios'

export const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '1d'
    })
    return token
}

export const registerUser = async (req, res) => {
    const user = req.body;
    try {
        //Check for email is exist one or not
        if (!validator.isEmail(user.email)) {
            res.status(401).json({ message: 'Enter valid email' });
            return
        }
        const isExist = await UserModel.findOne({ email: user.email });

        if (isExist) {
            res.status(401).json({ message: 'Email Already Exist' });
            return
        }

        if (!validator.isStrongPassword(user.password)) {
            res.status(401).json({ message: 'Enter Strong password' });
            return
        }
        const result = await UserModel.create(user);
        if (result) {
            res.status(200).json({ message: 'Registration Successfull' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        //Check for email is exist one or not
        const isExist = await UserModel.findOne({ email: email });

        if (!isExist) {
            res.status(401).json({ message: 'Email Not Exist' });
            return
        }

        const isMatched = await isExist.isPasswordMatched(password);

        if (!isMatched) {
            res.status(401).json({ message: 'Password Not Matched' })
            return
        }
        const token = createToken(isExist._id);

        res.status(200).json({ message: 'Login Success', token })
    } catch (error) {
        console.log(error);
    }
}


//ADD PRODUCT TO FAVORITES
export const addToFav = async (req, res) => {
    const userId = await verifyToken(req);
    console.log(userId);
    try {
        const isExist = await UserModel.findById(userId);
        if (isExist) {
            isExist.favorites.push(req.params.idMeal);
            const isSaved = await isExist.save();
            if (isSaved) {
                res.status(200).json({ message: 'Successfull Added To Favorites' })
            } else {
                res.status(500).json({ message: 'Not added to favorites' })
            }

        }
    } catch (error) {
        res.status(500).json(error);
    }

}

//REMOVE PRODUCT FROM FAVORITES
export const removeFromFav = async (req, res) => {
    const userId = await verifyToken(req);
    try {
        const isExist = await UserModel.findById(userId);
        if (isExist) {
            const newFav = isExist.favorites.filter(item => item !== req.params.idMeal);
            isExist.favorites = newFav;
            const isSaved = await isExist.save();
            if (isSaved) {
                res.status(200).json({ message: 'Successfull Removed From Favorites' })
            } else {
                res.status(500).json({ message: 'Not Removed From favorites' })
            }

        }
    } catch (error) {
        res.status(500).json(error);
    }

}



//GET ALL FAVORITE ITEMS
export const getAllFav = async (req, res) => {
    const userId = await verifyToken(req);
    try {
        const isExist = await UserModel.findById(userId)
        const favoriteItemIds = isExist.favorites;

        const fetchItemPromises = favoriteItemIds.map(async (id) => {
            const item = await axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            return item.data.meals[0];
        });

        const favItemsData = await Promise.all(fetchItemPromises);

        res.status(200).json(favItemsData)


    } catch (error) {
        console.log(error);
    }

}

