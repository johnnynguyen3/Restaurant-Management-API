const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

//Routers
const restRouter = require('./routers/restaurant-router');

//Global variables.
app.locals.restList = {};
app.locals.categories = [];
app.locals.restID = 0;

//Setup middleware
app.set(path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next)=> {
    console.log(`${req.method}: ${req.url}`);
    if (Object.keys(req.body).length > 0){
        console.log('Body: ');
        console.log(req.body);
    }
    next();
});

//Server Routes
app.use('/', restRouter);
app.use('/addrestaurant', restRouter);
app.use('/restaurants', restRouter);
app.use('/restaurants/:restID',restRouter);

//Reading in the restaurants
fs.readdir("./restaurants", (err,files) => {
    if(err) return console.log(err);
    console.log(files);
    for(let i = 0; i < files.length; i++){
        let rest = require("./restaurants/" + files[i]);
        app.locals.restList[rest.id] = rest;
        app.locals.restID++;
    }
    app.listen(PORT);
    console.log('Server running at http://127.0.0.1:3000/');
})