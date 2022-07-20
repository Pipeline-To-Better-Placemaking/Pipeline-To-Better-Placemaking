import * as XLSX from 'xlsx/xlsx.mjs';


export function projectExport(stationaryData, movingData, soundData, natureData, orderData,
                        boundariesData){

    var workbook = XLSX.utils.book_new();

    stationary = stationToXLSX(stationaryData)
    console.log("stationary writes")
    moving = movingToXLSX(movingData)
    console.log("moving writes")
    sound = soundToXLSX(soundData)
    console.log("sound writes")
    nature = natureToXLSX(natureData)
    console.log("nature writes")
    lighting = lightToXLSX(lightData)
    console.log("light writes")
    order = orderToXLSX(orderData)
    console.log("order writes")
    boundaries = boundToXLSX(boundariesData)
    console.log("boundaries writes")

    var worksheetstat = XLSX.utils.json_to_sheet(stationary);
    var worksheetmov = XLSX.utils.json_to_sheet(moving);
    var worksheetord = XLSX.utils.json_to_sheet(order);
    var worksheetbounds = XLSX.utils.json_to_sheet(boundaries);
    var worksheetlight = XLSX.utils.json_to_sheet(lighting);
    var worksheetnat = XLSX.utils.json_to_sheet(nature);
    var worksheetsound = XLSX.utils.json_to_sheet(sound);

    XLSX.utils.book_append_sheet(workbook, worksheetord, 'AbsenceOfOrder');
    XLSX.utils.book_append_sheet(workbook, worksheetsound, 'AcousticalProfile');
    XLSX.utils.book_append_sheet(workbook, worksheetbounds, 'SpatialBoundaries');
    XLSX.utils.book_append_sheet(workbook, worksheetlight, 'LightingProfile');
    XLSX.utils.book_append_sheet(workbook, worksheetnat, 'NaturePrevalence');
    XLSX.utils.book_append_sheet(workbook, worksheetmov, 'PeopleInMotion');
    XLSX.utils.book_append_sheet(workbook, worksheetstat, 'PeopleInPlace');

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
                                        Point: k,
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
                                        Point: k,
                                        'Weather (temp/sky)': '', 
                                        'Kind/Area (ft/sq.ft)': water.kind,
                                        Description: water.description 
                                        //
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
                            obj = { Category: map.title, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    Description: entry.light_description
                        }
                        light.push(obj)
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
                            obj = { Category: map.title, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    Description: entry.description
                        }
                        order.push(obj)
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
