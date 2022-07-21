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
        // console.log("stationary writes: " + stationary)
        var worksheetstat = XLSX.utils.json_to_sheet(stationary);
        console.log("stationary writes: " + worksheetstat)
        XLSX.utils.book_append_sheet(workbook, worksheetstat, 'PeopleInPlace');
    // }
    // if(movingData.length){
        moving = movingToXLSX(movingData)
        // console.log("moving writes: " + moving)
        var worksheetmov = XLSX.utils.json_to_sheet(moving)
        console.log("moving writes: " + worksheetmov)
        XLSX.utils.book_append_sheet(workbook, worksheetmov, 'PeopleInMotion');
    // }
    // if(soundData.length){
        sound = soundToXLSX(soundData)
        // console.log("sound writes: " + sound)
        var worksheetsound = XLSX.utils.json_to_sheet(sound)
        console.log("sound writes: " + worksheetsound)
        XLSX.utils.book_append_sheet(workbook, worksheetsound, 'AcousticalProfile');

    // }
    // if(natureData.length){
        nature = natureToXLSX(natureData)
        // console.log("nature writes: " + nature)
        var worksheetnat = XLSX.utils.json_to_sheet(nature)
        console.log("nature writes: " + worksheetnat)
        XLSX.utils.book_append_sheet(workbook, worksheetnat, 'NaturePrevalence');
    // }
    // if(lightData.length){
        lighting = lightToXLSX(lightData)
        // console.log("light writes: " + lighting)
        var worksheetlight = XLSX.utils.json_to_sheet(lighting)
        console.log("light writes: " + worksheetlight)
        XLSX.utils.book_append_sheet(workbook, worksheetlight, 'LightingProfile');
    // }
    // if(orderData.length){
        order = orderToXLSX(orderData)
        // console.log("order writes: " + order)
        var worksheetord = XLSX.utils.json_to_sheet(order)
        console.log("order writes: " + worksheetord)
        XLSX.utils.book_append_sheet(workbook, worksheetord, 'AbsenceOfOrder');

    // }
    // if(boundariesData.length){
        boundaries = boundToXLSX(boundariesData)
        // console.log("boundaries writes: " + boundaries)
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
        var obj = {}

        for(var i = 0; i < data.stationaryCollections.length; i++){
            var collection = data.stationaryCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]
                            // console.log("Stationary data before assigning to object")
                            // console.log(entry)
                            obj = { Category: `${collection.title}(${k})`, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    Posture: entry.posture, 
                                    Age: entry.age, 
                                    Gender: entry.gender, 
                                    Activity: entry.activity
                        }
                        console.log('stationary objects: ' + obj)
                        stationary.push(obj)

                        }
                    }
                }
            }
        }
        console.log("stationary writes: ")
        console.log(JSON.stringify(stationary))

        return stationary
    }catch(error){
        console.log("stationary fails " + error)
    }
}

function movingToXLSX(data){

    try{
        var moving = []
        var obj = {}

        for(var i = 0; i < data.movingCollections.length; i++){
            var collection = data.movingCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]
                            // console.log("Moving data before assigning to object")
                            // console.log(entry)
                            obj = { Category: `${collection.title}(${k})`, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    Mode: entry.mode
                        }
                        console.log('moving objects: ')
                        console.log(obj)

                        moving.push(obj)
                        }
                    }
                }
            }
        }
        console.log("moving writes: " )
        console.log(JSON.stringify(moving))

        return moving
    }catch(error){
        console.log("moving fails " + error)
    }
}

function soundToXLSX(data){

    try{
        var sound = []
        var obj = {}


        for(var i = 0; i < data.soundCollections.length; i++){
            var collection = data.soundCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]
                            // console.log("Sound data before assigning to object")
                            // console.log(entry)
                            obj = { Category: `${collection.title}(${k})`, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    'Average (dB)': entry.average,
                                    'Sound Types/Sources': entry.sound_type
                            }
                            console.log('sound objects: ')
                            console.log(obj)


                            sound.push(obj)
                        }
                    }
                }
            }
        }
        console.log("sound writes: ")
        console.log(JSON.stringify(sound))


    return sound
    }
    catch(error){
        console.log("sound fails " + error)
    }
}

