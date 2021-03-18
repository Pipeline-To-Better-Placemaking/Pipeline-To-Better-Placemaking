stationaryToCSV = function(data) {

    var headers = "Collection_Title," +
                  "Collection_Date,"  +
                  "Area,Duration,Activity_Time," +
                  "Researchers,Standing_Points," +
                  "Location,Age,Gender,Activity,Posture"

    var csv = headers

    for(var i = 0; i < data.stationaryCollections.length; i++){
        var collection = data.stationaryCollections[i]
        
        var area = "\"POLYGON (("
        for(var j = 0; j < collection.area.points.length; j++){
            if (j != 0) area += ','
            area += collection.area.points[j].latitude + " "
            area += collection.area.points[j].longitude
        }
        area += "))\""
        
        if(collection.maps){
            for (var j = 0; j < collection.maps.length; j++){
                var map = collection.maps[j]

                var standingPoints = "\"MULTIPOINT("
                if(map.standingPoints){
                    for(var k = 0; k < map.standingPoints.length; k++){
                        if(k != 0) standingPoints += ','
                        standingPoints += "(" + map.standingPoints[k].latitude + 
                                                map.standingPoints[k].longitude + ")"
                    }
                }
                standingPoints += ")\""
                var researchers = "\""
                if(map.researchers){
                    for(var k = 0; k < map.researchers.length; k++){
                        if(k != 0) researchers += ','
                        researchers += map.researchers[k]
                    }
                }
                researchers += "\""
                if(map.data){
                    for(var k = 0; k < map.data.length; k++){
                        var entry = map.data[k]
                        csv += '\n'
                        csv += collection.title + ','
                        csv += collection.date + ','
                        csv += area + ','
                        csv += collection.duration + ','
                        csv += map.date + ','
                        csv += map.researchers + ','
                        csv += standingPoints + ','
                        csv += "\"POINT( " + entry.location.latitude + " " + entry.location.longitude + ")\"," 
                        csv += entry.age + ','
                        csv += entry.gender + ','
                        csv += entry.activity +','
                        csv += entry.posture   
                    }
                }
            }
        }
    }

    return csv
}

movingToCSV = function(data) {

    var headers = "Collection_Title," +
                  "Collection_Date,"  +
                  "Area,Duration,Activity_Time," +
                  "Researchers,Standing_Points," +
                  "Mode,Path"

    var csv = headers

    for(var i = 0; i < data.movingCollections.length; i++){
        var collection = data.movingCollections[i]
        
        var area = "\"POLYGON (("
        for(var j = 0; j < collection.area.points.length; j++){
            if (j != 0) area += ','
            area += collection.area.points[j].latitude + " "
            area += collection.area.points[j].longitude
        }
        area += "))\""
        
        if(collection.maps){
            for (var j = 0; j < collection.maps.length; j++){
                var map = collection.maps[j]

                var standingPoints = "\"MULTIPOINT("
                if(map.standingPoints){
                    for(var k = 0; k < map.standingPoints.length; k++){
                        if(k != 0) standingPoints += ','
                        standingPoints += "(" + map.standingPoints[k].latitude + 
                                                map.standingPoints[k].longitude + ")"
                    }
                }
                standingPoints += ")\""
                var researchers = "\""
                if(map.researchers){
                    for(var k = 0; k < map.researchers.length; k++){
                        if(k != 0) researchers += ','
                        researchers += map.researchers[k]
                    }
                }
                researchers += "\""
                if(map.data){
                    for(var k = 0; k < map.data.length; k++){
                        var entry = map.data[k]
                        csv += '\n'
                        csv += collection.title + ','
                        csv += collection.date + ','
                        csv += area + ','
                        csv += collection.duration + ','
                        csv += map.date + ','
                        csv += map.researchers + ','
                        csv += standingPoints + ','
                        csv += entry.mode + ','
                        path = "\"LINESTRING ( "
                        for(var l = 0; l < entry.path.length; l++){
                           if (l != 0) path += ", "
                           path += entry.path[l].latitude + " " + entry.path[l].longitude
                        }
                        path += ")\""
                        csv += path                       
                    }
                }
            }
        }
    }

    return csv
}

module.exports = {
    stationaryToCSV,
    movingToCSV
}