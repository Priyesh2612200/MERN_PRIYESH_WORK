import express from 'express'
import bodyParser from 'body-parser';
import routes from '../App/Routes'
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();


class Server {
    port: number
    app: express.Application
    constructor() {
        this.port = 4000
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
        this.app.listen(this.port,async () => {
            console.log(`App is running on port ${this.port}`);
            // console.log(`MongoDB Connection Flag:`,await  prisma.employeelist.findFirst()?`connected`:`not Connected`)
            async function main() {
                try {
                  await prisma.$connect()
                  console.log('Database connected')
                } catch (e) {
                //   console.error(`Error connecting to database: ${e.message}`)
                  console.error(`Error connecting to database`)
                }
              }
              
              main()
                .catch((e) => console.error(e))
                .finally(async () => {
                  await prisma.$disconnect()
                })
        })
    }
}

export default Server