import { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";
import userRepositary from "../Repositary/UserRepositary/userRepositary";

//   export const auth = async (req:any, res:Response, next:NextFunction) =>{
//     const authHeader = req.headers.authorization
//     const token = authHeader && authHeader.split(' ')[1]

//     if(!token)
//     return res.status(401).send({message:'Invalid Token!'})
//     console.log('Token',token)

//     Jwt.verify(token,process.env.APP_KEY as string, async (err: any,user:any)=>{


//         if(err)
//             return res.status(401).send({message:'Invalid Token!'})
//             try{
//                 console.log("User Data:",user);
//                 req.id=user.id
//                 console.log("Req ID:",req.id);
//                 next();
//             }catch(e:any){
//                 return res.status(e.status || 401).send({message:'User not found!'})
//             }
//     })
// }

export const auth = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).send({ message: 'Invalid Token!' });
    }
    console.log('Token', token);
  
    try {
      const decodedToken = Jwt.verify(token, process.env.APP_KEY as string) as { id: string };
      console.log('User Data:', decodedToken);
      req.id = decodedToken.id;
  
      const userPermission = await userRepositary.getUserPermission(decodedToken.id);

      (req as any).permissions = userPermission;
  
      next();
    } catch (err) {
      return res.status(401).send({ message: 'Invalid Token!' });
    }
  };
  
  
  
  


