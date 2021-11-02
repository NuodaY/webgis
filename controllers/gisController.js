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

// 导出函数
module.exports = {displayGIS}