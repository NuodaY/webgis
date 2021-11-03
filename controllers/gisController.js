var typhoonData = require("../models/typhoons.json")

// 根据台风数据显示台风路径
const displayGIS = function(req, res) {
    var LatLngs = {}
    for(var typhoonID in typhoonData){
        var typhonePosList = []
        var typhoonInfo = typhoonData[typhoonID]
        var typhoonPos = typhoonInfo["NE_Pos"]

        for(var pos in typhoonPos){
            typhonePosList.push([typhoonPos[pos].N, typhoonPos[pos].E])
        }

        LatLngs[typhoonID] = typhonePosList

    }
    console.log("Latlngs(backend->frontend):")
    console.log(LatLngs)
    res.render("index", {"Latlngs": JSON.stringify(LatLngs)})
}

// 根据台风id显示台风详细信息
const displayTyphoonDetails = function(req, res) {
    var id = req.body.id;
    for(var typhoonID in typhoonData){
        if(typhoonID == id){
            var typhoonInfo = typhoonData[typhoonID];
            var zh_name = typhoonInfo["zh_name"];
            var en_name = typhoonInfo["en_name"];
            return res.send("ID"+id+"\n中文"+zh_name+"\n英文"+en_name);
        }
    }
    return res.send("查无此台风！");
}

// 导出函数
module.exports = {displayGIS, displayTyphoonDetails};