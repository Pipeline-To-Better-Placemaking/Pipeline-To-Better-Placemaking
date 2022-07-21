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

        stationary = stationToXLSX(stationaryData)
        var worksheetstat = XLSX.utils.json_to_sheet(stationary);
        console.log("stationary writes: ")
        console.log(worksheetstat)
        XLSX.utils.book_append_sheet(workbook, worksheetstat, 'PeopleInPlace');

        moving = movingToXLSX(movingData)
        var worksheetmov = XLSX.utils.json_to_sheet(moving)
        XLSX.utils.book_append_sheet(workbook, worksheetmov, 'PeopleInMotion');

        sound = soundToXLSX(soundData)
        var worksheetsound = XLSX.utils.json_to_sheet(sound)
        XLSX.utils.book_append_sheet(workbook, worksheetsound, 'AcousticalProfile');

        nature = natureToXLSX(natureData)
        var worksheetnat = XLSX.utils.json_to_sheet(nature)
        XLSX.utils.book_append_sheet(workbook, worksheetnat, 'NaturePrevalence');

        lighting = lightToXLSX(lightData)
        var worksheetlight = XLSX.utils.json_to_sheet(lighting)
        XLSX.utils.book_append_sheet(workbook, worksheetlight, 'LightingProfile');

        order = orderToXLSX(orderData)
        var worksheetord = XLSX.utils.json_to_sheet(order)
        console.log("order writes: ")
        console.log(worksheetord)
        XLSX.utils.book_append_sheet(workbook, worksheetord, 'AbsenceOfOrder');

        boundaries = boundToXLSX(boundariesData)
        var worksheetbounds = XLSX.utils.json_to_sheet(boundaries);
        console.log("boundaries writes: ")
        console.log(worksheetbounds)
        XLSX.utils.book_append_sheet(workbook, worksheetbounds, 'SpatialBoundaries');


    // Excel Format
    const xlsx_file = XLSX.write(workbook,{ bookType: "xlsx", type: "buffer" });

    return xlsx_file

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

                            obj = { Category: `${collection.title}(${j})`, 
                                    Date: map.date, 
                                    Time: getDigitalTime(entry.time), 
                                    Point: k, 
                                    Posture: entry.posture, 
                                    Age: entry.age, 
                                    Gender: entry.gender, 
                                    Activity: entry.activity
                        }
                        console.log(obj.Time)
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
        var obj = {}

        for(var i = 0; i < data.movingCollections.length; i++){
            var collection = data.movingCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]

                            obj = { Category: `${collection.title}(${j})`, 
                                    Date: map.date, 
                                    Time: getDigitalTime(entry.time), 
                                    Point: k, 
                                    Mode: entry.mode
                        }
                        console.log(obj.Time)
                    }

                        moving.push(obj)
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
        var obj = {}


        for(var i = 0; i < data.soundCollections.length; i++){
            var collection = data.soundCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]

                            obj = { Category: `${collection.title}(${j})`, 
                                    Date: map.date, 
                                    Time: getDigitalTime(entry.time), 
                                    Point: k, 
                                    'Average (dB)': entry.average,
                                    'Sound Types/Sources': parseArrAsString(entry.sound_type)
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
        var obj = {}

        for(var i = 0; i < data.natureCollections.length; i++){
            var collection = data.natureCollections[i]
            
            if(collection.maps){
                for (var j = 0; j < collection.maps.length; j++){
                    var map = collection.maps[j]

                        if(map.data){
                        for(var k = 0; k < map.data.length; k++){
                            var entry = map.data[k]

                            obj = { Category: `${collection.title}(${j})`, 
                                    Date: map.date, 
                                    Time: getDigitalTime(entry.time), 
                                    Point: k,
                                    'Weather (temp/sky)': entry.weather.temperature, 
                                    'Kind/Area (ft/sq.ft)': '',
                                    Description: ''
                            }
                            // console.log('nature weather objects: ')
                            // console.log(obj)


                            nature.push(obj)

                            for (var l = 0; l < entry.animal.length; l++){
                                var animal = entry.animal[l]

                                obj = { Category: `${collection.title}(${j})`, 
                                        Date: map.date, 
                                        Time: getDigitalTime(entry.time), 
                                        Point: `a(${l})`,
                                        'Weather (temp/sky)': '', 
                                        'Kind/Area (ft/sq.ft)': animal.kind,
                                        Description: animal.description 
                                }


                                nature.push(obj)
                            }
                            for (var m = 0; m < entry.water.length; m++){
                                var water = entry.water[m]

                                obj = { Category: `${collection.title}(${j})`, 
                                        Date: map.date, 
                                        Time: getDigitalTime(entry.time), 
                                        Point: `w(${m})`,
                                        'Weather (temp/sky)': '', 
                                        'Kind/Area (ft/sq.ft)': water.area,
                                        Description: water.description 
                                        
                                }
                                // console.log('nature water objects: ')
                                // console.log(obj)

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

                                    obj = { Category: `${collection.title}(${j})`, 
                                            Date: map.date, 
                                            Time: getDigitalTime(entry.time), 
                                            Point: l, 
                                            Description: points.light_description
                                }
                                console.log('light objects: ' )
                                console.log(obj.Time)


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

                            obj = { Category: `${collection.title}(${j})`, 
                                    Date: map.date, 
                                    Time: getDigitalTime(entry.time), 
                                    Point: k, 
                                    Kind: entry.kind, 
                                    Description: entry.description, 
                                    Purpose: parseArrAsString(entry.purpose), 
                                    'Value (ft/sq.ft)': entry.value
                            }

                            boundaries.push(obj)
                        }
                    }
                }
            }
        }

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
                                obj = { Category: `${collection.title}(${j})`, 
                                        Date: map.date, 
                                        Time: getDigitalTime(entry.time), 
                                        Point: `${k} p(${l})`, 
                                        Description: parseArrAsString(points.description)
                                }
                                // console.log('order objects: ' )
                                // console.log(obj)


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

function getDigitalTime(time){
    
    var midday = 'AM'
    var min = time.getMinutes()
    var hour = time.getHours()
    var sec = time.getSeconds()

    if (hour > 12){
      hour = hour - 12
      midday = 'PM'
    }
    var timeString = [hour, min, sec].join(':')
    timeString = timeString + '' + midday
    return timeString
}

function parseArrAsString(arr){
    var newString
    for(var i = 0; i < arr.length; i++){
        newString += arr[i] + ','
    }
    return newString
}

module.exports = {projectExport}