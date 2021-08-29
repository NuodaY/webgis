const express = require("express");
const app = express();

app.get('/', function(req, res) {
    res.send("lalala");
})

app.listen(3000, ()=>{
    console.log("process is running");
})
