stationaryToCSV = function(data) {

    var headers = "Collection_Title," +
                  "Collection_Date,"  +
                  "Area_Title,Area,Duration,Activity_Time," +
                  "Researchers,Standing_Point_Title, Standing_Point," +
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

                var researchers = "\""
                if(map.researchers){
                    for(var k = 0; k < map.researchers.length; k++){
                        if(k != 0) researchers += ', '
                        researchers += map.researchers[k].firstname + " " + map.researchers[k].lastname
                    }
                }
                researchers += "\""
                if(map.data){
                    for(var k = 0; k < map.data.length; k++){
                        var entry = map.data[k]
                        csv += '\n'
                        csv += collection.title + ','
                        csv += collection.date + ','
                        csv += collection.area.title + ','
                        csv += area + ','
                        csv += collection.duration + ','
                        csv += map.date + ','
                        csv += researchers + ','
                        csv += entry.standingPoint.title + ','
                        csv += "\"POINT( " + entry.standingPoint.latitude + " " + entry.standingPoint.longitude + ")\","
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
                  "Area_Title,Area,Duration,Activity_Time," +
                  "Researchers,Standing_Point,Standing_Point_Title," +
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
                var researchers = "\""
                if(map.researchers){
                    for(var k = 0; k < map.researchers.length; k++){
                        if(k != 0) researchers += ', '
                        researchers += map.researchers[k].firstname + " " + map.researchers[k].lastname
                    }
                }
                researchers += "\""
                if(map.data){
                    for(var k = 0; k < map.data.length; k++){
                        var entry = map.data[k]
                        csv += '\n'
                        csv += collection.title + ','
                        csv += collection.date + ','
                        csv += collection.area.title + ','
                        csv += area + ','
                        csv += collection.duration + ','
                        csv += map.date + ','
                        csv += researchers + ','
                        csv += entry.standingPoint.title + ','
                        csv += "\"POINT( " + entry.standingPoint.latitude + " " + entry.standingPoint.longitude + ")\","
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

surveyToCSV = function(data) {

    var headers = "Collection_Title," +
                  "Collection_Date,"  +
                  "Area_Title,Area,Duration,Activity_Time," +
                  "Researchers,Key" 

    var csv = headers

    for(var i = 0; i < data.surveyCollections.length; i++){
        var collection = data.surveyCollections[i]
        
        var area = "\"POLYGON (("
        if(collection.area){
            for(var j = 0; j < collection.area.points.length; j++){
                if (j != 0) area += ','
                area += collection.area.points[j].latitude + " "
                area += collection.area.points[j].longitude
            }
        }
        area += "))\""
        
        if(collection.surveys){
            for (var j = 0; j < collection.surveys.length; j++){
                var survey = collection.surveys[j]

                var researchers = "\""
                if(survey.researchers){
                    for(var k = 0; k < survey.researchers.length; k++){
                        if(k != 0) researchers += ', '
                        researchers += survey.researchers[k].firstname + " " + survey.researchers[k].lastname
                    }
                }
                researchers += "\""

                csv += '\n'
                csv += collection.title + ','
                csv += collection.date + ','
                csv += collection.area.title + ','
                csv += area + ','
                csv += collection.duration + ','
                csv += survey.date + ','
                csv += researchers + ','
                csv += survey.key                    
            }
        }
    }

    return csv
}

module.exports = {
    stationaryToCSV,
    movingToCSV,
    surveyToCSV
}