function natureToXLSX(data){

    try{
        var nature = []
        var obj = {}

        for(var i = 0; i < data.natureCollections.length; i++){
            var collection = data.natureCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]

                            obj = { Category: `${collection.title}(${k})`, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k,
                                    'Weather (temp/sky)': entry.weather.temperature, 
                                    'Kind/Area (ft/sq.ft)': '',
                                    Description: ''
                            }
                            console.log('nature weather objects: ')
                            console.log(obj)


                            nature.push(obj)

                            for (var l = 0; l < entry.animal.length; l++){
                                var animal = entry.animal[l]
                                // console.log("NATURE")
                                // console.log("animal data before assigning to object:")
                                // console.log(animal)

                                obj = { Category: `${collection.title}(${k})`, 
                                        Date: map.date, 
                                        Time: entry.time, 
                                        Point: l,
                                        'Weather (temp/sky)': '', 
                                        'Kind/Area (ft/sq.ft)': animal.kind,
                                        Description: animal.description 
                                }
                                console.log('nature animal objects: ')
                                console.log(obj)


                                nature.push(obj)
                            }
                            for (var m = 0; m < entry.water.length; m++){
                                var water = entry.water[m]
                                // console.log("NATURE")
                                // console.log("water data before assigning to object:")
                                // console.log(water)
                                obj = { Category: `${collection.title}(${k})`, 
                                        Date: map.date, 
                                        Time: entry.time, 
                                        Point: m,
                                        'Weather (temp/sky)': '', 
                                        'Kind/Area (ft/sq.ft)': water.area,
                                        Description: water.description 
                                        
                                }
                                console.log('nature water objects: ')
                                console.log(obj)

                                nature.push(obj)
                            }
                        }
                    }
                }
            }
        }
        console.log("nature writes: " )
        console.log(JSON.stringify(nature))

        return nature
    }
    catch(error){
        console.log("nature fails " + error)
    }
}



function lightToXLSX(data){

    try{
        var light = []
        var obj = {}

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

                                    obj = { Category: `${collection.title}(${k})`, 
                                            Date: map.date, 
                                            Time: entry.time, 
                                            Point: l, 
                                            Description: points.light_description
                                }
                                console.log('light objects: ' )
                                console.log(obj)


                                light.push(obj)
                            }
                        }
                    }
                }
            }
        }
        console.log("light writes: ")
        console.log(JSON.stringify(light))

        return light
    }
    catch(error){
    console.log("light fails " + error)
    }
}

function boundToXLSX(data){

    try{
        var boundaries = []
        var obj = {}

        for(var i = 0; i < data.boundariesCollections.length; i++){
            var collection = data.boundariesCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]

                            obj = { Category: `${collection.title}(${k})`, 
                                    Date: map.date, 
                                    Time: entry.time, 
                                    Point: k, 
                                    Kind: entry.kind, 
                                    Description: entry.description, 
                                    Purpose: entry.purpose, 
                                    'Value (ft/sq.ft)': entry.value
                            }
                            console.log('bound objects: ' )
                            console.log(obj)


                            boundaries.push(obj)
                        }
                    }
                }
            }
        }
        console.log("boundaries writes: ")
        console.log(JSON.stringify(boundaries))

        return boundaries
    }catch(error){
    console.log("boundaries fails " + error)
    }
}

function orderToXLSX(data){

    try{
        var order = []
        var obj = {}

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
                                obj = { Category: `${collection.title}(${k})`, 
                                        Date: map.date, 
                                        Time: entry.time, 
                                        Point: l, 
                                        Description: points.description
                                }
                                console.log('order objects: ' )
                                console.log(obj)


                                order.push(obj)
                            }
                        }
                    }
                }
            }
        }
        console.log("order writes: " )
        console.log(JSON.stringify(order))


    return order
    }catch(error){
    console.log("order fails " + error)
    }
}

module.exports = {projectExport}