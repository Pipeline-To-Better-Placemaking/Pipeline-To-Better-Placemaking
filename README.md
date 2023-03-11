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

## Expo Guide
### Installing Expo
1. Navigate to your device's App Store/Google Play Store and download "Expo Go"
2. Create an account: [Expo Sign Up](expo.dev/signup)
3. After setting up a local instance using the instructions above, run ```npm install -g eas-cli``` to globally install the eas command line interface.
4. After it installs run ```eas login``` and login to the Expo account you just created.

### Gaining access
1. Locate the "Next Team Info" document to find the Expo P2BPAdmin login info and login: [Expo Login](expo.dev/login)
2. After logging in, on the top left corner of the screen you should see "p2bpadmin" and a dropdown menu, select the dropdown.
3. Under Organizations, select **pipeline-to-better-placemaking**
4. On the left side of the screen, select the option **Organization Settings**
5. On the left side of the screen, select the option **Members**
6. On the right side of the screen, select the option **Invite Members**
7. We recommend inviting the team as **Developers** and the project manager as **Admim**  
   (NOTE: Expo invitations do expire so be sure to accept them soon after sending.)
### [Updating the build](https://docs.expo.dev/build/setup/)

## Running a Local Instance
Prerequisite: Install Expo Go (refer to [Expo Guide](#expo-guide) -> [Installing Expo](#installing-expo))

   In order to run a local instance enter these commands in the root directory:
```
npm install -force
npm start
```
After that a QR code will appear in your console, scan the code with your phone and an instance of the mobile application should load.

## To deploy to iPhone through XCode (Google Maps doesn't currently work and not sure why you would want to do this)
1) Create a **.xcodeworkspaceproj** by running: ```npx expo run:ios```
2) Start XCode and open the **.xcodeworkspaceproj**
3) If you haven't already sign up for a **PERSONAL** Apple Developer Account (This will be free if not you're looking at the wrong thing, this will not cost $99)
4) Open **_Signing&Capabilities_** by double clicking the blue project directory
5) Assign your personal team as the signing team
6) Should be able to run and deploy on iPhone


