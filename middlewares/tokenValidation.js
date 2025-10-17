import jwt from 'jsonwebtoken';


//TODO method that takes the jwt from the headers and verify it
export const authMiddleWare = (req, res, next) => {
    const authHeader =  req.headers["authorization"];
    if(!authHeader) return res.status(401).send({msg: 'Login to see your devices'});

    const authToken = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(authToken,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(403).send({msg: 'Login to see your devices'})
    }
}