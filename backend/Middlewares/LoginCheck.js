import User from "../DB/Schemas.js";
import SignInZod from "../ZodValidators/SignInZod.js";
import bcrypt from "bcryptjs";

async function LoginCheck(req,res,next){
    const parsedResult = SignInZod.safeParse(req.body);

    if(!parsedResult.success) return res.status(400).json({message:'Bad Request'});
    req.parsedBody = parsedResult.data;

    const {username,password} = parsedResult.data;

    try{
        const userFetched = await User.findOne({username:username});
        if(!userFetched) return res.status(411).json({message:"Error while logging in"});

        const isPassValid = await bcrypt.compare(password,userFetched.password);
        req.parsedBody={...req.parsedBody,userID:userFetched._id}

        if(isPassValid) next();
    }
    catch(err){
        console.error(err);
        return res.status(401).json({message:"Error while logging in"});
    }
}

export default LoginCheck;