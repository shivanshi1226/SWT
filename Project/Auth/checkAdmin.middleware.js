const checkAdmin = (req,res,next) =>{
    if(req.body.role==="seller"){
        next();    
    }else{
        res.status(403).send({message:"You are not authorized to perform this action"})
    }
}

module.exports = checkAdmin