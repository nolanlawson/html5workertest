html5workertest [![Build Status](https://travis-ci.org/nolanlawson/html5workertest.svg?branch=master)](https://travis-ci.org/nolanlawson/html5workertest) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
=====

Test suite that checks the supported browser APIs in Web Workers and Service Workers, as well as a site to display the browser-by-browser breakdown.

Zuul, Travis, and SauceLabs are used to run the automated tests. To add a new browser version, it first must exist in SauceLabs, next it should be added to `.zuul.yml`.

Building and testing
====

First:

    npm install

Then to run the Zuul tests against all browsers in `.zuul.yml` (requires SauceLabs credentials and a local CouchDB/PouchDB Server):

    npm test

For the following commands, you must run:

    export COUCH_URL=http://localhost:5984/html5workertest

...which points to some CouchDB database where the data should be stored and read from.

To build the site:

    npm run build-site

To develop the site:

    npm run watch-site

To publish the site to gh-pages:

    npm run publish-site

When running the Zuul tests, results are published to the CouchDB database, so you need to log in. To configure the credentials, use the environment variables:

    COUCH_USERNAME=user
    COUCH_PASSWORD=password

