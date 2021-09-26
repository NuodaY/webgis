var typhoonData = require("../models/typhoons.json")

// get all cafes
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
    console.log(LatLngs)
    res.render("index", {"Latlngs": JSON.stringify(LatLngs)})
}

// Export the functions
module.exports = {displayGIS}