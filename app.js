const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

//error handler
const {errorHandler} = require('./src/middleware/ErrorHandler');
//security middleware imports
const rateLimit = require('express-rate-limit');
const mongoSanitizer = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const xssClean = require('xss-clean');
const cors = require('cors');

//routing
const router = require('./src/routes/api');

//security middleware implement
app.use(mongoSanitizer());
app.use(helmet());
app.use(hpp());
app.use(xssClean());
app.use(cors());

//Request rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter);
app.use(bodyParser.json());

//db connection for local compass

// let URI = "mongodb://127.0.0.1:27017/Todo";
// let OPTION = {user:"",pass:"",autoIndex:true};
// mongoose.connect(URI,OPTION,(err)=>{
//     console.log("Connection Success");
//     console.log(err);
// });

//db connection for mogodb atlas
// database connection
mongoose.connect(process.env.DB_CONNECTION_STRING).then(()=>{
    console.log('connection success ..');
}).catch((err)=>{
    console(err);
})



//routing
app.use('/api/v1',router);

//not found router
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"});
});

// error handling
app.use(errorHandler);



//exports app
module.exports = app;
