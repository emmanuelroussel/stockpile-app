[![Build Status](https://travis-ci.org/stockpile-co/app.svg?branch=master)](https://travis-ci.org/stockpile-co/app)
[![Coverage Status](https://coveralls.io/repos/github/stockpile-co/app/badge.svg?branch=master)](https://coveralls.io/github/stockpile-co/app?branch=master)
[![codebeat badge](https://codebeat.co/badges/d0387971-f205-4146-8946-b8a8a8d1d2e2)](https://codebeat.co/projects/github-com-emmanuelroussel-stockpile-app)
[![NSP Status](https://nodesecurity.io/orgs/stockpile-co/projects/970ba70d-9243-4294-95a2-cccbe8550dc6/badge)](https://nodesecurity.io/orgs/stockpile-co/projects/970ba70d-9243-4294-95a2-cccbe8550dc6)

# Stockpile App
Front end for Stockpile, an app that manages stuff for organizations.

Built with [Ionic](https://github.com/driftyco/ionic).

See [Stockpile API](https://github.com/AdamVig/stockpile-api) for the Restful API consumed by this app.

## Getting Started
- Clone this repo
- Run `npm install` from the project root

**Note:** If your build is slow, update `npm` to 3.x: `npm install -g npm`.

## Running in a Browser
- Run `ionic serve` to preview the app in your browser
- You can also run `ionic serve --lab` to preview different platforms side-by-side

**Note:** Some native functionality like scanning won't be available in the browser. You have to run the app on an emulator or device for the full experience.

## Running on a Device or Emulator
Running apps on a device or emulator requires you to build the app locally. To do this, you have to set up the Android SDK and/or Apple's Xcode. For detailed instructions on how to do this, follow [this guide for Mac](https://ionicframework.com/docs/v2/resources/platform-setup/mac-setup.html) or [this one for Windows](https://ionicframework.com/docs/v2/resources/platform-setup/windows-setup.html).

- Add platforms you want to run with `ionic cordova platform add ios` or `ionic cordova platform add android`
- Run `ionic cordova prepare` to install the plugins for each platforms
- *For iOS only*, run `npm install ios-sim`. This is the only way to get the emulator to work from the command line.
- Run `ionic cordova emulate ios` or `ionic cordova emulate android` to emulate
- Run `ionic cordova run ios` or `ionic cordova run android` to run on a real device connected to your computer

## Tests
App tested with Jasmine and Karma on Chrome.

To run the tests: `npm test`.
