const express = require("express");
const app = express();
const exphbs = require("express-handlebars")

app.engine('hbs',exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine', 'hbs');
app.use(express.json());

app.use(express.static('public'))

const gisRouter = require('./routers/gisRouter.js');

app.use('/', gisRouter);

app.listen(3000, ()=>{
    console.log("WebGIS is running");
})
