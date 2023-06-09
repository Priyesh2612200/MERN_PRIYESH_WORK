// import bcrypt from 'bcrypt';
import bcrypt from 'bcrypt'

class Authservice{
    async hashPassword(password:string)
    {
        return await bcrypt.hash(password,10)
    }
     //10 round of encryption applied
     async isPasswordMatch(attempted:any,original:any)
     {
        return await bcrypt.compare(attempted,original)
     }
}

export default  new Authservice;