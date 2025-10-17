import { createConnection, } from "mysql2";
import dotenv from 'dotenv';


dotenv.config();

const connection = createConnection({
    host: process.env.DATABASE_HOST,
    port:3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

connection.connect(
    (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Database connected');
        }
    }
)

export default connection;
