const XLSX = require('xlsx')


projectExport = function(stationaryData, movingData, soundData, natureData, lightData, orderData,
                        boundariesData){

    var stationary = []
    var moving = []
    var order = []
    var boundaries = []
    var lighting = []
    var nature = []
    var sound = []
    var workbook = XLSX.utils.book_new();

    // if(stationaryData.length){
        stationary = stationToXLSX(stationaryData)
        console.log("stationary writes: " + stationary)
        var worksheetstat = XLSX.utils.json_to_sheet(stationary);
        console.log("stationary writes: " + worksheetstat)
        XLSX.utils.book_append_sheet(workbook, worksheetstat, 'PeopleInPlace');
    // }
    // if(movingData.length){
        moving = movingToXLSX(movingData)
        console.log("moving writes: " + moving)
        var worksheetmov = XLSX.utils.json_to_sheet(moving)
        console.log("moving writes: " + worksheetmov)
        XLSX.utils.book_append_sheet(workbook, worksheetmov, 'PeopleInMotion');
    // }
    // if(soundData.length){
        sound = soundToXLSX(soundData)
        console.log("sound writes: " + sound)
        var worksheetsound = XLSX.utils.json_to_sheet(sound)
        console.log("sound writes: " + worksheetsound)
        XLSX.utils.book_append_sheet(workbook, worksheetsound, 'AcousticalProfile');

    // }
    // if(natureData.length){
        nature = natureToXLSX(natureData)
        console.log("nature writes: " + nature)
        var worksheetnat = XLSX.utils.json_to_sheet(nature)
        console.log("nature writes: " + worksheetnat)
        XLSX.utils.book_append_sheet(workbook, worksheetnat, 'NaturePrevalence');
    // }
    // if(lightData.length){
        lighting = lightToXLSX(lightData)
        console.log("light writes: " + lighting)
        var worksheetlight = XLSX.utils.json_to_sheet(lighting)
        console.log("light writes: " + worksheetlight)
        XLSX.utils.book_append_sheet(workbook, worksheetlight, 'LightingProfile');
    // }
    // if(orderData.length){
        order = orderToXLSX(orderData)
        console.log("order writes: " + order)
        var worksheetord = XLSX.utils.json_to_sheet(order)
        console.log("order writes: " + worksheetord)
        XLSX.utils.book_append_sheet(workbook, worksheetord, 'AbsenceOfOrder');

    // }
    // if(boundariesData.length){
        boundaries = boundToXLSX(boundariesData)
        console.log("boundaries writes: " + boundaries)
        var worksheetbounds = XLSX.utils.json_to_sheet(boundaries);
        console.log("boundaries writes: " + worksheetbounds)
        XLSX.utils.book_append_sheet(workbook, worksheetbounds, 'SpatialBoundaries');
    // }

    // Excel Format
    return XLSX.write(workbook, 'PlaceProject.xlsx');

}

function stationToXLSX(data){

    try{

        var stationary = []

        for(var i = 0; i < data.stationaryCollections.length; i++){
            var collection = data.stationaryCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]
                            obj = { Category: map.title, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    Posture: entry.posture, 
                                    Age: entry.age, 
                                    Gender: entry.gender, 
                                    Activity: entry.activity
                        }
                        stationary.push(obj)
                        }
                    }
                }
            }
        }
        return stationary
    }catch(error){
        console.log("stationary fails " + error)
    }
}

function movingToXLSX(data){

    try{
        var moving = []

        for(var i = 0; i < data.movingCollections.length; i++){
            var collection = data.movingCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]
                            obj = { Category: map.title, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    Mode: entry.mode
                        }
                        moving.push(obj)
                        }
                    }
                }
            }
        }

        return moving
    }catch(error){
        console.log("moving fails " + error)
    }
}

function soundToXLSX(data){

    try{
        var sound = []

        for(var i = 0; i < data.soundCollections.length; i++){
            var collection = data.soundCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]
                            obj = { Category: map.title, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    'Average (dB)': entry.average,
                                    'Sound Types/Sources': entry.sound_type
                            }
                            sound.push(obj)
                        }
                    }
                }
            }
        }
    return sound
    }
    catch(error){
        console.log("sound fails " + error)
    }
}

function natureToXLSX(data){

    try{
        var nature = []

        for(var i = 0; i < data.natureCollections.length; i++){
            var collection = data.natureCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]

                            obj = { Category: map.title, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k,
                                    'Weather (temp/sky)': entry.weather.temperature, 
                                    'Kind/Area (ft/sq.ft)': '',
                                    Description: ''
                            }
                            nature.push(obj)

                            for (var l = 0; l < entry.animal.length; l++){
                                var animal = entry.animal[l]
                                obj = { Category: map.title, 
                                        Date: map.date, 
                                        Time: entry.time, 
                                        Point: l,
                                        'Weather (temp/sky)': '', 
                                        'Kind/Area (ft/sq.ft)': animal.kind,
                                        Description: animal.description 
                                }
                                nature.push(obj)
                            }
                            for (var m = 0; m < entry.water.length; m++){
                                var water = entry.water[m]
                                obj = { Category: map.title, 
                                        Date: map.date, 
                                        Time: entry.time, 
                                        Point: m,
                                        'Weather (temp/sky)': '', 
                                        'Kind/Area (ft/sq.ft)': water.area,
                                        Description: water.description 
                                        
                                }
                                nature.push(obj)
                            }
                        }
                    }
                }
            }
        }
        return nature
    }
    catch(error){
        console.log("nature fails " + error)
    }
}



function lightToXLSX(data){

    try{
        var light = []

        for(var i = 0; i < data.lightCollections.length; i++){
            var collection = data.lightCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                                var entry = map.data[k]
                                for (var l = 0; l < entry.points.length; l++){
                                    var points = entry.points[l]
                                    obj = { Category: map.title, 
                                            Date: map.date, 
                                            Time: entry.time, 
                                            Point: l, 
                                            Description: points.light_description
                                }
                                light.push(obj)
                            }
                        }
                    }
                }
            }
        }
        return light
    }
    catch(error){
    console.log("light fails " + error)
    }
}

function boundToXLSX(data){

    try{
        var order = []

        for(var i = 0; i < data.boundariesCollections.length; i++){
            var collection = data.boundariesCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]
                            obj = { Category: map.title, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    Kind: entry.kind, 
                                    Description: entry.description, 
                                    Purpose: entry.purpose, 
                                    'Value (ft/sq.ft)': entry.value
                            }
                            order.push(obj)
                        }
                    }
                }
            }
        }
        return order
    }catch(error){
    console.log("boundaries fails " + error)
    }
}

function orderToXLSX(data){

    try{
        var order = []

        for(var i = 0; i < data.orderCollections.length; i++){
            var collection = data.orderCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]

                            for (var l = 0; l < entry.points.length; l++){
                                var points = entry.points[l]
                                obj = { Category: map.title, 
                                        Date: map.date, 
                                        Time: entry.time, 
                                        Point: l, 
                                        Description: points.description
                                }
                                order.push(obj)
                            }
                        }
                    }
                }
            }
        }
    return order
    }catch(error){
    console.log("order fails " + error)
    }
}

module.exports = {projectExport}