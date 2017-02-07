[![Build Status](https://travis-ci.org/emmanuelroussel/stockpile-app.svg?branch=master)](https://travis-ci.org/emmanuelroussel/stockpile-app)
[![Coverage Status](https://coveralls.io/repos/github/emmanuelroussel/stockpile-app/badge.svg)](https://coveralls.io/github/emmanuelroussel/stockpile-app)
# Stockpile App
Front end for Stockpile, an app that manages stuff for organizations.

Built with [Ionic 2](https://github.com/driftyco/ionic).

See [Stockpile API](https://github.com/AdamVig/stockpile-api) for the Restful API consumed by this app.

## Getting Started
- Clone this repo
- Make sure you have the latest version of Ionic and Cordova installed `npm install -g ionic cordova`
- Run `npm install` from the project root
- Run `ionic serve` to preview the app in your browser
- You can also run `ionic serve --lab` to preview different platforms side-by-side

**Note:** If your build is slow, update `npm` to 3.x: `npm install -g npm`.

## Tests
App tested with Jasmine and Karma on Chrome.

Unit tests located with every testable `.ts` file (unit test files end with `.spec.ts`).

To run the tests: `npm test`.

## Docs
Documentation generated with [TypeDoc](https://github.com/TypeStrong/typedoc).

To update it:
- Install TypeDoc with `sudo npm install -g typedoc`
- Run from the project root `typedoc --out ./docs/ --target ES6 --tsconfig ./tsconfig.json --exclude node_modules --ignoreCompilerErrors src/`

**Note:** The command to generate the docs is currently ugly because TypeDoc has [a known issue with promises](https://github.com/TypeStrong/typedoc/issues/327) . The workaround is to ignore compile errors.
