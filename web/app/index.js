//pull in express package
const express = require('express');
//create an express app
const app = express();

// example middleware that runs once for every request
app.use((req,res,next)=>{
    log('\nRUNS ONCE FOR EVERY REQUE$ST');
    setTimeout(() => {next(); }, 2000);
}, (req, res, next) => {
    log('WILL RUN WHEN NEXT IS CALLED');
    next();
});

// route specific middleware
app.use('/about', (req,res,next)=>{
    log('RUNS ONLY ON the /about page');
    next(new Error('Not authorized'));
});

// four params are required to mark this as a error handling middleware
//  the comment below this allows for eslint to not throw an error because I am not using the next function
// eslint-disable-next-line no-unused-vars
app.use((err,req,res,next)=>{
    error('ERROR FOUND:', err);
    res.sendStatus(500);
});


//export the express app
module.exports = app;

