import express from 'express';
import cors from 'cors';
import users from './routes/Users/users.js'
import devices from './routes/Devices/devices.js'
import temperature from './routes/Sensors/temperature.js'

//Instance the new app
const app = express();

//Set the view engine to the app
app.set('view engine', 'ejs');

//Use the CORS middleware in the app
app.use(
    cors(
        {
            origin: ['http://localhost:5173','http://192.168.0.93:5173'],
            credentials: true
        }
    )
);

app.use('/users',users);
app.use('/devices',devices);
app.use('/sensors',temperature)

//Root endpoint
app.get(
    '/',
    (_, res)=>{
        res.render('index');
    }
)

//Setting the listened port
const PORT = process.env.PORT || 8080;
app.listen(
    PORT,
    ()=>{
        console.log(`Server running on ${PORT} port`);
    }
);