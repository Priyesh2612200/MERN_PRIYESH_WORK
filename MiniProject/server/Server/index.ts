import express from 'express'
import bodyParser from 'body-parser';
import mongoDBConnection from '../Config/mongoDBConfig';
import routes from '../App/Routes'
// import { Prisma, PrismaClient } from '@prisma/client';
import {Prisma,PrismaClient} from '@prisma/client'
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();


class Server {
    port: any
    app: any
    constructor() {
        this.port = 3002
        this.app = express()
    }

    start() {
        this.config()
        //mongoDBConnection.dbConnect()
        this.setupRoutes()
        this.listen()
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        
    }

    setupRoutes(){
        this.app.use(routes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
            // console.log(`MongoDB Connection Flag: ${prisma.$connect()}`)
        })
    }
}

export default Server