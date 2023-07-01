import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

//data imports
import User from './models/User.js';
import { dataUser } from "./data/index.js";


//  Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));  //this allows us cross origin sharing request
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Routes
//This is how we will split the apis
app.use("/client", clientRoutes); //it will represent routes related to client
app.use("/general", generalRoutes); //it will represent the routes realated to dashboard
app.use("/management", managementRoutes); //it will represent the routes related to management
app.use("/sales", salesRoutes);//it will represenr the routes releated to sales

// Mongoose Setup 
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    // only add data one time
    //so we do not have any duplicate data
    // User.insertMany(dataUser)
}).catch((error) => console.log(`${error} did not connect`));

