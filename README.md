[![Build Status](https://travis-ci.org/stockpile-co/app.svg?branch=master)](https://travis-ci.org/stockpile-co/app)
[![Coverage Status](https://coveralls.io/repos/github/stockpile-co/app/badge.svg?branch=master)](https://coveralls.io/github/stockpile-co/app?branch=master)
[![codebeat badge](https://codebeat.co/badges/d0387971-f205-4146-8946-b8a8a8d1d2e2)](https://codebeat.co/projects/github-com-emmanuelroussel-stockpile-app)
[![NSP Status](https://nodesecurity.io/orgs/stockpile-co/projects/970ba70d-9243-4294-95a2-cccbe8550dc6/badge)](https://nodesecurity.io/orgs/stockpile-co/projects/970ba70d-9243-4294-95a2-cccbe8550dc6)

# Stockpile App
Front end for Stockpile, an app that manages stuff for organizations.

Built with [Ionic 2](https://github.com/driftyco/ionic).

See [Stockpile API](https://github.com/AdamVig/stockpile-api) for the Restful API consumed by this app.

## Getting Started
- Clone this repo
- Make sure you have the latest version of Ionic and Cordova installed `npm install -g ionic cordova`
- Run `npm install` from the project root

**Note:** If your build is slow, update `npm` to 3.x: `npm install -g npm`.

## Running in a Browser
- Run `ionic serve` to preview the app in your browser
- You can also run `ionic serve --lab` to preview different platforms side-by-side

**Note:** Some native functionality like scanning won't be available in the browser. You have to run the app on an emulator or device for the full experience.

## Running on a Device or Emulator
Running apps on a device or emulator requires you to build the app on your computer. To do this, you have to set up the Android SDK and Apple's Xcode. For detailed instructions on how to do this, follow [this guide for Mac](https://ionicframework.com/docs/v2/resources/platform-setup/mac-setup.html) or [this one for Windows](https://ionicframework.com/docs/v2/resources/platform-setup/windows-setup.html).

- Run `ionic state restore` to prepare the iOS and Android platforms and install the correct plugins for each
- Run `ionic emulate ios` or `ionic emulate android` to emulate
- Run `ionic run ios` or `ionic run android` to run on real device

## Tests
App tested with Jasmine and Karma on Chrome.

Unit tests located with every testable `.ts` file in `src/pages/` and `src/app/` (unit test files end with `.spec.ts`).

To run the tests: `npm test`.
