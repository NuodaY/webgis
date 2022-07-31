const express = require("express");
const app = express();
const exphbs = require("express-handlebars")
const port = process.env.PORT || 3000;

app.engine('hbs',exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine', 'hbs');
app.use(express.json());

app.use(express.static('public'))

const gisRouter = require('./routers/gisRouter.js');

app.use('/', gisRouter);

app.listen(port, ()=>{
    console.log("WebGIS is running at " + port);
})
