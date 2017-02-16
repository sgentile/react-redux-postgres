# react-redux-starter

## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed. (I use >= v6 with latest npm)

## Installation

- Running `npm install` in the app's root directory will install everything you need for development.

## Development Server

- `npm start` will run the app's development server at [http://localhost:8080](http://localhost:8080) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.  

- `npm run test:coverage` will run the tests using PhantomJS and produce a coverage report in `coverage/`.

- `npm run test:browser` will run the tests using Chrome

- `npm run test:watch` will run the tests on every change.

## Linting

- is built in - that said you can run `npm run lint`

## Building

- `npm run build` creates a production build by default.  Produces a 'build' directory.  That directory is removed every time.

   To create a development build, set the `NODE_ENV` environment variable to `development` while running this command.

- `npm run dev` will run dev with tests watch

