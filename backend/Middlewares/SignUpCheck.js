import User from "../DB/userSchema.js";
import userZod from "../ZodValidators/UserZod.js";

async function SignUpCheck(req,res,next){
    const parsedResult = userZod.safeParse(req.body);
    
    if(!parsedResult.success) return res.status(400).json({message:'Bad Request'});
    req.parsedBody = parsedResult.data;

    const {username} = parsedResult.data;

    try{
        const userFetched = await User.findOne({username});
        if(userFetched) return res.status(409).json({message:'Email already taken / Incorrect inputs'});
        else next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:'Internal Server Error'});
    }    
}

export default SignUpCheck;