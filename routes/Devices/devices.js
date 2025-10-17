import expres from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connection from '../../database/connection.js';
import { authMiddleWare } from '../../middlewares/tokenValidation.js';
import { getAllDevices, getDeviceStatus, bondDeviceToUser, editDeviceInformation } from './devicesHandler.js';


const router = expres.Router();
const parser = bodyParser.json();

//Get all the devices
//http://localhost:8080/devices/
router.get(
    '/',
    parser,
    authMiddleWare,
    getAllDevices
)

//URL for device register
//Change to true the device status given an props deviceId and the userId from the token
router.post(
    '/:deviceId',
    parser,
    authMiddleWare,
    bondDeviceToUser
)

//Endpoint for get the device status (Use for only the esp32)
router.get(
    '/:deviceId',
    parser,
    getDeviceStatus,
)

router.put(
    '/:deviceId',
    parser,
    authMiddleWare,
    editDeviceInformation
)

export default router;