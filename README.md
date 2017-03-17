[![Build Status](https://travis-ci.org/emmanuelroussel/stockpile-app.svg?branch=master)](https://travis-ci.org/emmanuelroussel/stockpile-app)
[![Coverage Status](https://coveralls.io/repos/github/emmanuelroussel/stockpile-app/badge.svg)](https://coveralls.io/github/emmanuelroussel/stockpile-app)
[![codebeat badge](https://codebeat.co/badges/d0387971-f205-4146-8946-b8a8a8d1d2e2)](https://codebeat.co/projects/github-com-emmanuelroussel-stockpile-app)

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

## Docs
Documentation generated with [TypeDoc](https://github.com/TypeStrong/typedoc).

To update the docs: `npm run docs`.

**Note:** The script to generate the docs is currently ugly because TypeDoc has [a known issue with promises](https://github.com/TypeStrong/typedoc/issues/327) . The workaround is to ignore compile errors.
