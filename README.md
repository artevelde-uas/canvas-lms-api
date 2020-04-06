# API client for the Canvas LMS

[![](https://img.shields.io/npm/v/@artevelde-uas/canvas-lms-api.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-api)
[![](https://img.shields.io/github/license/artevelde-uas/canvas-lms-api.svg)](https://spdx.org/licenses/MIT)
[![](https://img.shields.io/npm/dt/@artevelde-uas/canvas-lms-api.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-api)
[![](https://img.shields.io/librariesio/github/artevelde-uas/canvas-lms-api.svg)](https://libraries.io/npm/@ahsdile%2Fcanvas-lms-app)

A browser side API client for the Canvas LMS from Instructure.

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-api

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-api

## Usage

Example for getting the current user:

```javascript
import canvasApi from '@artevelde-uas/canvas-lms-api';

canvasApi.get('/users/self').then(user => {
    // do something with the user object
});
```

## API

### `get(path[, queryParams])`

### `post(path[, data[, queryParams]])`

### `put(path[, data[, queryParams]])`

### `del(path[, queryParams])`
