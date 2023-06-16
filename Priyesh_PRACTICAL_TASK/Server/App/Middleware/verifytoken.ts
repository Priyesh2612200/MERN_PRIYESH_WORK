import { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";

  export const auth = async (req:any, res:Response, next:NextFunction) =>{
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if(!token)
    return res.status(401).send({message:'Invalid Token!'})
    console.log('Token',token)

    Jwt.verify(token,process.env.APP_KEY as string, async (err: any,user:any)=>{


        if(err)
            return res.status(401).send({message:'Invalid Token!'})
            try{
                console.log("User Data:",user);
                req.id=user.id
                console.log("Req ID:",req.id);
                next();
            }catch(e:any){
                return res.status(e.status || 401).send({message:'User not found!'})
            }
    })
}