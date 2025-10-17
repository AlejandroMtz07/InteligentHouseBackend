import connection from "../../database/connection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const registerNewUser = async (req, res)=>{
    const sqlQuery = 'insert into users (email,password) values (?,?);';

    //Getting the body values
    const { email, password } = req.body;
    //Encrypting the user password
    const hashedPassword = await bcrypt.hash(password,10);

    connection.query(
        sqlQuery,
        [email, hashedPassword],
        (err, _) => {
            if(err){
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(500).send({ msg: 'Email already registered'})
                }
            }
            res.status(200).send({ msg: 'User registered' });
        }
    )
}
export const loginUser = (req, res)=>{
    const sqlQuery = 'select * from users where email = ?;'
    const {email, password} = req.body;
    connection.query(
        sqlQuery,
        [email,password],
        async (err, result)=>{
            console.log(result);
            if(result.length == '0'){
                return res.status(404).send({msg: 'User not found'});
            }
            if(err){
                return res.status(500).send({msg: err});
            }
            const token = jwt.sign(
                {
                    userId:result[0]['id'],
                    email:result[0]['email']
                },
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES}
            );
            const validatePassword = await bcrypt.compare(password, result[0]['password']);
            if(!validatePassword){
                return res.status(500).send({msg: 'Invalid credentials'});
            }
            res.status(200).send({msg: 'Login success',token: token});
        }
    )
}
export const logoutUser = (req, res)=>{
    
}