var typhoonData = require("../models/typhoons.json");

// 根据台风数据显示台风路径
const displayGIS = function(req, res) {
    var LatLngs = {};
    var Names = [];
    for(var typhoonID in typhoonData){
        var typhonePosList = [];
        var typhoonInfo = typhoonData[typhoonID];
        var typhoonPos = typhoonInfo["NE_Pos"];

        for(var pos in typhoonPos){
            typhonePosList.push([typhoonPos[pos].N, typhoonPos[pos].E]);
        }

        LatLngs[typhoonID] = typhonePosList;
        Names.push(typhoonInfo["en_name"]);

    }
    console.log("Latlngs(backend->frontend):");
    console.log(LatLngs);
    console.log(Names);
    return res.render("index", {"Latlngs": JSON.stringify(LatLngs), "Name": Names});
}

// 要求输入两点经纬
const measureDistance = function(req, res) {
    return res.render("measure");
}

// 关于
const displayAbout = function(req, res) {
    return res.render("about");
}

// 根据台风id显示台风详细信息
const displayTyphoonDetails = function(req, res) {
    var id = req.body.id;
    for(var typhoonID in typhoonData){
        if(typhoonID == id){
            var typhoonInfo = typhoonData[typhoonID];
            var zh_name = typhoonInfo["zh_name"];
            var en_name = typhoonInfo["en_name"];
            return res.send("ID"+id+"\n英文"+en_name);
        }
    }
    return res.send("Cannot find typhoons with this ID!");
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

const calculateDistance = function(pointAX, pointAY, pointBX, pointBY){
    var ver = 2*Math.PI*6357/360*Math.abs(pointAY-pointBY);
    var hor = 2*Math.PI*6378/360*Math.abs(pointAX-pointBX);
    var coefficient = Math.abs(Math.cos(Math.PI/180*(Number(pointAY)+Number(pointBY))/2));
    hor *= coefficient;
    var result = Math.sqrt(ver*ver+hor*hor);
    console.log("Calculated distance:");
    console.log(result);
    return result;
}

// 导出函数
module.exports = {displayGIS, measureDistance, displayAbout, displayTyphoonDetails, displayResults};