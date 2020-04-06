# Canvas LMS API for use in the browser

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
