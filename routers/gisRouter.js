const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// add our router 
const gisRouter = express.Router()
const gisController = require('../controllers/gisController')
// handle the GET request to get all cafes
gisRouter.get('/', (req, res) => gisController.displayGIS(req, res))

// export the router
module.exports = gisRouter
