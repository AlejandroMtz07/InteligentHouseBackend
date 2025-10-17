import { body } from 'express-validator';
import express from 'express';
import bodyParser from 'body-parser';
import { loginUser, registerNewUser } from './userHandler.js';


const router = express.Router();
const parser = bodyParser.json();

//Register endpoint
router.post(
    '/register',
    parser,
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isStrongPassword({minLength: 6}).withMessage('Weak password')
    ],  
    registerNewUser
)
router.post(
    '/login',
    parser,
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isStrongPassword({minLength: 6}).withMessage('Invalid password')
    ],
    loginUser
)


//Export all the routes
export default router;
