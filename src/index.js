import express from "express";
import bodyParser from "body-parser";
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';

require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log("Backend is running on the port : " + port)
});
