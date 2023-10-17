import express from 'express'
import { addToFav, getAllFav, loginUser, registerUser, removeFromFav } from '../dao/userDao.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/add/:idMeal', addToFav);
userRouter.delete('/delete/:idMeal', removeFromFav);
userRouter.get('/favourite', getAllFav)
export default userRouter;