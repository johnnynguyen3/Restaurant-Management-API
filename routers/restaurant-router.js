const express = require('express');
const router = express.Router();

//Router methods
router.get('/',getHomepage);
router.get('/addrestaurant',addrestaurant);
router.get('/restaurants',getRestaurants);
router.post('/restaurants',postRestaurant);
router.get('/restaurants/:restID',getRestByID);
router.put('/restaurants/:restID',insertRestaurant);

//Helper function to send 404 response
function send404(response){
    response.statusCode = 404;
    response.write("Unknown Resource error");
    response.end();
}
//Renders the homepage
function getHomepage(req, res){
    res.render('homepage');
    res.statusCode = 200;
}
//Renders the add restaurant page
function addrestaurant(req, res){
    res.render('restaurantadder');
    res.statusCode = 200;
}
//Gets the current restaurants and render them onto the restaurants page
function getRestaurants(req, res){
    let rest = req.app.locals.restList;
    res.render('restaurants',{list:rest});
    res.statusCode = 200;
}
//Posts the restaurant 
function postRestaurant(req, res){
    let rest = req.app.locals.restList;
    let id = req.app.locals.restID;
    req.app.locals.restID++;
    id++;
    //console.log(id);
    req.body['id'] = id;
    //console.log(req.body['id']);
    rest[id] = req.body;
    //console.log(rest[id]);
    rest[id].menu = {};
    res.statusCode = 200;
    res.json(rest[id]);
}
//Looks for the id based on user request and renders page based on id
function getRestByID(req, res){
    let contentType = req.headers.accept.split(",")[0];
    let restaurants = req.app.locals.restList;
    if(restaurants.hasOwnProperty(req.params.restID)){
        if(contentType === 'text/html'){
            res.statusCode = 200;
            res.render('restaurant',{rest:restaurants[req.params.restID]});
            //console.log(restaurants[restID]);
        }
        else if(contentType === 'application/JSON'){
            if(restaurants.hasOwnProperty(req.params)){
                res.statusCode = 200;
                res.json(restaurants[req.params.restID]);

            }
        }else{send404();}
    }
    else{send404();}
}
//Adds restaurant to the restList.
function insertRestaurant(req, res){
    let rest = req.app.locals.restList;
    let id = req.app.locals.restID;
    req.app.locals.restID++;
    id++;
    //console.log(id);
    req.body['id'] = id;
    //console.log(req.body['id']);
    rest[id] = req.body;
    //console.log(rest[id]);
    rest[id].menu = {};
    res.statusCode = 200;
    res.json(rest[id]);
}
module.exports = router;