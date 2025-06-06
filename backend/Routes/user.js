import express from 'express';
import SignUpCheck from '../Middlewares/SignUpCheck.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../DB/userSchema.js';
import LoginCheck from '../Middlewares/LoginCheck.js';
import AuthCheck from '../Middlewares/PostLoginAuthCheck.js';
import updateZod from '../ZodValidators/updateZod.js';
import Account from '../DB/bankSchema.js';


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

        await Account.create({userID:id,balance:1+10000*Math.random()});

        return res.status(201).json({message:"User created Succesfully"});
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

userRouter.put('/',AuthCheck,async (req,res)=>{
    const parsedBody = updateZod.safeParse(req.body);
    try{
        if(!parsedBody.success){
            console.log("Parsing Failure !");
            console.log(parsedBody.data)
            return res.status(411).json({message:'Error while updating information.'})
        }
        const newHashPassword = await bcrypt.hash(parsedBody.data.password,10);
        parsedBody.data.password = newHashPassword;
        await User.updateOne({_id:req.userID},{...parsedBody.data});
        return res.status(200).json({message:"Updated Successfully"})
    }
    catch(err){
        console.log(err.message)
        return res.status(411).json({message:'Error while updating information.'})
    }
});

userRouter.get('/bulk',AuthCheck,async(req,res)=>{
    const rawFilter = req.query.filter || "";
    const escapeForRegex = (str)=> str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeFilter = escapeForRegex(rawFilter);
    const filter = new RegExp(safeFilter,'i');

    try{
        const users = await User.find({
            $or:[
                {firstName:{'$regex':filter}},
                {lastName:{'$regex':filter}}
            ]
        })

        return res.status(200).json({
            user:users.map(user=>({
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id
            }))
        });
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Internal server error."});
    }
})

export default userRouter;