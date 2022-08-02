# Pipeline to Better Placemaking (Website) Spring-Summer 2022 Group 2
## https://p2bp.herokuapp.com

## Running frontend files locally
Make sure you are running up-to-date versions of Node.js and npm, 
    https://nodejs.org/en/
    
Clone the repository locally/Download the files from the repository.
On the command line or terminal within the Pipeline2BP-Dev-Code folder on your system npm install.
On the command line or terminal within the frontend_web folder npm install.

## Frontend React .js files
### Routes
The structure of the website including the Routes and pathnames are set in App.js and ProjectPage.js

### Map Component(s) - Google Maps JS
Map.jsx is the singular component called for every instance. Map.jsx handles data based on the drawer.Results object.

### Drawers/Drawer Structure  (Collapsable Menus overlaying Map) - MUI
The drawers are directly mapped from the drawer object from ProjectPage.js including the key values. The Graphs and Data objects (within drawers object) represent the Graphs and Data buttons/collapsable menus, their data is generated based on the Results object (also within the drawers obj) but hold different components that are generated upon selection. 

The menu selections are mapped from the drawer.Results object including its keys for quick access with unique identifying information.

Any change to the drawers object structure (i.e. using a given Activity Name) means references accessing date and time (currently used as labels on the menu selections) will need to be updated within MapDrawers.js, ActivityPage.js, ActivityTable.js as well as Map.jsx

The location and position of each menu is set in MapDrawers.js

Example 'drawers' Object:
drawers = {
    Results:{
        date1:{
            time1:{
                (activity)_map data
            },
            time2:{
                data
            }
        },
        date2:{
            time1:{
                data
            }
        }
    },
    /* These will stay empty as objects and are later populated with chart and table components */
    Graphs:{},
    Data:{}
}
