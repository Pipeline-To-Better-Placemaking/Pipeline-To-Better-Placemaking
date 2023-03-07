# Spring23-Group01
Mobile Application for Pipeline to Better Placemaking used React Native for its development.

## Notes
### !!! WARNING !!!
The dependencies on this project are shaky at best.
### Connect to local backend server
The mobile application connects to the heroku api, to connect to a local database you must update your local ip addres in the env file. You must also run a local instance of the desktop version on the same wifi. After that search and replace all instance of **__HEROKU_SERVER__** with **__LOCAL_SERVER__**. Ensure the desktop version of the project is running on the same ip:port as your env file.


## Running a Local Instance
In order to run a local instance enter these commands in the frontend_2 folder:
```
npm install -force
npm start
```

## To deploy to iPhone through XCode (Google Maps doesn't currently work)
1) Create a **.xcodeworkspaceproj** by running: ```npx expo run:ios```
2) Start XCode and open the **.xcodeworkspaceproj**
3) If you haven't already sign up for a **PERSONAL** Apple Developer Account (This will be free if not you're looking at the wrong thing, this will not cost $99)
4) Open **__Signing&Capabilities__** by double clicking the blue project directory
5) Assign your personal team as the signing team
6) Should be able to run and deploy on iPhone
