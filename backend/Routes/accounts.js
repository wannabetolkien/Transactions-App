import express from 'express';
import Account from '../DB/bankSchema.js';
import AuthCheck from '../Middlewares/PostLoginAuthCheck.js';
import mongoose from 'mongoose';
const accountRouter = express.Router();

accountRouter.get('/balance',AuthCheck,async(req,res)=>{
    try{
        const account = await Account.findOne({userID:req.userID});
        return res.status(200).json({balance:account.balance});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message:'Internal server error !'});
    }
});

accountRouter.post('/transfer',AuthCheck,async (req,res)=>{
    const transactionSession = await mongoose.startSession();
    try{
        transactionSession.startTransaction();
        const{amount,to} = req.body;

        const account = await Account.findOne({userID:req.userID}).session(transactionSession);

        if(!account || account.balance<amount){
            await transactionSession.abortTransaction();
            return res.status(400).json({message:'Insufficient balance'});
        }

        const toAccount = await Account.findOne({userID:to}).session(transactionSession);

        if(!toAccount){
            await transactionSession.abortTransaction();
            return res.status(400).json({message:'Invalid Account'})
        }

        await Account.updateOne({userID:req.userID},{$inc:{balance:-amount}}).session(transactionSession);
        await Account.updateOne({userID:to},{$inc:{balance:amount}}).session(transactionSession);

        await transactionSession.commitTransaction();

        return res.status(200).json({message:'Transfer Succesfull'});
    }
    catch(err){
        await transactionSession.abortTransaction();
        console.log(err.message);
        return res.status(500).json({message:'Internal server error'});
    }

    finally{
        transactionSession.endSession();
    }
});
export default accountRouter;