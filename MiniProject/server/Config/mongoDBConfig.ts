import * as Mongoose from 'mongoose';
import * as dotenv from "dotenv";

//FUnction Get Data
export default new class MongoDBConnection {
    async dbConnect() {
        // console.log('Start connect with database');
        dotenv.config()
        const mongoUrl = process.env.DB_CONN_STRING;
        Mongoose.connect(mongoUrl as string)
        .then(() => console.log("MongoDB connected successfully!"))
        .catch(err => console.log(err)); 
    }
}