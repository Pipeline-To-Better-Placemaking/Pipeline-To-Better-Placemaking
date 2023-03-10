# Spring23-Group01
Mobile Application for Pipeline to Better Placemaking used React Native for its development.

[Introduction](https://github.com/Pipeline-To-Better-Placemaking/Pipeline-To-Better-Placemaking/edit/master/README.md#introduction)<br>
[Running a Local Instance](https://github.com/Pipeline-To-Better-Placemaking/Pipeline-To-Better-Placemaking/edit/master/README.md#running-a-local-instance)<br>
[Deploy to iPhone through XCode](https://github.com/Pipeline-To-Better-Placemaking/Pipeline-To-Better-Placemaking/edit/master/README.md#to-deploy-to-iphone-through-xcode-google-maps-doesnt-currently-work)<br>

## Introduction
### !!! WARNING !!!
The dependencies on this project are shaky at best, proceed with caution.
### Directory Logic
The mobile directory inside screens seems to be based on the user flow inside the applications: the left tab option is Collaborate, the middle is Home, and the right is User Settings. From there each tab is broken down to its sub components.
### Connecting to local backend server
The mobile application connects to the heroku api, to connect to a local database you must update your local ip addres in the env file. You must also run a local instance of the desktop version on the **same** wifi. After that search and replace all instances of **_HEROKU_SERVER_** with **_LOCAL_SERVER_**. Ensure the desktop version of the project is running on the same ip:port as your env file.


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
4) Open **_Signing&Capabilities_** by double clicking the blue project directory
5) Assign your personal team as the signing team
6) Should be able to run and deploy on iPhone
