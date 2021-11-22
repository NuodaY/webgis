const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// add our router 
const gisRouter = express.Router();
const gisController = require('../controllers/gisController');

// handle the GET request to get all cafes
gisRouter.get('/', (req, res) => gisController.displayGIS(req, res));
gisRouter.get('/measure', (req, res) => gisController.measureDistance(req, res));
gisRouter.get('/about', (req, res) => gisController.displayAbout(req, res));
gisRouter.get('/lookUpTyphoon', (req, res) => gisController.displayLookUpPage(req, res));

gisRouter.post('/typhoonDetails', urlencodedParser, (req, res) => gisController.displayTyphoonDetails(req, res));
gisRouter.post('/showResults', urlencodedParser, (req, res) => gisController.displayResults(req, res));

// export the router
module.exports = gisRouter;
