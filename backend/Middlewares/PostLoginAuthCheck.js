import jwt from 'jsonwebtoken';

// Checking token hence post login checks for routes.
function AuthCheck(req,res,next){
    const authHeader =  req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message:"Token invalid."})
    }

    const token = authHeader.split(" ")[1];
    try{
        const tokenPayload = jwt.verify(token,process.env.JWT_SECRET);
        const userID = tokenPayload.userID;
        req.userID = userID;
        next();
    }
    catch(err){
        console.error(err);
        return res.status(403).json({message:'Authorization failed.'});
    }
}

export default AuthCheck;