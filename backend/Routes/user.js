import express from 'express';
import SignUpCheck from '../Middlewares/SignUpCheck.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../DB/Schemas.js';
import LoginCheck from '../Middlewares/LoginCheck.js';

const userRouter = express.Router();

userRouter.post('/signup',SignUpCheck,async (req,res)=>{
    try{
        const userData = req.parsedBody;

        const hashedPassWord = await bcrypt.hash(userData.password,10);

        const newUser = await User.create({
            username :userData.username,
            password :hashedPassWord,
            firstName:userData.firstName,
            lastName :userData.lastName
        });

        const id = newUser._id;

        const token = jwt.sign({id},process.env.JWT_SECRET);

        return res.status(201).json({message:"User created Succesfully",token:token});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:'Internal Server Error'});
    }
});

userRouter.post("/signin",LoginCheck,(req,res)=>{
    const token = jwt.sign({userID:req.parsedBody.userID},process.env.JWT_SECRET);
    return res.status(200).json({token:token});
});

export default userRouter;