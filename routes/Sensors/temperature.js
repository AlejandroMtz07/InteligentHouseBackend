import bodyParser from 'body-parser';
import express from 'express';
import { registerTemperature } from './temperatureHandler.js';
import { body } from 'express-validator';

const router = express.Router();
const parser = bodyParser.json();

router.post(
    '/:deviceId',
    parser,
    [
        body('ambTemp').isFloat().withMessage('Value must be floating-point'),
    ],  
    registerTemperature,
)

export default router;
