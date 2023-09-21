var typhoonData = require("../models/typhoons.json");
var citiesData = require("../models/cities.json");

// 根据台风数据显示台风路径
const displayGIS = function(req, res) {
    var LatLngs = {};
    var names = [];
    var colours = [];
    for(var typhoonID in typhoonData){
        var typhonePosList = [];
        var typhoonInfo = typhoonData[typhoonID];
        var typhoonPos = typhoonInfo["NE_Pos"];

        for(var pos in typhoonPos){
            typhonePosList.push([typhoonPos[pos].N, typhoonPos[pos].E]);
        }

        LatLngs[typhoonID] = typhonePosList;
        names.push(typhoonInfo["en_name"]);
        colours.push(typhoonInfo["colour"]);
    }
    console.log("Latlngs(backend->frontend):");
    console.log(LatLngs);
    console.log(names);
    console.log(citiesData);
    console.log(colours);
    return res.render("index", {
        "Latlngs": JSON.stringify(LatLngs), 
        "Name": names, 
        "Cities": citiesData,
        "StrCities": JSON.stringify(citiesData),
        "Colour": colours
    });
}

// 要求输入两点经纬
const measureDistance = function(req, res) {
    return res.render("measure");
}

// 关于
const displayAbout = function(req, res) {
    return res.render("about");
}

// 根据台风id或name显示台风详细信息
const displayTyphoonDetails = function(req, res) {
    console.log(req.body);
    if(req.body.id){
        var id = req.body.id;
        for (var typhoonID in typhoonData) {
            if (typhoonID == id) {
                var typhoonInfo = typhoonData[typhoonID];
                return res.render("details", {"Pos": typhoonInfo.NE_Pos, "Name": typhoonInfo.en_name, "ID": id});
            }
        }
    }
    else if(req.body.name){
        var name = req.body.name;
        for(var typhoonID in typhoonData){
            if(typhoonData[typhoonID]["en_name"].toLowerCase() == name.toLowerCase()){
                var typhoonInfo = typhoonData[typhoonID];
                return res.render("details", {"Pos": typhoonInfo.NE_Pos, "Name": typhoonInfo.en_name, "ID": typhoonID});
            }
        }
    }
    
    return res.send("Cannot find typhoons with this ID or name!");
}

// 显示计算结果
const displayResults = function(req, res) {
    var pointAX = req.body.ptax; 
    var pointAY = req.body.ptay;
    var pointBX = req.body.ptbx;
    var pointBY = req.body.ptby;
    var result = calculateDistance(pointAX, pointAY, pointBX, pointBY);
    return res.render("results", {"result": result});
}

const displayLookUpPage = function(req, res) {
    return res.render("lookup");
}

const calculateDistance = function(pointAX, pointAY, pointBX, pointBY){
    // var ver = 2*Math.PI*6357/360*Math.abs(pointAY-pointBY);
    // var hor = 2*Math.PI*6378/360*Math.abs(pointAX-pointBX);
    // var coefficient = Math.abs(Math.cos(Math.PI/180*(Number(pointAY)+Number(pointBY))/2));
    // hor *= coefficient;
    // var result = Math.sqrt(ver*ver+hor*hor);
    // console.log("Calculated distance:");
    // console.log(result);
    // return result;
    let pointA = new L.Point(pointAX, pointAY);
    let pointB = new L.Point(pointBX, pointBY);
    return pointA.distanceTo(pointB);
}

// 导出函数
module.exports = {displayGIS, measureDistance, displayAbout, displayTyphoonDetails, displayResults, displayLookUpPage};